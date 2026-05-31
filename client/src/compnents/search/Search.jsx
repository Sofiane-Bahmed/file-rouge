import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    setSearchTerm(query || '');
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/mentors?search=${encodeURIComponent(searchTerm)}`);
      onSearch(searchTerm); // Call the onSearch function passed from the parent component
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full group"
    >
      <div className="relative shadow-sm group-hover:shadow-md transition-shadow duration-300 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer group"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 group-hover:text-[#007749] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name, company, domain or skills..."
          className="w-full py-4 pl-12 pr-4 text-gray-700 border border-gray-200 rounded-full outline-none bg-white focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;