import React, { useEffect, useState } from 'react';
import { 
  useStreamVideoClient, 
  StreamCall, 
  SpeakerLayout, 
  CallControls,
  useCallStateHooks
} from '@stream-io/video-react-sdk';

const MyVideoUI = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== 'joined') {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#007749] border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      <SpeakerLayout participantsBarPosition="bottom" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <CallControls />
      </div>
    </div>
  );
};

const VideoCall = ({ callId, onLeave }) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState();

  useEffect(() => {
    if (!client || !callId) return;

    // Stream call IDs must be alphanumeric plus _, -, and .
    const sanitizedCallId = callId.toString().replace(/[^a-zA-Z0-9_\-.]/g, '_');
    console.log(`Attempting to join call: ${sanitizedCallId} with client:`, client.userID);

    const c = client.call('default', sanitizedCallId);
    let active = true;

    c.join({ create: true })
      .then(() => {
        if (active) {
          console.log('Successfully joined call:', sanitizedCallId);
          setCall(c);
        }
      })
      .catch((err) => {
        console.error('Failed to join call details:', {
          error: err,
          message: err.message,
          callId: sanitizedCallId,
          userId: client.userID
        });
      });

    return () => {
      active = false;
      c.leave().catch(err => console.error('Error leaving call:', err));
      setCall(undefined);
    };
  }, [client, callId]);

  if (!call) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
      <div className="w-full max-w-6xl h-full max-h-[800px] flex flex-col">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Mentorship Session
          </h2>
          <button 
            onClick={onLeave}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            End Session
          </button>
        </div>
        
        <div className="flex-1 min-h-0">
          <StreamCall call={call}>
            <MyVideoUI />
          </StreamCall>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
