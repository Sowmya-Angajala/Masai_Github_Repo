import React from 'react';
import { NotificationProvider } from './context/NotificationContext';
import NotificationList from './components/NotificationList';
import ControlButtons from './components/ControlButtons';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <NotificationProvider>
      <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
        <h1>Real-Time Notification Panel</h1>
        <NotificationList />
        <ControlButtons />
         <ToastContainer />
      </div>
    </NotificationProvider>
  );
}

export default App;
