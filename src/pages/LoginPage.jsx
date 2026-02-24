import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    alert(`Logged in as ${username} (MVP placeholder)`);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label style={{ marginRight: '8px' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '8px' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;