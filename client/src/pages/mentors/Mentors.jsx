import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../../compnents/navbar/NavBar';
import Footer from '../../compnents/footer/Footer';
import Search from '../../compnents/search/Search';
import FiltreButtons from '../../compnents/filtreButtons';
import Pagination from '../../compnents/Pagination';
import MentorCard from '../../compnents/mentorCard/MentorCard';
import MentorSkeleton from '../../compnents/mentorCard/MentorSkeleton';


const Mentors = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
 

  const mentorsPerPage = 5;


  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8082/aprenants/getAvailableMentors', {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching mentors:', error);
        if (!error.response) {
          setError('Network error: Please check your internet connection or if the server is running.');
        } else {
          setError('Failed to load mentors. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {

    if (searchQuery) {
      const filtered = filterMentors(data);
      setFilteredMentors(filtered);
      setCurrentPage(1); // Reset the current page when search query changes
    } else {
      setFilteredMentors([]);
    }
  }, [searchQuery, data]);



  const filterMentors = (mentors) => {

    const query = searchQuery.toLowerCase();

    if (mentors && mentors.length > 0) {
      return mentors.filter((mentor) => {
        const firstName = mentor.firstName ? mentor.firstName.toLowerCase() : '';
        const lastName = mentor.lastName ? mentor.lastName.toLowerCase() : '';
        const fullName = `${firstName} ${lastName}`.trim();
        const company = mentor.company ? mentor.company.toLowerCase() : '';
        const domains = mentor.domain ? mentor.domain.map((domain) => domain.toLowerCase()) : [];
        const skills = mentor.skills ? mentor.skills.map((skill) => skill.toLowerCase()) : [];

        return (
          firstName.includes(query) ||
          lastName.includes(query) ||
          fullName.includes(query) ||
          company.includes(query) ||
          domains.some((domain) => domain.includes(query)) ||
          skills.some((skill) => skill.includes(query))
        );
      });
    } else {
      return [];
    }
  };

 

  
  const startIndex = (currentPage - 1) * mentorsPerPage;
  const endIndex = startIndex + mentorsPerPage;
  const displayedMentors = searchQuery ? filteredMentors.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-8">
          {[1, 2, 3].map((n) => (
            <MentorSkeleton key={n} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#007749] text-white rounded-lg font-medium hover:bg-[#00663d] transition-colors"
          >
            Retry Connection
          </button>
        </div>
      );
    }

    if (displayedMentors.length === 0) {
      return (
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No mentors found</h2>
          <p className="text-gray-600">We couldn't find any mentors matching your current search or filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); window.location.href='/mentors' }}
            className="mt-4 text-[#007749] font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-8">
          {displayedMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
        
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((searchQuery ? filteredMentors.length : data.length) / mentorsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  };



  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <div className="max-w-screen-lg mx-auto px-4 pt-12 pb-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Find Your Next <span className="text-[#007749]">Mentor</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our community of expert professionals and find the perfect match to guide your career growth.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      <FiltreButtons setData={setData} />

      {/* Conditional rendering based on isLoading */}
      <div className="max-w-screen-lg mx-auto px-4 pb-20">
        {renderContent()}
      </div>
      
      <Footer />
    </div>
  );
};

export default Mentors;