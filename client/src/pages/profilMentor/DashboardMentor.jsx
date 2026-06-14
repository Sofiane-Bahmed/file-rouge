import React, { useState } from 'react';
import { useParams, Link, Navigate } from "react-router-dom";
import { useMentorDashboardData } from '../../hooks/useMentorDashboardData';
import { acceptMentorship, rejectMentorship } from '../../api/requestService';

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import Table from "../../components/Table";
import { MdDashboard, MdPeople, MdStar, MdChat, MdPerson, MdCheck, MdClose, MdVisibility, MdVideocam } from 'react-icons/md';
import DashboardMentorSkeleton from './DashboardMentorSkeleton';

import ProfileSection from "../../components/profile/ProfileSection";
import Form from "../../components/Form";
import VideoCall from "../../components/video/VideoCall";

const DashboardMentor = () => {
  const { mentorId } = useParams();
  
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isOwner = localUser?.userId === mentorId;

  const { data, receivedRequests, loading, refetch } = useMentorDashboardData(mentorId);

  const [isEditing, setIsEditing] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [actionType, setActionType] = useState(""); // 'accept' or 'reject'
  const [activeCallId, setActiveCallId] = useState(null);

  if (!localUser || !isOwner) {
    return <Navigate to="/notFound" replace />;
  }

  const handleStartCall = (requestId) => {
    setActiveCallId(requestId);
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
      <div className="min-h-screen bg-[#F3F2EF]">
        <NavBar />
        <DashboardMentorSkeleton />
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', to: '/', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
    { label: 'Mentor Dashboard' }
  ];

  const pendingRequests = receivedRequests.filter(req => req.status === 'pending');
  const acceptedRequests = receivedRequests.filter(req => req.status === 'accepted');

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <NavBar />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="py-3 flex items-center space-x-2 text-gray-500 text-xs font-medium border-b border-gray-100">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-300">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-[#007749] flex items-center transition-colors">
                    {crumb.icon && <span className="mr-1 opacity-70">{crumb.icon}</span>}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#F0F9F1] rounded-lg border border-[#AAD4C1]/40">
                  <MdDashboard className="text-2xl text-[#007749]" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Mentor Dashboard
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Welcome back, <span className="font-bold text-gray-900">{data?.firstName}</span>! Here's what's happening with your mentees.
              </p>
            </div>
            <Link 
              to={`/profilMentor/${mentorId}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-md hover:bg-[#00663d] transition-all transform hover:scale-[1.02]"
            >
              <MdPerson className="text-xl" />
              View My Public Profile
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <MdPeople className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">{acceptedRequests.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                    <MdChat className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <MdStar className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{data?.rating || "5.0"}</p>
                  </div>
                </div>
              </div>
            </div>

            <ProfileSection title="Mentorship Requests" icon={<MdChat />}>
              <div className="space-y-4">
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm italic">No requests received yet.</p>
                  </div>
                ) : (
                  receivedRequests.map((req) => (
                    <div key={req._id} className="p-5 bg-white rounded-xl border border-gray-200 hover:border-[#AAD4C1] transition-all group shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <img 
                          src={req.aprenant?.image?.url || "https://via.placeholder.com/50"} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          alt="Learner"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">{req.aprenant?.firstName} {req.aprenant?.lastName}</h4>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Received on {new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          {req.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => {
                                  setSelectedRequestId(req._id);
                                  setActionType('reject');
                                  setIsResponseModalOpen(true);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                title="Reject"
                              >
                                <MdClose className="text-xl" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedRequestId(req._id);
                                  setActionType('accept');
                                  setIsResponseModalOpen(true);
                                }}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100"
                                title="Accept"
                              >
                                <MdCheck className="text-xl" />
                              </button>
                            </>
                          )}
                          <Link 
                            to={`/profilAprenant/${req.aprenant?._id}`}
                            className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 flex items-center gap-2"
                          >
                            <MdVisibility className="text-sm" />
                            View Profile
                          </Link>
                          {req.status === 'accepted' && (
                            <Link 
                              to="/messages"
                              state={{ contact: req.aprenant }}
                              className="px-4 py-2 bg-[#007749] text-white text-xs font-bold rounded-lg hover:bg-[#00663d] transition-colors shadow-sm flex items-center gap-2"
                            >
                              <MdChat className="text-sm" />
                              Message
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 italic border border-gray-100">
                        "{req.message}"
                      </div>
                      {req.responseMessage && (
                        <div className="mt-2 p-3 bg-blue-50/50 rounded-lg text-xs text-blue-700 border border-blue-100">
                          <span className="font-bold">Your Response:</span> "{req.responseMessage}"
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ProfileSection>

            {acceptedRequests.length > 0 && (
              <ProfileSection title="My Students" icon={<MdPeople />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {acceptedRequests.map((req) => (
                    <div key={req._id} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-[#AAD4C1] transition-all shadow-sm flex items-center gap-4">
                      <img 
                        src={req.aprenant?.image?.url || "https://via.placeholder.com/40"} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        alt="Learner"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{req.aprenant?.firstName} {req.aprenant?.lastName}</h4>
                        <div className="flex gap-2 mt-2">
                          <Link 
                            to={`/profilAprenant/${req.aprenant?._id}`}
                            className="text-[10px] font-bold text-[#007749] hover:underline"
                          >
                            View Profile
                          </Link>
                          <Link 
                            to="/messages"
                            state={{ contact: req.aprenant }}
                            className="text-[10px] font-bold text-[#007749] hover:underline"
                          >
                            Message
                          </Link>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleStartCall(req._id)}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md group"
                        title="Start Video Call"
                      >
                        <MdVideocam className="text-xl group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </ProfileSection>
            )}

            <ProfileSection title="Mentorship Plan" icon={<MdStar />}>
              <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
                <Table mentor={data} />
              </div>
            </ProfileSection>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Completion</h3>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                <div className="bg-[#007749] h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500">Your profile is looking great! High completion attracts more mentees.</p>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-50 pb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/messages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 group">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MdChat className="text-[#007749] text-xl" />
                  </div>
                  <span className="font-bold text-sm">My Messages</span>
                </Link>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 group text-left"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MdPerson className="text-[#007749] text-xl" />
                  </div>
                  <span className="font-bold text-sm">Edit My Profile</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Response Modal */}
      {isResponseModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
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
              className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AAD4C1] focus:border-transparent outline-none resize-none mb-6"
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
                className={`flex-1 py-3 text-white font-bold rounded-xl transition-colors shadow-lg ${actionType === 'accept' ? 'bg-[#007749] hover:bg-[#00663d]' : 'bg-red-500 hover:bg-red-600'
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

      {activeCallId && (
        <VideoCall 
          callId={activeCallId} 
          onLeave={() => setActiveCallId(null)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default DashboardMentor;
