import { StreamClient } from '@stream-io/node-sdk';

export const getStreamToken = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Generating Stream token for user: ${userId}`);

    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!apiKey || !apiSecret) {
      console.error('Stream API credentials missing from environment');
      return res.status(500).json({ message: "Stream API credentials are not configured" });
    }

    const client = new StreamClient(apiKey, apiSecret);
    
    // validity_in_seconds is optional, defaults to 3600
    const token = client.generateUserToken({ 
      user_id: userId.toString(),
      validity_in_seconds: 3600
    });
    
    console.log(`Successfully generated token for ${userId}`);
    res.status(200).json({ token, apiKey });
  } catch (error) {
    console.error('Stream token generation error:', error);
    res.status(500).json({ message: error.message || "Token generation failed" });
  }
};
