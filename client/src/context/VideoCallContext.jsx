import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import axios from 'axios';

const VideoCallContext = createContext();

export const useVideoCall = () => useContext(VideoCallContext);

const fetchToken = async (userId) => {
  const response = await axios.get(`http://localhost:8082/stream/token/${userId}`);
  return response.data; // { token, apiKey }
};

export const VideoCallProvider = ({ children, user }) => {
  const [client, setClient] = useState();

  useEffect(() => {
    if (!user?.userId) {
      setClient(undefined);
      return;
    }

    let active = true;
    let apiKey;

    const tokenProvider = async () => {
      const data = await fetchToken(user.userId);
      apiKey = data.apiKey;
      return data.token;
    };

    // Note: StreamVideoClient constructor is synchronous, but we need apiKey first.
    // However, the canonical pattern assumes apiKey is known or fetched.
    // Since we fetch apiKey with the token, we can do a small initialization dance.
    
    const init = async () => {
      try {
        const { token, apiKey: fetchedApiKey } = await fetchToken(user.userId);
        
        if (!active) return;

        const videoClient = new StreamVideoClient({
          apiKey: fetchedApiKey,
          user: {
            id: user.userId,
            name: `${user.firstName} ${user.lastName}`,
            image: user.image?.url || user.avatarUrl,
          },
          tokenProvider: async () => {
            const { token } = await fetchToken(user.userId);
            return token;
          },
        });

        setClient(videoClient);
      } catch (error) {
        console.error('Failed to initialize Stream Video Client:', error);
      }
    };

    init();

    return () => {
      active = false;
      if (client) {
        client.disconnectUser().catch(console.error);
      }
      setClient(undefined);
    };
  }, [user?.userId, user?.firstName, user?.lastName, user?.avatarUrl, user?.image?.url]);

  // If no user, just render children (no video context)
  if (!user) {
    return <>{children}</>;
  }

  // While loading client, we can show children but without video capabilities,
  // or a loading state. Gating the provider is usually better if children depend on it.
  if (!client) {
    return (
      <VideoCallContext.Provider value={{ client: null }}>
        {children}
      </VideoCallContext.Provider>
    );
  }

  return (
    <StreamVideo client={client}>
      <VideoCallContext.Provider value={{ client }}>
        {children}
      </VideoCallContext.Provider>
    </StreamVideo>
  );
};
