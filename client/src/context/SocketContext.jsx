import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const onMessageReceivedRef = useRef(null);

  // Function to set the callback without triggering effect re-run
  const setOnMessageReceived = (callback) => {
    onMessageReceivedRef.current = callback;
  };

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket('ws://localhost:8082');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      ws.send(JSON.stringify({ type: 'auth', userId }));
    };

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        console.log('Received WebSocket notification:', notification);
        
        if (notification.type === 'NEW_MESSAGE') {
          if (onMessageReceivedRef.current) {
            onMessageReceivedRef.current(notification.data);
          }
        }
        
        // Always add to notifications list
        setNotifications((prev) => [notification, ...prev]);
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [userId]); // Only depend on userId

  const clearNotifications = () => setNotifications([]);

  return (
    <SocketContext.Provider value={{ socket, notifications, clearNotifications, setOnMessageReceived }}>
      {children}
    </SocketContext.Provider>
  );
};
