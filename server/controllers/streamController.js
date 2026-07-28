import { StreamClient } from '@stream-io/node-sdk';
import { MentorshipRequest } from '../models/mentorshipRequest.js';

export const getStreamToken = async (req, res) => {
  try {
    const { userId } = req.params;
    const { requestId } = req.query; // Optional: context of the call

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
    
    // Offset issued-at to 24 hours in the past and validity to 30 days to bypass clock skew
    const token = client.generateUserToken({ 
      user_id: userId.toString(),
      validity_in_seconds: 30 * 24 * 60 * 60, // 30 days
      iat: Math.floor(Date.now() / 1000) - 24 * 60 * 60 // 1 day ago
    });

    // If a requestId is provided, we ensure both participants are members of the call
    if (requestId) {
      const mentorshipRequest = await MentorshipRequest.findById(requestId);
      if (mentorshipRequest && mentorshipRequest.status === 'accepted') {
        const { aprenant, mentor } = mentorshipRequest;
        
        // Ensure the requesting user is one of the participants
        if (userId !== aprenant.toString() && userId !== mentor.toString()) {
          return res.status(403).json({ message: "You are not authorized for this session" });
        }

        const call = client.video.call('default', requestId.toString());
        await call.getOrCreate({
          data: {
            members: [
              { user_id: aprenant.toString(), role: 'call-member' },
              { user_id: mentor.toString(), role: 'call-member' },
            ],
          },
        });
        console.log(`Ensured membership for call: ${requestId}`);
      }
    }
    
    console.log(`Successfully generated token for ${userId}`);
    res.status(200).json({ token, apiKey });
  } catch (error) {
    console.error('Stream token generation error:', error);
    res.status(500).json({ message: error.message || "Token generation failed" });
  }
};
