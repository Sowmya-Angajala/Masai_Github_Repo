import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ChildComponent = () => {
    const { theme } = useContext(ThemeContext);

    const childStyle = {
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#555555',
        color: theme === 'light' ? '#000000' : '#ffffff',
        padding: '10px 20px',
        borderRadius: '10px',
    };

    return (
        <div style={childStyle}>
            <p>This is a child component that adapts to the "{theme}" theme.</p>
        </div>
    );
};

export default ChildComponent;
