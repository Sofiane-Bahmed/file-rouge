import React, { useEffect, useState, useRef } from 'react';
import { 
  useStreamVideoClient, 
  StreamCall, 
  ParticipantView,
  useCallStateHooks,
  VideoPreview,
  StreamTheme,
  Avatar,
  useConnectedUser,
  useCall,
  useParticipantViewContext,
} from '@stream-io/video-react-sdk';
import { 
  MdMic, 
  MdMicOff, 
  MdVideocam, 
  MdVideocamOff, 
  MdCallEnd, 
  MdPeople, 
  MdSettings, 
  MdScreenShare, 
  MdKeyboardArrowUp, 
  MdKeyboardArrowDown, 
  MdCheck, 
  MdVolumeUp, 
  MdSignalCellularAlt, 
  MdClose,
  MdInfo
} from 'react-icons/md';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { launchSession } from '../../api/sessionService';
import { getMentorshipRequestById } from '../../api/requestService';
import apiClient from '../../api/apiClient';

// Custom reusable device dropdown selector
const DeviceSelector = ({ icon, label, devices, selectedDevice, onSelect }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedDevice || ''}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full bg-zinc-800/80 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl py-3.5 pl-4 pr-10 border border-zinc-700/60 outline-none focus:border-[#5B5FC7] focus:ring-2 focus:ring-[#5B5FC7]/20 transition-all cursor-pointer appearance-none shadow-sm"
        >
          {devices && devices.length > 0 ? (
            devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId} className="bg-zinc-800 text-white">
                {device.label || `Device ${device.deviceId.substring(0, 5)}`}
              </option>
            ))
          ) : (
            <option value="" disabled className="text-zinc-500">No device detected or permission denied</option>
          )}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
          <MdKeyboardArrowDown size={18} />
        </div>
      </div>
    </div>
  );
};

