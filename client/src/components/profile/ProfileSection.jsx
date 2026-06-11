import React from 'react';

const ProfileSection = ({ title, children, icon, action }) => {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          {icon && <span className="mr-3 text-[#007749] text-2xl">{icon}</span>}
          {title}
        </h2>
        {action && (
          <div>{action}</div>
        )}
      </div>
      <div className="px-6 py-6">
        {children}
      </div>
    </section>
  );
};

export default ProfileSection;
