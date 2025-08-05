import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);

    return (
        <nav style={{ background: '#eee', padding: '10px' }}>
            <button onClick={toggleAuth}>
                {isAuthenticated ? 'Logout' : 'Login'}
            </button>
        </nav>
    );
};

export default Navbar;
