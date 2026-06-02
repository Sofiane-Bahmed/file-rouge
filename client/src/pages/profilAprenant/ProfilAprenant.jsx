import React, { useState, useRef } from 'react';
import { MdChat } from 'react-icons/md';
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
      await updateAprenantImage(formData);
      refetch();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
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
    { label: `${data?.firstName} ${data?.lastName}` }
  ];

  return (
    <div className="min-h-screen bg-white">
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
            className="px-6 py-2 bg-[#007749] text-white font-bold rounded-xl shadow-xl hover:bg-[#00663d] transition-all transform hover:-translate-y-1 flex items-center gap-2 text-sm"
          >
            <MdChat className="text-lg" />
            Message Learner
          </Link>
        )}
      </ProfileHeader>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <ProfileSection title="About Me">
              <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed text-lg">
                {data?.about || "No about information provided."}
              </div>
            </ProfileSection>

            <ProfileSection title="Interests & Domains">
              <TagsSection tags={data?.domainInteret} />
            </ProfileSection>

            {isOwner && (
              <ProfileSection title="My Mentorship Sessions">
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 overflow-hidden">
                  <Table aprenant={data} />
                </div>
              </ProfileSection>
            )}
          </div>

          {isOwner && (
            <div className="space-y-8">
              <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-3xl p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Actions</h4>
                  <div className="space-y-4">
                    <Link to={`/dashboardAprenant/${aprenantId}`} className="w-full inline-flex items-center justify-center py-4 bg-[#007749] text-white font-bold rounded-2xl shadow-lg shadow-[#007749]/20 hover:bg-[#00663d] transition-all transform hover:scale-[1.02]">
                      Go to Dashboard
                    </Link>
                    <Link to="/mentors" className="w-full inline-flex items-center justify-center py-4 bg-white text-[#007749] border-2 border-[#007749] font-bold rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-[1.02]">
                      Find a New Mentor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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