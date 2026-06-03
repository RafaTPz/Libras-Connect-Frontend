const API_URL = '/api/auth';

export const authService = {
  setToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  getHeaders() {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async register(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao cadastrar usuário.');
    }

    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao realizar login.');
    }

    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async getMe() {
    const token = this.getToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      this.removeToken();
      throw new Error(data.error || 'Sessão expirada.');
    }
    return data.user;
  },

  async logout() {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
    } catch (error) {
      console.error('Erro ao notificar logout no servidor:', error);
    } finally {
      this.removeToken();
    }
  }
};
