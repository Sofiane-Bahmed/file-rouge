import { WebSocketServer } from 'ws';

let wss;
const userSockets = new Map();

export const initSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('error', (error) => {
    console.error('WebSocket Server Error:', error);
  });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'auth') {
          if (!data.userId) {
            console.error('Auth message missing userId');
            return;
          }
          const normalizedId = data.userId.toString().trim();
          userSockets.set(normalizedId, ws);
          ws.userId = normalizedId;
          console.log(`User ${normalizedId} authenticated via WebSocket`);
        } else if (data.type === 'TYPING') {
          const { receiverId, isTyping } = data;
          if (receiverId) {
            sendNotification(receiverId, {
              type: 'TYPING_STATUS',
              data: {
                senderId: ws.userId,
                isTyping
              }
            });
          }
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
  try {
    if (!userId) {
      console.warn('Cannot send notification: userId is missing');
      return;
    }
    const normalizedId = userId.toString().trim();
    console.log(`Currently authenticated users: ${Array.from(userSockets.keys()).join(', ')}`);
    console.log(`Attempting to send notification to user ${normalizedId}:`, notification);
    
    const ws = userSockets.get(normalizedId);
    if (ws && ws.readyState === 1) { // 1 = OPEN
      ws.send(JSON.stringify(notification), (err) => {
        if (err) {
          console.error(`Error sending WebSocket message to user ${normalizedId}:`, err);
        }
      });
      console.log(`Notification sent to user ${normalizedId}`);
    } else {
      console.log(`Could not send notification. Socket exists: ${!!ws}, State: ${ws?.readyState}`);
    }
  } catch (error) {
    console.error('Error in sendNotification:', error);
  }
};
