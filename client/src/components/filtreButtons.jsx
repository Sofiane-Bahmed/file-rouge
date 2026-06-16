import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../api/apiClient';

const FilterDropdown = ({ title, options, selectedItems, onToggle, isOpen, onOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        onOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => onOpen(isOpen ? null : title)}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 ${
          selectedItems.length > 0
            ? "bg-[#007749] text-white border-[#007749] shadow-md"
            : "bg-white text-gray-700 border-gray-200 hover:border-[#007749] hover:text-[#007749]"
        }`}
      >
        <span>{title}</span>
        {selectedItems.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-[10px] bg-white text-[#007749] rounded-full font-bold">
            {selectedItems.length}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-gray-50 mb-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
          </div>
          <ul className="max-h-60 overflow-y-auto px-2">
            {options.map((option) => (
              <li key={option}>
                <label className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(option)}
                    onChange={() => onToggle(option)}
                    className="w-4 h-4 text-[#007749] border-gray-300 rounded focus:ring-[#007749]"
                  />
                  <span className={`text-sm transition-colors ${selectedItems.includes(option) ? "text-[#007749] font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {option}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FiltreButtons = ({ setData }) => {
  const skillsOptions = ["React", "Node.js", "JavaScript", "Python", "SQL", "Product Management", "Machine Learning", "Deep Learning", "Prototyping"];
  const domainOptions = ["Full Stack Developer", "UX/UI Designer", "Product Manager", "Mobile App Developer", "Digital Marketing", "Data Scientist", "Graphic Designer", "Cybersecurity"];
  const priceOptions = ["80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200", "210", "220", "230"];

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [domainFilter, setDomainFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  useEffect(() => {
    const filterMentors = async () => {
      try {
        const response = await apiClient.get(`/aprenants/filtreMentors?skills=${skillsFilter}&domain=${domainFilter}&price=${priceFilter}`);
        setData(response.data.mentors);
      } catch (error) {
        console.error("Error filtering mentors:", error);
      }
    };

    filterMentors();
  }, [skillsFilter, domainFilter, priceFilter, setData]);

  const toggleItem = (item, filter, setFilter) => {
    setFilter(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSkillsFilter([]);
    setDomainFilter([]);
    setPriceFilter([]);
  };

  const hasActiveFilters = skillsFilter.length > 0 || domainFilter.length > 0 || priceFilter.length > 0;

  return (
    <div className="w-full mb-12">
      <div className="max-w-screen-lg mx-auto px-4 flex flex-wrap items-center justify-center gap-4">
        <FilterDropdown
          title="Skills"
          options={skillsOptions}
          selectedItems={skillsFilter}
          onToggle={(item) => toggleItem(item, skillsFilter, setSkillsFilter)}
          isOpen={activeDropdown === "Skills"}
          onOpen={setActiveDropdown}
        />
        
        <FilterDropdown
          title="Domain"
          options={domainOptions}
          selectedItems={domainFilter}
          onToggle={(item) => toggleItem(item, domainFilter, setDomainFilter)}
          isOpen={activeDropdown === "Domain"}
          onOpen={setActiveDropdown}
        />

        <FilterDropdown
          title="Price"
          options={priceOptions}
          selectedItems={priceFilter}
          onToggle={(item) => toggleItem(item, priceFilter, setPriceFilter)}
          isOpen={activeDropdown === "Price"}
          onOpen={setActiveDropdown}
        />

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 px-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FiltreButtons;