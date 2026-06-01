import { WebSocketServer } from 'ws';

let wss;
const userSockets = new Map();

export const initSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'auth') {
          const normalizedId = data.userId.trim();
          userSockets.set(normalizedId, ws);
          ws.userId = normalizedId;
          console.log(`User ${normalizedId} authenticated via WebSocket`);
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    });

    ws.on('close', () => {
      if (ws.userId) {
        userSockets.delete(ws.userId);
        console.log(`User ${ws.userId} disconnected`);
      }
    });
  });
};

export const sendNotification = (userId, notification) => {
  const normalizedId = userId.toString().trim();
  console.log(`Currently authenticated users: ${Array.from(userSockets.keys()).join(', ')}`);
  console.log(`Attempting to send notification to user ${normalizedId}:`, notification);
  const ws = userSockets.get(normalizedId);
  if (ws && ws.readyState === 1) { // 1 = OPEN
    ws.send(JSON.stringify(notification));
    console.log(`Notification sent to user ${normalizedId}`);
  } else {
    console.log(`Could not send notification. Socket exists: ${!!ws}, State: ${ws?.readyState}`);
  }
};
