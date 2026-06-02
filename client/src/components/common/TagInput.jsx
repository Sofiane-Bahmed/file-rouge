import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ label, tags, onAddTag, onRemoveTag, placeholder, className = "" }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all pl-12"
          placeholder={placeholder}
        />
        <MdAdd className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F0F9F1] text-[#007749] rounded-full text-sm font-bold border border-[#AAD4C1]/30 group hover:border-[#007749] transition-all"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-[#007749]/50 hover:text-red-500 transition-colors"
            >
              <MdClose size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
