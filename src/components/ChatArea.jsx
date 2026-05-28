import React, { useState } from 'react';

export function ChatArea({ activeChat }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Olá Rafael! Tudo bem? Prefere Libras ou texto?' },
    { id: 2, sender: 'me', text: 'Olá! Podemos nos falar por texto por enquanto.' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      sender: 'me',
      text: inputText
    }]);
    setInputText('');
  };

  const contactName = activeChat === 1 ? 'Lara Santos' : activeChat === 2 ? 'Lucas Oliveira' : 'Mariana Souza';

  return (
    <main className="flex-1 h-full bg-slate-50 flex flex-col min-w-0">
      {/* Top Navbar */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center px-6">
        <h2 className="font-semibold text-slate-800">{contactName}</h2>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div 
              key={msg.id} 
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  isMe 
                    ? 'bg-deaf-blue text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Text Input Form */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-3">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escreva uma mensagem..." 
          className="flex-1 py-2 px-3 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-deaf-blue text-slate-800"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-deaf-blue hover:bg-deaf-blue/90 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
