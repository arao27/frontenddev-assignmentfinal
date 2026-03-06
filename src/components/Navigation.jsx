import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const linkStyle = path => ({
    marginRight: '16px',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    textDecoration: 'none',
    color: '#333',
  });

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/stats" style={linkStyle('/stats')}>Your Stats</Link>
      {user && <Link to="/saved" style={linkStyle('/saved')}>Saved Stats</Link>}
      {!user ? (
        <Link to="/login" style={linkStyle('/login')}>Login</Link>
      ) : (
        <button onClick={logout} style={{ marginLeft: '16px' }}>Logout</button>
      )}
    </nav>
  );
}

export default Navigation;