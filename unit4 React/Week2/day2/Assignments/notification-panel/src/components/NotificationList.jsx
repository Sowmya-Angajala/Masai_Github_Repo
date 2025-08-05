import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const NotificationList = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              fontWeight: notif.read ? 'normal' : 'bold',
              backgroundColor: notif.read ? 'white' : '#e0f7fa',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '5px',
            }}
          >
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
