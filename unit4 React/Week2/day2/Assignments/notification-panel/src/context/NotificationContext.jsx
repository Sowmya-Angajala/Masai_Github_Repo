import React, { createContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    // Play a sound or Toast here (Bonus)
    new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1151-pristine.mp3').play();
    // Inside addNotification
toast.info("You have a new message!", { position: "top-right" });
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const startNotifications = () => {
    intervalRef.current = setInterval(() => {
      addNotification("You have a new message!");
    }, 5000);
  };

  const stopNotifications = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startNotifications();
    return () => stopNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        stopNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
