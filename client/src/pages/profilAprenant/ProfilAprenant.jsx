import React, { useState, useRef } from 'react';
import { MdChat, MdInfo, MdWork, MdDashboard, MdSearch } from 'react-icons/md';
import { useParams, Link } from "react-router-dom";
import { useAprenantProfile } from '../../hooks/useAprenantProfile';
import { updateAprenantImage } from '../../api/aprenantService';

import Table from "../../components/Table";
import FormAprenant from "../../components/AprenantForm";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSection from "../../components/profile/ProfileSection";
import TagsSection from "../../components/profile/TagsSection";

import ProfileSkeleton from "../../components/profile/ProfileSkeleton";

const ProfilAprenant = () => {
  const { aprenantId } = useParams();
  const fileInputRef = useRef(null);

  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isMentor = localUser?.userRole === "mentor";
  const isOwner = localUser?.userId === aprenantId;

  const { data, mentorshipStatus, loading, refetch } = useAprenantProfile(aprenantId, localUser, isMentor);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('aprenantId', aprenantId);

    try {
      setIsUploading(true);
      await updateAprenantImage(aprenantId, formData);
      refetch();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading && !data) {
    return <ProfileSkeleton />;
  }

  const breadcrumbs = [
    { label: 'Home', to: '/', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
    { label: `${data?.firstName} ${data?.lastName}` }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <NavBar />
      
      <ProfileHeader 
        user={data}
        isOwner={isOwner}
        onEdit={() => setIsEditing(true)}
        onImageClick={() => fileInputRef.current.click()}
        isUploading={isUploading}
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        breadcrumbs={breadcrumbs}
        roleLabel="Learner"
        experienceLabel={data?.experience || "Active Learner"}
      >
        {isMentor && mentorshipStatus === 'accepted' && (
          <Link 
            to="/messages"
            state={{ contact: data }}
            className="px-6 py-2 bg-[#007749] text-white font-bold rounded-full shadow-md hover:bg-[#00663d] transition-all flex items-center gap-2 text-sm"
          >
            <MdChat className="text-lg" />
            Message Learner
          </Link>
        )}
      </ProfileHeader>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            <ProfileSection title="About Me" icon={<MdInfo />}>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {data?.about || "No about information provided."}
              </div>
            </ProfileSection>

            <ProfileSection title="Interests & Domains" icon={<MdWork />}>
              <TagsSection tags={data?.domainInteret} />
            </ProfileSection>

            {isOwner && (
              <ProfileSection title="My Mentorship Sessions" icon={<MdDashboard />}>
                <div className="overflow-hidden">
                  <Table aprenant={data} />
                </div>
              </ProfileSection>
            )}
          </div>

          {/* Sidebar */}
          {isOwner && (
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    to={`/dashboardAprenant/${aprenantId}`} 
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-md hover:bg-[#00663d] transition-all"
                  >
                    <MdDashboard className="text-xl" />
                    Go to Dashboard
                  </Link>
                  <Link 
                    to="/mentors" 
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#007749] border-2 border-[#007749] font-bold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <MdSearch className="text-xl" />
                    Find a Mentor
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Strength</h3>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                  <div className="bg-[#007749] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500">Your profile is almost complete! Adding more details helps mentors find you.</p>
              </div>
            </aside>
          )}
        </div>
      </main>

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <FormAprenant onCancel={() => setIsEditing(false)} data={data} refetch={refetch} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProfilAprenant;