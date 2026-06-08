import React, { useState, useRef } from 'react';
import { MdChat, MdPersonSearch } from 'react-icons/md';
import { useParams, Link } from "react-router-dom";
import { useMentorProfile } from '../../hooks/useMentorProfile';
import { updateMentorImage } from '../../api/mentorService';
import { createMentorshipRequest, acceptMentorship, rejectMentorship } from '../../api/requestService';

import Table from "../../components/Table";
import Form from "../../components/Form";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSection from "../../components/profile/ProfileSection";
import TagsSection from "../../components/profile/TagsSection";

const ProfilMentor = () => {
  const { mentorId } = useParams();
  const fileInputRef = useRef(null);

  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isAprenant = localUser?.userRole === "aprenant";
  const isOwnProfile = localUser?.userId === mentorId;

  const { data, requestStatus, setRequestStatus, receivedRequests, loading, refetch } = useMentorProfile(mentorId, localUser, isAprenant, isOwnProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [actionType, setActionType] = useState(""); // 'accept' or 'reject'

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('mentorId', mentorId);

    try {
      setIsUploading(true);
      await updateMentorImage(mentorId, formData);
      refetch();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!requestMessage.trim()) {
      alert("Please enter a message for your request.");
      return;
    }

    setIsSendingRequest(true);
    try {
      await createMentorshipRequest({
        aprenantId: localUser.userId,
        mentorId: mentorId,
        message: requestMessage
      });
      
      setRequestStatus('pending');
      setIsRequestModalOpen(false);
      alert("Mentorship request sent successfully!");
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      alert(error.response?.data?.message || "Failed to send mentorship request.");
    } finally {
      setIsSendingRequest(false);
    }
  };

  const handleAction = async () => {
    if (!responseMsg.trim()) {
      alert("Please enter a response message.");
      return;
    }

    try {
      const actionFn = actionType === 'accept' ? acceptMentorship : rejectMentorship;
      
      await actionFn({
        requestId: selectedRequestId,
        mentorId: mentorId,
        responseMessage: responseMsg
      });
      
      alert(`Request ${actionType}ed successfully!`);
      setIsResponseModalOpen(false);
      refetch();
      setResponseMsg("");
    } catch (error) {
      console.error(`Error ${actionType}ing request:`, error);
      alert("Action failed. Please try again.");
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007749]"></div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', to: '/', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
    { label: 'Find a Mentor', to: '/mentors' },
    { label: `${data?.firstName} ${data?.lastName}` }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <ProfileHeader 
        user={data}
        isOwner={isOwnProfile}
        onEdit={() => setIsEditing(true)}
        onImageClick={() => fileInputRef.current.click()}
        isUploading={isUploading}
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        breadcrumbs={breadcrumbs}
        roleLabel={data?.domain || "Mentor"}
        experienceLabel={data?.experience}
      >
        <div className="flex gap-4">
          {isAprenant && (
            <>
              <button 
                onClick={() => !requestStatus && setIsRequestModalOpen(true)}
                disabled={!!requestStatus}
                className={`px-8 py-3 font-bold rounded-xl shadow-xl transition-all transform ${
                  requestStatus === 'pending' ? 'bg-yellow-500 text-white cursor-default' :
                  requestStatus === 'accepted' ? 'bg-green-600 text-white cursor-default' :
                  requestStatus === 'rejected' ? 'bg-red-500 text-white cursor-default' :
                  'bg-white text-[#007749] hover:bg-gray-50 hover:-translate-y-1'
                }`}
              >
                {requestStatus === 'pending' ? 'Request Pending' :
                 requestStatus === 'accepted' ? 'Mentorship Accepted' :
                 requestStatus === 'rejected' ? 'Request Rejected' :
                 'Mentorship Request'}
              </button>
              
              {requestStatus === 'accepted' && (
                <Link 
                  to="/messages"
                  state={{ contact: data }}
                  className="px-8 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-xl hover:bg-[#00663d] transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <MdChat className="text-xl" />
                  Message
                </Link>
              )}
            </>
          )}
        </div>
      </ProfileHeader>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <ProfileSection title="About">
              <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed text-lg">
                {data?.about}
              </div>
            </ProfileSection>

            <ProfileSection title="Skills & Expertise">
              <TagsSection tags={data?.skills} />
            </ProfileSection>

            <ProfileSection title="Mentorship Services">
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 overflow-hidden">
                <Table mentor={data} />
              </div>
            </ProfileSection>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-3xl p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center text-yellow-400">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span className="font-bold text-gray-900">{data?.rating || "5.0"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-bold text-gray-900">{data?.localisation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Availability</span>
                  <span className="font-bold text-[#007749]">{data?.disponibility}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Response Time</span>
                  <span className="font-bold text-gray-900">{data?.responseTime}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-gray-900">{data?.price}$</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                {isAprenant && (
                  <button 
                    onClick={() => !requestStatus && setIsRequestModalOpen(true)}
                    disabled={!!requestStatus}
                    className={`w-full mt-6 py-4 font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] ${
                      requestStatus === 'pending' ? 'bg-yellow-500 text-white cursor-default' :
                      requestStatus === 'accepted' ? 'bg-green-600 text-white cursor-default' :
                      requestStatus === 'rejected' ? 'bg-red-500 text-white cursor-default' :
                      'bg-[#007749] text-white hover:bg-[#00663d] shadow-[#007749]/20'
                    }`}
                  >
                    {requestStatus === 'pending' ? 'Request Pending' :
                     requestStatus === 'accepted' ? 'Mentorship Accepted' :
                     requestStatus === 'rejected' ? 'Request Rejected' :
                     'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentorship Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Mentorship Request</h2>
            <p className="text-gray-600 mb-6">
              Introduce yourself to {data?.firstName} and explain why you're seeking mentorship.
            </p>
            
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Tell the mentor about your goals and what you hope to achieve..."
              className="w-full h-40 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#AAD4C1] focus:border-transparent outline-none resize-none mb-6"
            />
            
            <div className="flex gap-4">
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                disabled={isSendingRequest}
                className="flex-1 py-3 bg-[#007749] text-white font-bold rounded-xl hover:bg-[#00663d] transition-colors shadow-lg shadow-[#007749]/20 flex items-center justify-center"
              >
                {isSendingRequest ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isOwnProfile && receivedRequests.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-12 h-1.5 bg-[#007749] mr-4 rounded-full"></span>
            Mentorship Requests Received
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {receivedRequests.map((req) => (
              <div key={req._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={req.aprenant?.image?.url || "https://via.placeholder.com/100"} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#AAD4C1]"
                    alt="Learner"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{req.aprenant?.firstName} {req.aprenant?.lastName}</h4>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">"{req.message}"</p>
                
                <div className="flex gap-3 mt-auto">
                  <Link 
                    to={`/profilAprenant/${req.aprenant?._id}`}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-white text-gray-700 text-sm font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <MdPersonSearch className="text-lg" />
                    Profile
                  </Link>
                  {req.status === 'accepted' && (
                    <Link 
                      to="/messages"
                      state={{ contact: req.aprenant }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#007749] text-white text-sm font-bold rounded-xl hover:bg-[#00663d] transition-colors shadow-sm"
                    >
                      <MdChat className="text-lg" />
                      Message
                    </Link>
                  )}
                </div>

                {req.status === 'pending' && (
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => {
                        setSelectedRequestId(req._id);
                        setActionType('accept');
                        setIsResponseModalOpen(true);
                      }}
                      className="flex-1 py-2 bg-[#007749] text-white text-sm font-bold rounded-xl hover:bg-[#00663d] transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedRequestId(req._id);
                        setActionType('reject');
                        setIsResponseModalOpen(true);
                      }}
                      className="flex-1 py-2 bg-white text-red-500 border border-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {req.responseMessage && (
                  <div className="mt-4 pt-4 border-t border-gray-50 text-sm">
                    <span className="font-bold text-gray-900 block mb-1">Your Response:</span>
                    <p className="text-gray-500 italic">"{req.responseMessage}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Modal */}
      {isResponseModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
              {actionType} Mentorship Request
            </h2>
            <p className="text-gray-600 mb-6">
              Write a brief message to the learner explaining your decision.
            </p>
            
            <textarea
              value={responseMsg}
              onChange={(e) => setResponseMsg(e.target.value)}
              placeholder="Your message to the learner..."
              className="w-full h-40 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#AAD4C1] focus:border-transparent outline-none resize-none mb-6"
            />
            
            <div className="flex gap-4">
              <button
                onClick={() => setIsResponseModalOpen(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className={`flex-1 py-3 text-white font-bold rounded-xl transition-colors shadow-lg ${
                  actionType === 'accept' ? 'bg-[#007749] hover:bg-[#00663d] shadow-[#007749]/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                }`}
              >
                Confirm {actionType}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <Form onCancel={() => setIsEditing(false)} data={data} refetch={refetch} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilMentor;
