import React from 'react';

const FormTextarea = ({ label, value, onChange, placeholder, rows = 4, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all resize-none"
      />
    </div>
  );
};

export default FormTextarea;
