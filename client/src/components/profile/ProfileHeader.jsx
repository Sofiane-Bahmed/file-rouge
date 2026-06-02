import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdPhotoCamera } from 'react-icons/md';

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
    <div className="relative bg-[#AAD4C1] pt-32 pb-20 px-4">
      <div className="max-w-screen-xl mx-auto relative">
        {/* Breadcrumbs */}
        <nav className="absolute top-[-80px] left-0 flex items-center space-x-2 text-white/80 text-sm font-medium">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-white flex items-center">
                  {crumb.icon && <span className="mr-1">{crumb.icon}</span>}
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
          {/* Profile Image with Upload Overlay */}
          <div className="relative group">
            <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-xl relative">
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
                  <MdPhotoCamera className="text-3xl mb-1" />
                  <span className="text-xs font-bold uppercase tracking-wider">Update Photo</span>
                </button>
              )}

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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

          <div className="flex-1 text-center md:text-left mb-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h1 className="text-4xl font-extrabold text-white">
                {user?.firstName} {user?.lastName}
              </h1>
              {isOwner && (
                <button 
                  onClick={onEdit}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title="Edit Profile"
                >
                  <MdEdit className="text-xl" />
                </button>
              )}
              {children}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                {roleLabel}
              </span>
              {user?.domain && typeof user.domain === 'string' && (
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                  {user.domain}
                </span>
              )}
              {user?.company && (
                <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                  {user.company}
                </span>
              )}
              <span className="px-4 py-1.5 bg-[#007749] text-white rounded-full text-sm font-bold shadow-lg">
                {experienceLabel || user?.experience || "Active Member"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
