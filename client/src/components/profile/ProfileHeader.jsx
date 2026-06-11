import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdPhotoCamera, MdLocationOn, MdBusinessCenter } from 'react-icons/md';

const ProfileHeader = ({ 
  user, 
  isOwner, 
  onEdit, 
  onImageClick, 
  isUploading, 
  fileInputRef, 
  onImageChange,
  breadcrumbs,
  roleLabel,
  experienceLabel,
  children 
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="py-3 flex items-center space-x-2 text-gray-500 text-xs font-medium border-b border-gray-100 mb-0">
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

        <div className="relative mt-6 rounded-t-xl overflow-hidden shadow-sm h-48 md:h-64 bg-gradient-to-r from-[#AAD4C1] to-[#007749]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          {isOwner && (
            <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white backdrop-blur-sm transition-all border border-white/30 flex items-center gap-2 text-sm font-medium">
              <MdPhotoCamera className="text-lg" />
              <span>Edit cover photo</span>
            </button>
          )}
        </div>

        <div className="relative pb-8 px-4 md:px-8">
          {/* Profile Image with Upload Overlay - Stacked on top */}
          <div className="relative -mt-16 md:-mt-20 mb-6 inline-block">
            <div className="relative group">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg relative">
                <img 
                  src={user?.image?.url || "https://via.placeholder.com/200"} 
                  alt="Profile"
                  className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                />
                
                {isOwner && (
                  <button 
                    onClick={onImageClick}
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    disabled={isUploading}
                  >
                    <MdPhotoCamera className="text-2xl mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-center px-2">Update Photo</span>
                  </button>
                )}

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#007749] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={onImageChange}
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>

          {/* Info & Actions - stacked under image */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>
                {isOwner && (
                  <button 
                    onClick={onEdit}
                    className="p-2 text-[#007749] bg-[#F0F9F1] hover:bg-[#AAD4C1]/30 rounded-full transition-all border border-[#AAD4C1]/40 shadow-sm"
                    title="Edit Profile"
                  >
                    <MdEdit className="text-xl md:text-2xl" />
                  </button>
                )}
              </div>

              <div className="text-gray-700 font-medium text-lg md:text-xl">
                {roleLabel || user?.domain}
                {user?.company && (
                  <>
                    <span className="text-gray-400 mx-1">at</span>
                    <span className="text-gray-900 font-bold">{user.company}</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                {user?.localisation && (
                  <span className="flex items-center gap-1">
                    <MdLocationOn className="text-[#007749] text-lg" />
                    {user.localisation}
                  </span>
                )}
                <span className="px-3 py-1 bg-[#F0F9F1] text-[#007749] rounded-lg font-bold text-xs border border-[#AAD4C1]/30">
                  {experienceLabel || user?.experience || "Active Member"}
                </span>
              </div>
            </div>

            {/* Action buttons section */}
            <div className="flex flex-wrap items-center gap-3 pt-4 md:pt-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
