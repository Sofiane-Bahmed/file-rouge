
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../../compnents/navbar/NavBar';
import Footer from '../../compnents/footer/Footer';
import Search from '../../compnents/search/Search';
import FiltreButtons from '../../compnents/filtreButtons';
import Pagination from '../../compnents/Pagination';
import MentorCard from '../../compnents/mentorCard/MentorCard';
import Loader from '../../compnents/loader/Loader';


const Mentors = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
 

  const mentorsPerPage = 5;


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/aprenants/getAvailableMentors', {
          withCredentials: true,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching mentors:', error);
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
        {isLoading ? (
          <Loader /> // Show the Loader component while data is being fetched
        ) : (
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
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Mentors;