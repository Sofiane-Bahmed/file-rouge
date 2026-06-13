import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from "react-router-dom";
import { useDashboardData } from '../../hooks/useDashboardData';
import { updateAprenantImage } from '../../api/aprenantService';

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import ProgressComponent from "../../components/Progress";
import Table from "../../components/Table";
import { MdDashboard, MdAssignment, MdTimeline, MdChat, MdPersonSearch, MdSearch } from 'react-icons/md';
import DashboardSkeleton from './DashboardSkeleton';

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSection from "../../components/profile/ProfileSection";
import FormAprenant from "../../components/AprenantForm";

const DashboardAprenant = () => {
  const { aprenantId } = useParams();
  const fileInputRef = useRef(null);
  
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isOwner = localUser?.userId === aprenantId;

  const { data, myRequests, loading, refetch } = useDashboardData(aprenantId);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  if (!localUser || !isOwner) {
    return <Navigate to="/notFound" replace />;
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('aprenantId', aprenantId);

    try {
      setIsUploading(true);
      await updateAprenantImage(aprenantId, formData);
      if (refetch) refetch();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#F3F2EF]">
        <NavBar />
        <DashboardSkeleton />
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', to: '/', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
    { label: 'Dashboard' }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <NavBar />
      
      {/* Page Header - Matching Profile style spacing/borders */}
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
                  Learning Dashboard
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Welcome back, <span className="font-bold text-gray-900">{data?.firstName}</span>! Ready to continue your journey?
              </p>
            </div>
            <Link 
              to={`/profilAprenant/${aprenantId}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-md hover:bg-[#00663d] transition-all transform hover:scale-[1.02]"
            >
              <MdPersonSearch className="text-xl" />
              View My Public Profile
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            <ProfileSection title="Curriculum Progress" icon={<MdTimeline />}>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <ProgressComponent />
              </div>
            </ProfileSection>

            <ProfileSection title="Active Mentorships" icon={<MdAssignment />}>
              <div className="overflow-hidden">
                <Table aprenant={data} />
              </div>
            </ProfileSection>
          </div>

          {/* Sidebar - Matching Profile sidebar style */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-3 flex items-center gap-2">
                <MdChat className="text-[#007749]" />
                Mentorship Requests
              </h3>
              
              <div className="space-y-4">
                {myRequests.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm italic">No requests sent yet.</p>
                  </div>
                ) : (
                  myRequests.map((req) => (
                    <div key={req._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#AAD4C1] transition-all group">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={req.mentor?.image?.url || "https://via.placeholder.com/40"} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          alt="Mentor"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-gray-900 truncate">{req.mentor?.firstName} {req.mentor?.lastName}</p>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                      
                      {req.responseMessage && (
                        <div className="mb-4 p-3 bg-white rounded-lg text-xs text-gray-600 border border-gray-50 italic line-clamp-2">
                          "{req.responseMessage}"
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Link 
                          to={`/profilMentor/${req.mentor?._id}`}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-white text-gray-700 text-[10px] font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <MdPersonSearch className="text-sm" />
                          Profile
                        </Link>
                        {req.status === 'accepted' && (
                          <Link 
                            to="/messages"
                            state={{ contact: req.mentor }}
                            className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#007749] text-white text-[10px] font-bold rounded-lg hover:bg-[#00663d] transition-colors shadow-sm"
                          >
                            <MdChat className="text-sm" />
                            Message
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link 
                  to="/mentors"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-md hover:bg-[#00663d] transition-all"
                >
                  <MdSearch className="text-xl" />
                  Find More Mentors
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

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-50 pb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/messages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 group">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MdChat className="text-[#007749] text-xl" />
                  </div>
                  <span className="font-bold text-sm">My Messages</span>
                </Link>
                <Link to="/mentors" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 group">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MdSearch className="text-[#007749] text-xl" />
                  </div>
                  <span className="font-bold text-sm">Browse Mentors</span>
                </Link>
              </div>
            </div>
          </aside>
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
  );
};

export default DashboardAprenant;
