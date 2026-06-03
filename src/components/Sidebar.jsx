import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Sidebar({ activeChat, setActiveChat }) {
  const { user, logout } = useAuth();

  const contacts_mock = [
    { id: 1, name: 'Lara Santos', online: true, lastMsg: 'Tudo bem? Prefere Libras?' },
    { id: 2, name: 'Lucas Oliveira', online: true, lastMsg: 'A transcrição funcionou.' },
    { id: 3, name: 'Mariana Souza', online: false, lastMsg: 'Te vejo amanhã!' }
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className="w-80 h-full border-r border-slate-200 bg-white flex flex-col">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Mensagens</h1>
      </div>

      {/* Busca Simples */}
      <div className="p-3">
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-deaf-blue"
        />
      </div>

      {/* Lista de Contatos */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {contacts_mock.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setActiveChat(contact.id)}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
              activeChat === contact.id ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            {/* Status dot */}
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${contact.online ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            
            <div className="min-w-0 flex-1">
              <h4 className="text-sm text-slate-800 truncate">{contact.name}</h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">{contact.lastMsg}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Logged in User Profile Footer */}
      {user && (
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Initials Avatar */}
            <div className="w-9 h-9 rounded bg-slate-200 flex items-center justify-center font-semibold text-slate-700 text-sm flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 truncate">{user.name}</h4>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={logout}
            title="Sair da conta"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded transition-colors focus:outline-none cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
}

