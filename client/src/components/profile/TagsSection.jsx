import React from 'react';

const TagsSection = ({ tags, emptyMessage = "No information provided." }) => {
  if (!tags || tags.length === 0) {
    return <p className="text-gray-500 italic">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="px-4 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#AAD4C1] hover:bg-[#F0F9F1] transition-all cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsSection;
