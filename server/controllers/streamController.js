import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const getStreamToken = async (req, res) => {
  try {
    const { userId } = req.params;
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    
    if (!userId) {
      console.error('Stream Token Error: userId is missing');
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!apiKey || !apiSecret) {
      console.error('Stream Token Error: API Key or Secret missing from env', { apiKey: !!apiKey, apiSecret: !!apiSecret });
      return res.status(500).json({ message: "Stream API credentials are not configured" });
    }

    const client = new StreamClient(apiKey, apiSecret);
    
    const token = client.generateUserToken({ 
      user_id: userId, 
      validity_in_seconds: 3600 
    });
    
    res.status(200).json({ token, apiKey });
  } catch (error) {
    console.error('Detailed Stream token error:', error);
    res.status(500).json({ message: error.message });
  }
};
