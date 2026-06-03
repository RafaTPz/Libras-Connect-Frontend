import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ChatPage } from './pages/ChatPage';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [view, setView] = useState('login');

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-deaf-blue animate-spin"></div>
          </div>
          <p className="text-slate-500 font-medium text-sm animate-pulse">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <ChatPage />;
  }

  if (view === 'login') {
    return <LoginPage onNavigate={() => setView('register')} />;
  }

  return <RegisterPage onNavigate={() => setView('login')} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

