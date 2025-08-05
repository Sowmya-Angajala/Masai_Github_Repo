import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Navbar;
