import React from 'react';

const FormInput = ({ label, value, onChange, placeholder, type = "text", required = false, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all"
        required={required}
      />
    </div>
  );
};

export default FormInput;
