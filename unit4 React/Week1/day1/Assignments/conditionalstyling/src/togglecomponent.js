import React, { useState } from 'react';

const ColorToggleButton = () => {
  const [color, setColor] = useState('green');

  const toggleColor = () => {
    setColor(prevColor => (prevColor === 'green' ? 'yellow' : 'green'));
  };

  const getTextColor = (bgColor) => {
    return bgColor === 'green' ? 'white' : 'black';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={toggleColor}
        style={{
          backgroundColor: color,
          color: getTextColor(color),
          padding: '10px 20px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Color: {color.charAt(0).toUpperCase() + color.slice(1)}
      </button>

      <p style={{ fontSize: '20px', marginTop: '20px' }}>
        Current Color: {color.charAt(0).toUpperCase() + color.slice(1)}
      </p>
    </div>
  );
};

export default ColorToggleButton;
