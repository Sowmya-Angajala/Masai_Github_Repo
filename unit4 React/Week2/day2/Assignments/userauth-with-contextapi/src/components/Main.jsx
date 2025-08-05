import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Main = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <main style={{ padding: '20px' }}>
            <h2>{isAuthenticated ? 'You are logged in!' : 'Please log in to continue.'}</h2>
        </main>
    );
};

export default Main;