// Lobby (Pre-join Screen)
const Lobby = ({ onJoin }) => {
  const { 
    useMicrophoneState, 
    useCameraState, 
    useSpeakerState, 
    useCallSession, 
    useCallMembers 
  } = useCallStateHooks();

  const { microphone, isMuted: isMicMuted, devices: micDevices, selectedDevice: selectedMic } = useMicrophoneState();
  const { camera, isMuted: isCamMuted, devices: camDevices, selectedDevice: selectedCam } = useCameraState();
  const { speaker, devices: speakerDevices, selectedDevice: selectedSpeaker } = useSpeakerState();

  const session = useCallSession();
  const members = useCallMembers();
  const user = useConnectedUser();

  const otherParticipants = session?.participants.filter(p => p.user.id !== user?.id) || [];
  const otherMembers = members?.filter(m => m.user.id !== user?.id) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl w-full mx-auto p-4 md:p-8 text-white">
      {/* Video Preview Card */}
      <div className="flex-1 flex flex-col justify-between bg-zinc-900/60 border border-zinc-800 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#5B5FC7]/10 blur-[100px] rounded-full -ml-24 -mt-24"></div>
        
        <div className="flex items-center justify-between mb-4 z-10">
          <h3 className="font-bold text-lg text-zinc-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Camera Preview
          </h3>
          <span className="text-xs font-bold text-zinc-400 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
            Secure Feed
          </span>
        </div>

        <div className="relative aspect-video bg-zinc-950 rounded-2xl overflow-hidden shadow-inner border border-zinc-800/80 group">
          <VideoPreview />
          
          {/* Quick-toggle media overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10 transition-opacity duration-300">
            <button
              onClick={() => microphone.toggle()}
              className={`p-3.5 rounded-xl border transition-all ${
                !isMicMuted 
                  ? 'bg-zinc-900/90 border-zinc-700/60 hover:bg-zinc-800 text-white' 
                  : 'bg-red-500/90 border-red-400/30 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
              }`}
            >
              {!isMicMuted ? <MdMic size={22} /> : <MdMicOff size={22} />}
            </button>
            <button
              onClick={() => camera.toggle()}
              className={`p-3.5 rounded-xl border transition-all ${
                !isCamMuted 
                  ? 'bg-zinc-900/90 border-zinc-700/60 hover:bg-zinc-800 text-white' 
                  : 'bg-red-500/90 border-red-400/30 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
              }`}
            >
              {!isCamMuted ? <MdVideocam size={22} /> : <MdVideocamOff size={22} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-zinc-500 font-medium mt-4 z-10">
          Your camera will be turned on immediately when entering if not muted.
        </p>
      </div>

      {/* Device Config & Details Panel */}
      <div className="w-full lg:w-[420px] flex flex-col justify-between bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#5B5FC7]/15 border border-[#5B5FC7]/30 text-[#8f93ec] text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-4">
              Microsoft Teams Mode
            </div>
            <h1 className="text-3xl font-black mb-2 tracking-tight">Mentorship Room</h1>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              Verify your media settings before connecting.
            </p>
          </div>

          <div className="w-full h-px bg-zinc-800/60"></div>

          {/* Quick Device Selectors */}
          <div className="flex flex-col gap-4">
            <DeviceSelector 
              icon={<MdVideocam className="text-[#5B5FC7]" />} 
              label="Camera (Video Input)" 
              devices={camDevices} 
              selectedDevice={selectedCam} 
              onSelect={(id) => camera.selectDevice(id)} 
            />
            <DeviceSelector 
              icon={<MdMic className="text-[#5B5FC7]" />} 
              label="Microphone (Audio Input)" 
              devices={micDevices} 
              selectedDevice={selectedMic} 
              onSelect={(id) => microphone.selectDevice(id)} 
            />
            {speakerDevices && speakerDevices.length > 0 && (
              <DeviceSelector 
                icon={<MdVolumeUp className="text-[#5B5FC7]" />} 
                label="Speaker (Audio Output)" 
                devices={speakerDevices} 
                selectedDevice={selectedSpeaker} 
                onSelect={(id) => speaker.selectDevice(id)} 
              />
            )}
          </div>

          {/* Waiting information */}
          {otherMembers.length > 0 && (
            <div className="p-4 bg-zinc-800/40 border border-zinc-700/30 rounded-2xl flex items-center gap-4 mt-2">
              <Avatar
                imageSrc={otherMembers[0].user.image}
                name={otherMembers[0].user.name}
                className="w-10 h-10 border border-[#5B5FC7] rounded-xl shadow-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-zinc-100 truncate">{otherMembers[0].user.name}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                  {otherParticipants.length > 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      Waiting in call
                    </span>
                  ) : (
                    'Not present yet'
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onJoin}
          className="w-full mt-8 py-5 bg-[#5B5FC7] hover:bg-[#6a6edd] text-white font-black text-lg rounded-2xl transition-all shadow-[0_20px_40px_-12px_rgba(91,95,199,0.3)] transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          <span>Join Now</span>
          <div className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

// Custom Video Overlay Component inside ParticipantView
const CustomParticipantOverlay = () => {
  const { participant } = useParticipantViewContext();

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-10">
      {/* Top Bar: Connection, Mic Status */}
      <div className="flex justify-between items-start w-full">
        {/* Network indicator */}
        <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-bold text-emerald-400 flex items-center gap-1">
          <MdSignalCellularAlt size={10} />
          <span>Connected</span>
        </div>

        {/* Audio Muted Indicator */}
        {!participant.audio && (
          <div className="p-2 bg-red-500/25 border border-red-500/25 backdrop-blur-md rounded-xl text-red-500 shadow-md">
            <MdMicOff size={16} />
          </div>
        )}
      </div>

      {/* Bottom overlay: Name and Local user badge */}
      <div className="flex items-center gap-2 self-start px-3 py-1.5 bg-zinc-950/60 backdrop-blur-md rounded-xl border border-zinc-800/80 text-white pointer-events-auto shadow-lg">
        <span className="font-bold text-xs">{participant.name}</span>
        {participant.isLocalParticipant && (
          <span className="text-[9px] font-black text-[#8f93ec] uppercase tracking-wider bg-[#5B5FC7]/20 px-1.5 py-0.5 rounded-md">You</span>
        )}
      </div>
    </div>
  );
};

// Custom Video Placeholder when camera is disabled
const CustomPlaceholder = ({ style, participant }) => {
  return (
    <div style={style} className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-850 to-zinc-950 text-white border border-zinc-850">
      <div className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 text-3xl font-black border border-zinc-700 shadow-2xl transition-all duration-500 ${
        participant.isSpeaking ? 'ring-4 ring-[#5B5FC7] scale-105 bg-zinc-750' : 'ring-2 ring-white/5'
      }`}>
        {participant.image ? (
          <img src={participant.image} alt="" className="w-full h-full rounded-full object-cover" />
        ) : (
          participant.name?.charAt(0).toUpperCase() || 'U'
        )}

        {/* Pulsing visual indicator when speaking with camera off */}
        {participant.isSpeaking && (
          <div className="absolute inset-0 rounded-full ring-8 ring-[#5B5FC7]/20 animate-ping"></div>
        )}
      </div>
      
      <p className="mt-4 font-bold text-sm text-zinc-300 tracking-tight">{participant.name}</p>
      
      {participant.isSpeaking && (
        <span className="text-[10px] text-[#8f93ec] font-black mt-2 animate-pulse uppercase tracking-[0.2em] bg-[#5B5FC7]/10 px-2.5 py-0.5 rounded-full border border-[#5B5FC7]/25">
          Speaking
        </span>
      )}
    </div>
  );
};

// Custom Active Speaker Timer
const CallTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/60 rounded-lg flex items-center gap-1.5">
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
      <span className="font-mono text-xs font-bold text-zinc-300">{formatTime(seconds)}</span>
    </div>
  );
};

// Participants Custom Grid Component
const ParticipantsGrid = ({ participants }) => {
  const gridClass = participants.length === 1
    ? 'grid-cols-1 max-w-3xl'
    : participants.length === 2
    ? 'grid-cols-1 md:grid-cols-2 max-w-5xl'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl';

  return (
    <div className={`grid gap-6 w-full p-6 items-center justify-center mx-auto ${gridClass}`}>
      {participants.map((p) => {
        const isSpeaking = p.isSpeaking;
        return (
          <div 
            key={p.sessionId}
            className={`relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-550 border ${
              isSpeaking 
                ? 'border-[#5B5FC7] ring-4 ring-[#5B5FC7]/20 scale-[1.015]' 
                : 'border-zinc-850 hover:border-zinc-750'
            } bg-zinc-900`}
          >
            <ParticipantView 
              participant={p}
              ParticipantViewUI={CustomParticipantOverlay}
              VideoPlaceholder={CustomPlaceholder}
            />
          </div>
        );
      })}
    </div>
  );
};

// Teams Custom Floating Control Toolbar
const CustomCallControls = ({ onLeave, onToggleSidebar, activeSidebar }) => {
  const { useMicrophoneState, useCameraState, useScreenShareState } = useCallStateHooks();
  
  const { microphone, isMuted: isMicMuted, devices: micDevices, selectedDevice: selectedMic } = useMicrophoneState();
  const { camera, isMuted: isCamMuted, devices: camDevices, selectedDevice: selectedCam } = useCameraState();
  const { screenShare, isSharing } = useScreenShareState();
  
  const [showMicMenu, setShowMicMenu] = useState(false);
  const [showCamMenu, setShowCamMenu] = useState(false);

  const micRef = useRef(null);
  const camRef = useRef(null);

  // Close menus on click outside
  useEffect(() => {
    const clickHandler = (e) => {
      if (micRef.current && !micRef.current.contains(e.target)) setShowMicMenu(false);
      if (camRef.current && !camRef.current.contains(e.target)) setShowCamMenu(false);
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, []);

  return (
    <div className="flex items-center gap-3 bg-zinc-950/90 border border-zinc-800/80 px-5 py-3 rounded-2xl backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] z-50">
      
      {/* Microphone controls */}
      <div ref={micRef} className="relative flex items-center">
        <button
          onClick={() => microphone.toggle()}
          className={`flex items-center justify-center p-3 rounded-xl transition-all border outline-none ${
            isMicMuted 
              ? 'bg-red-500/20 border-red-500/20 text-red-500 hover:bg-red-500/30' 
              : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100'
          }`}
          title={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMicMuted ? <MdMicOff size={20} /> : <MdMic size={20} />}
        </button>
        <button
          onClick={() => setShowMicMenu(!showMicMenu)}
          className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 ml-0.5 transition-all outline-none"
        >
          <MdKeyboardArrowUp size={16} />
        </button>
        
        {/* Microphone Dropdown Device Switcher */}
        {showMicMenu && (
          <div className="absolute bottom-16 left-0 bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl shadow-2xl flex flex-col gap-1 min-w-[240px] text-left animate-in fade-in slide-in-from-bottom-2 duration-150 z-[100]">
            <div className="px-3 py-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800/60 mb-1">Microphone Input</div>
            {micDevices.map((d) => (
              <button
                key={d.deviceId}
                onClick={() => {
                  microphone.selectDevice(d.deviceId);
                  setShowMicMenu(false);
                }}
                className="flex items-center justify-between px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-800 rounded-xl transition-all text-left outline-none"
              >
                <span className="truncate pr-4 font-medium">{d.label || 'Microphone'}</span>
                {selectedMic === d.deviceId && <MdCheck className="text-emerald-400" size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Camera controls */}
      <div ref={camRef} className="relative flex items-center">
        <button
          onClick={() => camera.toggle()}
          className={`flex items-center justify-center p-3 rounded-xl transition-all border outline-none ${
            isCamMuted 
              ? 'bg-red-500/20 border-red-500/20 text-red-500 hover:bg-red-500/30' 
              : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100'
          }`}
          title={isCamMuted ? 'Turn camera ON' : 'Turn camera OFF'}
        >
          {isCamMuted ? <MdVideocamOff size={20} /> : <MdVideocam size={20} />}
        </button>
        <button
          onClick={() => setShowCamMenu(!showCamMenu)}
          className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 ml-0.5 transition-all outline-none"
        >
          <MdKeyboardArrowUp size={16} />
        </button>
        
        {/* Camera Dropdown Device Switcher */}
        {showCamMenu && (
          <div className="absolute bottom-16 left-0 bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl shadow-2xl flex flex-col gap-1 min-w-[240px] text-left animate-in fade-in slide-in-from-bottom-2 duration-150 z-[100]">
            <div className="px-3 py-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800/60 mb-1">Camera Input</div>
            {camDevices.map((d) => (
              <button
                key={d.deviceId}
                onClick={() => {
                  camera.selectDevice(d.deviceId);
                  setShowCamMenu(false);
                }}
                className="flex items-center justify-between px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-800 rounded-xl transition-all text-left outline-none"
              >
                <span className="truncate pr-4 font-medium">{d.label || 'Camera'}</span>
                {selectedCam === d.deviceId && <MdCheck className="text-emerald-400" size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Screen share toggle */}
      <button
        onClick={() => screenShare.toggle()}
        className={`flex items-center justify-center p-3 rounded-xl transition-all border outline-none ${
          isSharing 
            ? 'bg-[#5B5FC7]/20 border-[#5B5FC7]/25 text-[#8f93ec] hover:bg-[#5B5FC7]/35 shadow-lg shadow-[#5B5FC7]/10' 
            : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100'
        }`}
        title={isSharing ? 'Stop Screen Share' : 'Share Screen'}
      >
        <MdScreenShare size={20} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-800 mx-1"></div>

      {/* Sidebar toggle buttons */}
      <button
        onClick={() => onToggleSidebar('participants')}
        className={`p-3 rounded-xl border transition-all outline-none ${
          activeSidebar === 'participants' 
            ? 'bg-[#5B5FC7] border-[#5B5FC7] text-white shadow-lg shadow-[#5B5FC7]/20' 
            : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100'
        }`}
        title="View Participants"
      >
        <MdPeople size={20} />
      </button>

      <button
        onClick={() => onToggleSidebar('settings')}
        className={`p-3 rounded-xl border transition-all outline-none ${
          activeSidebar === 'settings' 
            ? 'bg-[#5B5FC7] border-[#5B5FC7] text-white shadow-lg shadow-[#5B5FC7]/20' 
            : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-100'
        }`}
        title="Settings & Devices"
      >
        <MdSettings size={20} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-800 mx-1"></div>

      {/* Hangup Call */}
      <button
        onClick={onLeave}
        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl shadow-lg shadow-red-600/35 transition-all outline-none"
        title="End Call"
      >
        <MdCallEnd size={20} />
      </button>
    </div>
  );
};

// Right Sidebar Slide Panel (contains settings / participants list)
const SidebarPanel = ({ activeTab, onClose }) => {
  const { useParticipants, useCallMembers, useMicrophoneState, useCameraState, useSpeakerState } = useCallStateHooks();
  const currentParticipants = useParticipants();
  const members = useCallMembers();
  
  const { camera, devices: camDevices, selectedDevice: selectedCam } = useCameraState();
  const { microphone, devices: micDevices, selectedDevice: selectedMic } = useMicrophoneState();
  const { speaker, devices: speakerDevices, selectedDevice: selectedSpeaker } = useSpeakerState();

  return (
    <aside className="w-[340px] border-l border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl flex flex-col h-full z-20 text-white animate-in slide-in-from-right duration-350 shadow-2xl">
      <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-850">
        <h3 className="font-black text-sm uppercase tracking-widest text-zinc-100 flex items-center gap-2">
          {activeTab === 'participants' ? <MdPeople size={20} className="text-[#5B5FC7]" /> : <MdSettings size={20} className="text-[#5B5FC7]" />}
          {activeTab === 'participants' ? 'Participants' : 'Device Settings'}
        </h3>
        <button 
          onClick={onClose}
          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-all outline-none"
        >
          <MdClose size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {activeTab === 'participants' ? (
          /* Participants List */
          <div className="flex flex-col gap-4">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">
              Currently in call ({currentParticipants.length})
            </p>
            {currentParticipants.map((p) => (
              <div key={p.sessionId} className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850">
                <Avatar
                  imageSrc={p.image}
                  name={p.name}
                  className="w-10 h-10 border border-[#5B5FC7] rounded-xl shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-zinc-100 truncate leading-none">{p.name}</p>
                    {p.isSpeaking && (
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium mt-1">
                    {p.isLocalParticipant ? 'Local Participant' : 'Guest'}
                  </p>
                </div>
                
                {/* Audio Status */}
                <div className="text-zinc-400">
                  {p.audio ? <MdMic size={18} className="text-emerald-400" /> : <MdMicOff size={18} className="text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Device Settings Selector Options */
          <div className="flex flex-col gap-5">
            <DeviceSelector 
              icon={<MdVideocam className="text-[#5B5FC7]" />} 
              label="Camera (Video Device)" 
              devices={camDevices} 
              selectedDevice={selectedCam} 
              onSelect={(id) => camera.selectDevice(id)} 
            />
            <DeviceSelector 
              icon={<MdMic className="text-[#5B5FC7]" />} 
              label="Microphone (Audio Input)" 
              devices={micDevices} 
              selectedDevice={selectedMic} 
              onSelect={(id) => microphone.selectDevice(id)} 
            />
            {speakerDevices && speakerDevices.length > 0 && (
              <DeviceSelector 
                icon={<MdVolumeUp className="text-[#5B5FC7]" />} 
                label="Speaker (Audio Output)" 
                devices={speakerDevices} 
                selectedDevice={selectedSpeaker} 
                onSelect={(id) => speaker.selectDevice(id)} 
              />
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

// CallUI Layout Wrapper
const CallUI = ({ onLeave }) => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const [activeSidebar, setActiveSidebar] = useState(null); // 'participants', 'settings' or null

  const handleToggleSidebar = (tab) => {
    setActiveSidebar(activeSidebar === tab ? null : tab);
  };

  return (
    <div className="flex-1 flex overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative">
      {/* Left Main call panel */}
      <div className="flex-1 flex flex-col justify-between relative h-full">
        {/* Call Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-[#8f93ec] text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5">
              <MdInfo size={14} />
              Session Room
            </div>
            <CallTimer />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 bg-zinc-900/60 px-3.5 py-1.5 rounded-xl border border-zinc-800">
              {participants.length} Active {participants.length === 1 ? 'Person' : 'People'}
            </span>
          </div>
        </div>

        {/* Video feed layout area */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center relative">
          <ParticipantsGrid participants={participants} />
        </div>

        {/* Call Control Footer */}
        <div className="w-full flex justify-center pb-8 pt-4">
          <CustomCallControls 
            onLeave={onLeave} 
            onToggleSidebar={handleToggleSidebar} 
            activeSidebar={activeSidebar} 
          />
        </div>
      </div>

      {/* Right Drawer Panel */}
      {activeSidebar && (
        <SidebarPanel 
          activeTab={activeSidebar} 
          onClose={() => setActiveSidebar(null)} 
        />
      )}
    </div>
  );
};

// VideoCall Content component orchestrating lobby and live states
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
      <div className="flex items-center justify-center h-full bg-zinc-950 text-white rounded-[2.5rem] border border-zinc-900">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-t-[#5B5FC7] border-zinc-800 rounded-full animate-spin mx-auto mb-5 shadow-2xl"></div>
          <p className="text-base text-zinc-400 font-bold tracking-tight">Connecting to meeting...</p>
        </div>
      </div>
    );
  }

  if (callingState === 'joined' || hasJoined) {
    return <CallUI onLeave={onLeave} />;
  }

  return <Lobby onJoin={handleJoin} />;
};

// Main Export Component
const VideoCall = ({ callId, onLeave }) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!client || !callId) return;

    const sanitizedCallId = callId.toString().replace(/[^a-zA-Z0-9_\-.]/g, '_');
    const c = client.call('default', sanitizedCallId);
    
    let active = true;

    const initCall = async () => {
      try {
        const userId = client.user.id;
        // Verify mentorship request status and add members on the backend
        await apiClient.get(`/stream/token/${userId}?requestId=${callId}`);
        
        if (!active) return;
        
        await c.getOrCreate();
        
        if (active) setCall(c);
      } catch (err) {
        console.error('Call initialization error:', err);
        if (active) {
          setError(err.response?.data?.message || 'You do not have permission to join this session or it could not be initialized.');
        }
      }
    };

    initCall();

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
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl p-4 md:p-8">
        <div className="bg-zinc-900 border border-red-500/20 p-8 rounded-[2rem] text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MdCallEnd size={30} />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Access Denied</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl p-4 md:p-8">
      {/* Stream Theme CSS styling override */}
      <style>{`
        .str-video {
          --str-video__primary-color: #5B5FC7;
          --str-video__background-color: #09090b;
          --str-video__border-radius-circle: 16px;
          --str-video__border-radius-normal: 16px;
          --str-video__text-color1: #ffffff;
          --str-video__text-color2: #a1a1aa;
          --str-video__surface-color: #18181b;
        }
        .str-video__participant-view {
          border-radius: 1.5rem !important;
          overflow: hidden !important;
        }
        /* Custom scrollbar style */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <div className="w-full max-w-7xl h-full max-h-[850px] flex flex-col">
        <div className="flex justify-between items-center mb-6 text-white px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5B5FC7] rounded-xl flex items-center justify-center shadow-lg shadow-[#5B5FC7]/20">
              <MdVideocam size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black leading-none tracking-tight">Mentorship Live</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Stream Live</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLeave}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600/10 hover:bg-red-650 text-red-500 hover:text-white font-bold rounded-xl transition-all border border-red-600/20"
          >
            <MdCallEnd size={18} />
            <span>End Call</span>
          </button>
        </div>
        
        <div className="flex-1 min-h-0 flex flex-col">
          <StreamCall call={call}>
            <StreamTheme className="dark h-full flex flex-col">
              <VideoCallContent onLeave={onLeave} callId={callId} />
            </StreamTheme>
          </StreamCall>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
