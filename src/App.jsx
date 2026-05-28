import React, { useEffect, useState } from 'react';

function App() {
  const [serverMessage, setServerMessage] = useState('Connecting to API...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerMessage(data.message))
      .catch(err => setServerMessage('Could not connect to API'));
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>React + Vite Boilerplate</h1>
      <p style={{ color: '#00f2fe', fontSize: '1.2rem', marginTop: '1rem' }}>
        Status: {serverMessage}
      </p>
    </div>
  );
}

export default App;
