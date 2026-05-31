import Table from "../../compnents/Table"
import React, { useEffect, useState, useRef } from 'react'
import { MdEdit, MdPhotoCamera } from 'react-icons/md';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import FormAprenant from "../../compnents/AprenantForm";
import ProgressComponent from "../../compnents/Progress";
import NavBar from "../../compnents/navbar/NavBar";
import Footer from "../../compnents/footer/Footer";

const ProfilAprenant = () => {
  let { aprenantId } = useParams()
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false)

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const response = await axios.put(`http://localhost:8082/aprenants/updateApprenantProfileImage/${aprenantId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const updatedAprenant = response?.data?.aprenant;
      setData(updatedAprenant);

      // Update local storage for NavBar consistency
      const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      if (localUser && localUser.userId === aprenantId) {
        localUser.avatarUrl = updatedAprenant?.image?.url;
        localStorage.setItem("user", JSON.stringify(localUser));
        window.location.reload();
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/aprenants/viewAprenantProfile/${aprenantId}`, {withCredentials: true});
        setData(response?.data.aprenant);
      } catch (error) {
        console.error('An error occurred while getting profile data:', error);
      }
    };
    fetchdata()
  }, [refetch, aprenantId]);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative bg-[#AAD4C1] pt-32 pb-20 px-4">
        <div className="max-w-screen-xl mx-auto relative">
          {/* Breadcrumbs */}
          <nav className="absolute top-[-80px] left-0 flex items-center space-x-2 text-white/80 text-sm font-medium">
            <Link to="/" className="hover:text-white flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{data?.firstName} {data?.lastName}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Profile Image with Upload Overlay */}
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-xl relative">
                <img 
                  src={data?.image?.url || "https://via.placeholder.com/200"} 
                  alt="Profile"
                  className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                />
                
                {/* Upload Overlay */}
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  disabled={isUploading}
                >
                  <MdPhotoCamera className="text-3xl mb-1" />
                  <span className="text-xs font-bold uppercase tracking-wider">Update Photo</span>
                </button>

                {/* Loading Spinner */}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <h1 className="text-4xl font-extrabold text-white">
                  {data?.firstName} {data?.lastName}
                </h1>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title="Edit Profile"
                >
                  <MdEdit className="text-xl" />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                  Learner
                </span>
                <span className="px-4 py-1.5 bg-[#007749] text-white rounded-full text-sm font-bold shadow-lg">
                  {data?.experience || "Active Learner"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
                About Me
              </h2>
              <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed text-lg">
                {data?.about || "No about information provided."}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
                Interests & Domains
              </h2>
              <div className="flex flex-wrap gap-3">
                {data?.domainInteret?.map((domain, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2 bg-[#F0F9F1] text-[#007749] border border-[#AAD4C1]/30 rounded-full text-sm font-bold hover:bg-[#AAD4C1]/20 transition-colors"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
                My Mentorship Sessions
              </h2>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 overflow-hidden">
                <Table aprenant={data} />
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Stats */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-3xl p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h3>
              
              <div className="space-y-6">
                <ProgressComponent />
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h4>
                <Link to="/mentors" className="w-full inline-flex items-center justify-center py-4 bg-[#007749] text-white font-bold rounded-2xl shadow-lg shadow-[#007749]/20 hover:bg-[#00663d] transition-all transform hover:scale-[1.02]">
                  Find a New Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <FormAprenant onCancel={() => setIsEditing(false)} data={data} refetch={() => setRefetch(!refetch)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProfilAprenant;