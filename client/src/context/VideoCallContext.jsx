import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import apiClient from '../api/apiClient';

const VideoCallContext = createContext();

export const useVideoCall = () => useContext(VideoCallContext);

const fetchToken = async (userId) => {
  const response = await apiClient.get(`/stream/token/${userId}`);
  return response.data; // { token, apiKey }
};

export const VideoCallProvider = ({ children, user }) => {
  const [client, setClient] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!user?.userId) {
      if (clientRef.current) {
        clientRef.current.disconnectUser().catch(console.error);
        clientRef.current = null;
      }
      setClient(null);
      return;
    }

    let active = true;

    const init = async () => {
      try {
        const { token, apiKey } = await fetchToken(user.userId);
        
        if (!active) return;

        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: user.userId,
            name: user.firstName ? `${user.firstName} ${user.lastName}` : user.userId,
            image: user.avatarUrl || user.image?.url,
          },
          token,
        });

        clientRef.current = videoClient;
        setClient(videoClient);
      } catch (error) {
        console.error('Failed to initialize Stream Video Client:', error);
      }
    };

    init();

    return () => {
      active = false;
      if (clientRef.current) {
        clientRef.current.disconnectUser().catch(console.error);
        clientRef.current = null;
      }
      setClient(null);
    };
  }, [user?.userId, user?.firstName, user?.lastName, user?.avatarUrl, user?.image?.url]);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <VideoCallContext.Provider value={{ client }}>
      {client ? (
        <StreamVideo client={client}>
          {children}
        </StreamVideo>
      ) : (
        children
      )}
    </VideoCallContext.Provider>
  );
};
