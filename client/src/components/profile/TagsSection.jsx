import React from 'react';

const TagsSection = ({ tags, emptyMessage = "No information provided." }) => {
  if (!tags || tags.length === 0) {
    return <p className="text-gray-500 italic">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="px-5 py-2 bg-[#F0F9F1] text-[#007749] border border-[#AAD4C1]/30 rounded-full text-sm font-bold hover:bg-[#AAD4C1]/20 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsSection;
