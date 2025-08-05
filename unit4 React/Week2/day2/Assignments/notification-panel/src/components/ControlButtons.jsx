import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const ControlButtons = () => {
  const { markAllAsRead, stopNotifications } = useContext(NotificationContext);

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={markAllAsRead} style={{ marginRight: '10px' }}>
        Mark All as Read
      </button>
      <button onClick={stopNotifications}>Stop Notifications</button>
    </div>
  );
};

export default ControlButtons;
