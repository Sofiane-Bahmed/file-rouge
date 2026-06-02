import React from 'react';

const ProfileSection = ({ title, children, icon }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="w-8 h-1 bg-[#AAD4C1] mr-3 rounded-full"></span>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      <div className="bg-white rounded-2xl p-2">
        {children}
      </div>
    </section>
  );
};

export default ProfileSection;
