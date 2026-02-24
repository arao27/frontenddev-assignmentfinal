import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '16px' }}>
        Home
      </Link>
      <Link to="/stats" style={{ marginRight: '16px' }}>
        Your Stats
      </Link>
      <Link to="/saved" style={{ marginRight: '16px' }}>
        Saved Stats
      </Link>
      <Link to="/login">
        Login
      </Link>
    </nav>
  );
}

export default Navigation;