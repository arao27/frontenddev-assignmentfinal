import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const linkStyle = path => ({
    marginRight: '16px',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    textDecoration: 'none',
    color: '#333',
  });

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={linkStyle('/')}>
        Home
      </Link>
      <Link to="/stats" style={linkStyle('/stats')}>
        Your Stats
      </Link>
      <Link to="/saved" style={linkStyle('/saved')}>
        Saved Stats
      </Link>
      <Link to="/login" style={linkStyle('/login')}>
        Login
      </Link>
    </nav>
  );
}

export default Navigation;