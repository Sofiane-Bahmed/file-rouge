import React, { useState, useRef } from 'react';
import { MdChat, MdPersonSearch, MdInfo, MdStar, MdWork, MdDateRange, MdAccessTime, MdLocationOn } from 'react-icons/md';
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

import ProfileSkeleton from "../../components/profile/ProfileSkeleton";

const ProfilMentor = () => {
  const { mentorId } = useParams();
  const fileInputRef = useRef(null);

  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isAprenant = localUser?.userRole === "aprenant";
  const isOwnProfile = localUser?.userId === mentorId;

  const { data, requestStatus, setRequestStatus, loading, refetch } = useMentorProfile(mentorId, localUser, isAprenant, isOwnProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [isSendingRequest, setIsSendingRequest] = useState(false);

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

  if (loading && !data) {
    return <ProfileSkeleton />;
  }

  const breadcrumbs = [
    { label: 'Home', to: '/', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
    { label: 'Mentors', to: '/mentors' },
    { label: `${data?.firstName} ${data?.lastName}` }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
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
        <div className="flex gap-3 w-full md:w-auto">
          {isAprenant && (
            <>
              <button
                onClick={() => !requestStatus && setIsRequestModalOpen(true)}
                disabled={!!requestStatus}
                className={`flex-1 md:flex-none px-6 py-2 font-bold rounded-full transition-all border-2 ${requestStatus === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-600 cursor-default' :
                  requestStatus === 'accepted' ? 'bg-green-50 border-green-200 text-green-600 cursor-default' :
                    requestStatus === 'rejected' ? 'bg-red-50 border-red-200 text-red-600 cursor-default' :
                      'bg-[#007749] border-[#007749] text-white hover:bg-[#00663d]'
                  }`}
              >
                {requestStatus === 'pending' ? 'Pending' :
                  requestStatus === 'accepted' ? 'Enrolled' :
                    requestStatus === 'rejected' ? 'Rejected' :
                      'Enroll Now'}
              </button>

              {requestStatus === 'accepted' && (
                <Link
                  to="/messages"
                  state={{ contact: data }}
                  className="px-6 py-2 bg-white text-gray-700 border-2 border-gray-300 font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <MdChat className="text-xl" />
                  Message
                </Link>
              )}
            </>
          )}
        </div>
      </ProfileHeader>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            <ProfileSection title="About" icon={<MdInfo />}>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {data?.about}
              </div>
            </ProfileSection>

            <ProfileSection title="Skills & Expertise" icon={<MdWork />}>
              <TagsSection tags={data?.skills} />
            </ProfileSection>

            <ProfileSection title="Mentorship Services" icon={<MdStar />}>
              <Table mentor={data} />
            </ProfileSection>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-3">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MdStar className="text-[#007749]" />
                    <span>Rating</span>
                  </div>
                  <span className="font-bold text-gray-900">{data?.rating || "5.0"}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MdLocationOn className="text-[#007749]" />
                    <span>Location</span>
                  </div>
                  <span className="font-bold text-gray-900">{data?.localisation}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MdDateRange className="text-[#007749]" />
                    <span>Availability</span>
                  </div>
                  <span className="font-bold text-[#007749]">{data?.disponibility}</span>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MdAccessTime className="text-[#007749]" />
                    <span>Response Time</span>
                  </div>
                  <span className="font-bold text-gray-900">{data?.responseTime}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">{data?.price}$</span>
                  <span className="text-gray-500 ml-1">/ month</span>
                </div>
                {isAprenant && !requestStatus && (
                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="w-full py-3 bg-[#007749] text-white font-bold rounded-xl hover:bg-[#00663d] transition-all shadow-md hover:shadow-lg"
                  >
                    Enroll with {data?.firstName}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Verification</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <MdStar className="text-2xl" />
                </div>
                <div>
                  <p className="font-bold">Verified Professional</p>
                  <p className="text-xs text-gray-400">Background checked and verified.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mentorship Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Mentorship Request</h2>
            <p className="text-gray-600 mb-6">
              Introduce yourself to {data?.firstName} and explain why you're seeking mentorship.
            </p>

            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Tell the mentor about your goals..."
              className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AAD4C1] focus:border-transparent outline-none resize-none mb-6"
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
                className="flex-1 py-3 bg-[#007749] text-white font-bold rounded-xl hover:bg-[#00663d] transition-colors flex items-center justify-center"
              >
                {isSendingRequest ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Send Request"}
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
