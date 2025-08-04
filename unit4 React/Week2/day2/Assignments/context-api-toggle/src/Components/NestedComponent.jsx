import React from 'react';
import ChildComponent from './ChildComponent';

const NestedComponent = () => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Nested Component</h2>
            <ChildComponent />
        </div>
    );
};

export default NestedComponent;
