import React, { useEffect, useState } from 'react';
import { 
  useStreamVideoClient, 
  StreamCall, 
  SpeakerLayout, 
  CallControls,
  useCallStateHooks,
  VideoPreview,
  StreamTheme,
  Avatar,
  useConnectedUser,
  useCall,
} from '@stream-io/video-react-sdk';
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdCallEnd, MdPeople } from 'react-icons/md';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { launchSession } from '../../api/sessionService';
import { getMentorshipRequestById } from '../../api/requestService';

const Lobby = ({ onJoin }) => {
  const { useMicrophoneState, useCameraState, useCallSession, useCallMembers } = useCallStateHooks();
  const { microphone, isMuted: isMicMuted } = useMicrophoneState();
  const { camera, isMuted: isCamMuted } = useCameraState();
  const session = useCallSession();
  const members = useCallMembers();
  const user = useConnectedUser();

  const otherParticipants = session?.participants.filter(p => p.user.id !== user?.id) || [];
  const otherMembers = members?.filter(m => m.user.id !== user?.id) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center h-full p-6 text-white">
      {/* Video Preview Section */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="relative aspect-video bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/5 group">
          <VideoPreview />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => microphone.toggle()}
              className={`p-4 rounded-2xl backdrop-blur-md transition-all ${!isMicMuted ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {!isMicMuted ? <MdMic size={24} /> : <MdMicOff size={24} />}
            </button>
            <button
              onClick={() => camera.toggle()}
              className={`p-3 rounded-2xl backdrop-blur-md transition-all ${!isCamMuted ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {!isCamMuted ? <MdVideocam size={24} /> : <MdVideocamOff size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Join Info Section */}
      <div className="w-full max-w-md flex flex-col gap-8 bg-gray-900/60 p-10 rounded-[3rem] backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
        <div className="text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-[#007749]/20 text-[#007749] text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6 border border-[#007749]/30">
            Private Session
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight leading-tight">Mentorship Call</h1>
          <p className="text-gray-400 text-lg font-medium leading-relaxed opacity-80">
            Secure 1-to-1 environment. Verified partners only.
          </p>
        </div>

        {otherMembers.length > 0 && (
          <div className="flex flex-col gap-5 p-8 bg-white/5 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007749]/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
            
            <div className="flex items-center gap-2 text-[10px] font-black text-[#007749] uppercase tracking-[0.25em] mb-1">
              <MdPeople size={16} />
              Session Partner
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar
                  imageSrc={otherMembers[0].user.image}
                  name={otherMembers[0].user.name}
                  className="w-16 h-16 border-2 border-[#007749] rounded-2xl shadow-2xl transition-transform group-hover:scale-105"
                />
                {otherParticipants.length > 0 && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#1a1a1a] rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-xl truncate tracking-tight">{otherMembers[0].user.name}</p>
                <p className="text-xs text-gray-500 font-bold mt-0.5 flex items-center gap-1.5">
                  {otherParticipants.length > 0 ? (
                    <span className="text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      Waiting in call
                    </span>
                  ) : (
                    'Not yet present'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onJoin}
          className="w-full py-6 bg-[#007749] hover:bg-[#008855] text-white font-black text-xl rounded-2xl transition-all shadow-[0_20px_40px_-12px_rgba(0,119,73,0.4)] transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-4 group"
        >
          <span>Enter Session</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

const CallUI = ({ onLeave }) => {
  return (
    <div className="relative h-full bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
      <SpeakerLayout 
        participantsBarPosition="right" 
      />
      
      {/* Floating Call Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out transform group-hover:translate-y-0 translate-y-4 opacity-90 group-hover:opacity-100">
        <div className="bg-[#111827]/95 backdrop-blur-3xl px-8 py-4 rounded-[3rem] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex items-center gap-6">
          <CallControls onLeave={onLeave} />
        </div>
      </div>

      <style>{`
        .str-video__speaker-layout__wrapper {
          height: 100% !important;
          padding: 1.5rem !important;
        }
        .str-video__participant-view {
          border-radius: 2rem !important;
          overflow: hidden !important;
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .str-video__participants-bar {
          padding: 1rem !important;
          background: transparent !important;
          width: 300px !important;
        }
        .str-video__participants-bar .str-video__participant-view {
          width: 100% !important;
          aspect-ratio: 16/9 !important;
          margin-bottom: 1.5rem !important;
          border: 2px solid rgba(0, 119, 73, 0.3) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
        .str-video__speaker-layout__main {
          border-radius: 2rem !important;
        }
      `}</style>
    </div>
  );
};

const VideoCallContent = ({ onLeave, callId }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [hasJoined, setHasJoined] = useState(false);
  const call = useCall();

  const handleJoin = async () => {
    try {
      await call.join({ create: true });
      
      // Record session in DB (idempotent on backend)
      try {
        const { data } = await getMentorshipRequestById(callId);
        if (data?.request) {
          const { mentor, aprenant } = data.request;
          await launchSession({
            mentorId: mentor._id,
            aprenantId: aprenant._id,
            startTime: new Date().toLocaleTimeString(),
            link: callId,
            date: new Date()
          });
        }
      } catch (err) {
        console.error('Failed to record session:', err);
      }

      setHasJoined(true);
    } catch (err) {
      console.error('Failed to join call:', err);
    }
  };

  if (callingState === 'joining') {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#007749] border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Connecting to session...</p>
        </div>
      </div>
    );
  }

  if (callingState === 'joined' || hasJoined) {
    return <CallUI onLeave={onLeave} />;
  }

  return <Lobby onJoin={handleJoin} />;
};

const VideoCall = ({ callId, onLeave }) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!client || !callId) return;

    const sanitizedCallId = callId.toString().replace(/[^a-zA-Z0-9_\-.]/g, '_');
    const c = client.call('default', sanitizedCallId);
    
    let active = true;
    c.getOrCreate().then(() => {
      if (active) setCall(c);
    }).catch((err) => {
      console.error('Call initialization error:', err);
      if (active) setError('You do not have permission to join this session or it could not be initialized.');
    });

    return () => {
      active = false;
      if (c.state.callingState !== 'left') {
        c.leave().catch(err => {
          if (err.message !== 'Cannot leave call that has already been left.') {
            console.error(err);
          }
        });
      }
    };
  }, [client, callId]);

  if (error) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
        <div className="bg-gray-900 p-8 rounded-3xl border border-red-500/20 text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdCallEnd size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {error}
          </p>
          <button 
            onClick={onLeave}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!call) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
      <style>{`
        .str-video {
          --str-video__primary-color: #007749;
          --str-video__background-color: #111827;
          --str-video__border-radius-circle: 16px;
          --str-video__border-radius-normal: 12px;
          --str-video__text-color1: #ffffff;
          --str-video__text-color2: #9ca3af;
          --str-video__surface-color: #1f2937;
        }
        .str-video__call-controls__button {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .str-video__call-controls__button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        /* Fix for black text in dropdowns/menus */
        .str-video__menu-container,
        .str-video__device-settings,
        .str-video__dropdown {
          color: #ffffff !important;
          background-color: #1f2937 !important;
        }
        .str-video__menu-item {
          color: #ffffff !important;
        }
        .str-video__menu-item:hover {
          background-color: #374151 !important;
        }
      `}</style>
      
      <div className="w-full max-w-7xl h-full max-h-[900px] flex flex-col">
        <div className="flex justify-between items-center mb-6 text-white px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#007749] rounded-xl flex items-center justify-center shadow-lg shadow-[#007749]/20">
              <MdVideocam size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-none">Mentorship Session</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLeave}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold rounded-xl transition-all border border-red-600/20"
          >
            <MdCallEnd size={20} />
            <span>End Session</span>
          </button>
        </div>
        
        <div className="flex-1 min-h-0">
          <StreamCall call={call}>
            <StreamTheme className="dark h-full">
              <VideoCallContent onLeave={onLeave} callId={callId} />
            </StreamTheme>
          </StreamCall>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
