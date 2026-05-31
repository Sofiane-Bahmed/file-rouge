import Table from "../../compnents/Table"
import React, { useEffect, useState, useRef } from 'react'
import { MdEdit, MdPhotoCamera } from 'react-icons/md';
import Form from "../../compnents/Form";
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import NavBar from "../../compnents/navbar/NavBar";
import Footer from "../../compnents/footer/Footer";

const ProfilMentor = () => {
  let { mentorId } = useParams()
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
      const response = await axios.put(`http://localhost:8082/mentors/modifierProfileImage/${mentorId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const updatedMentor = response?.data?.mentor;
      setData(updatedMentor);

      // Update local storage for NavBar consistency
      const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      if (localUser && localUser.userId === mentorId) {
        localUser.avatarUrl = updatedMentor?.image?.url;
        localStorage.setItem("user", JSON.stringify(localUser));
        // Force a window reload or use a context to update NavBar properly if needed
        // For now, window.location.reload() is a quick way to ensure all components sync
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
        const response = await axios.get(`http://localhost:8082/mentors/viewProfile/${mentorId}`);
        setData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching profile:', error);
      }
    };
    fetchdata()
  }, [refetch, mentorId]);

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
            <Link to="/mentors" className="hover:text-white">Find a Mentor</Link>
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
                  {data?.domain}
                </span>
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                  {data?.company}
                </span>
                <span className="px-4 py-1.5 bg-[#007749] text-white rounded-full text-sm font-bold shadow-lg">
                  {data?.experience}
                </span>
              </div>
            </div>
            
            <div className="hidden lg:block mb-2">
              <button className="px-8 py-3 bg-white text-[#007749] font-bold rounded-xl shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                Mentorship Request
              </button>
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
                About
              </h2>
              <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed text-lg">
                {data?.about}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {data?.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2 bg-[#F0F9F1] text-[#007749] border border-[#AAD4C1]/30 rounded-full text-sm font-bold hover:bg-[#AAD4C1]/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
                Mentorship Services
              </h2>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 overflow-hidden">
                <Table mentor={data} />
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Stats */}
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
                <button className="w-full mt-6 py-4 bg-[#007749] text-white font-bold rounded-2xl shadow-lg shadow-[#007749]/20 hover:bg-[#00663d] transition-all transform hover:scale-[1.02]">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <Form onCancel={() => setIsEditing(false)} data={data} refetch={() => setRefetch(!refetch)} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProfilMentor;