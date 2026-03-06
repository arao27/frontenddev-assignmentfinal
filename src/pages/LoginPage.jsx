import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // On mount, check localStorage for token
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    // Fake login: check if stored user matches
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser(storedUser);
      alert(`Logged in as ${username}`);
    } else {
      alert('Invalid credentials');
    }
    setUsername('');
    setPassword('');
  };

  const handleSignup = e => {
    e.preventDefault();
    // Fake signup: store user in localStorage
    const newUser = { username, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    alert(`Account created for ${username}`);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('Logged out');
  };

  if (user) {
    return (
      <div style={{ padding: '16px' }}>
        <h2>Welcome, {user.username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ marginRight: '8px' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ marginRight: '8px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button
        style={{ marginTop: '12px' }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default LoginPage;