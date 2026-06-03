const API_URL = '/api/auth';

let _accessToken = null;

export const authService = {
  setToken(token) {
    _accessToken = token;
  },

  getToken() {
    return _accessToken;
  },

  removeToken() {
    _accessToken = null;
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
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao cadastrar usuário.');
    }

    if (data.accessToken) {
      this.setToken(data.accessToken);
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
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao realizar login.');
    }

    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data;
  },

  async refresh() {
    const response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      this.removeToken();
      throw new Error(data.error || 'Sessão expirada.');
    }

    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data.accessToken;
  },

  async getMe() {
    let token = this.getToken();
    
    // Se não houver token em memória, tenta resgatá-lo via refresh token cookie
    if (!token) {
      try {
        token = await this.refresh();
      } catch (err) {
        return null;
      }
    }

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: this.getHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      // Se o token estiver expirado (401), tenta fazer refresh e refazer a requisição
      if (response.status === 401) {
        try {
          token = await this.refresh();
          const retryResponse = await fetch(`${API_URL}/me`, {
            method: 'GET',
            headers: this.getHeaders(),
            credentials: 'include',
          });
          const retryData = await retryResponse.json();
          if (retryResponse.ok) {
            return retryData.user;
          }
        } catch (refreshErr) {
          this.removeToken();
          return null;
        }
      }
      this.removeToken();
      return null;
    }
    return data.user;
  },

  async logout() {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao notificar logout no servidor:', error);
    } finally {
      this.removeToken();
    }
  }
};
