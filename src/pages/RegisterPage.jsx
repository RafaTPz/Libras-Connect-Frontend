import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
    } catch (err) {
      setError(err.message || 'Falha ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-800">Libras Connect</h1>
          <p className="text-xs text-slate-500">Crie sua conta para começar</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500"
              placeholder="Seu Nome"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500"
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium rounded text-sm transition-colors cursor-pointer"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
          Já tem uma conta?{' '}
          <button
            onClick={onNavigate}
            disabled={loading}
            className="font-semibold text-slate-800 hover:underline bg-transparent border-none cursor-pointer"
          >
            Fazer login
          </button>
        </div>
      </div>
    </div>
  );
}
