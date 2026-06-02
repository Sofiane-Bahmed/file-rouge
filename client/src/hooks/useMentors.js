import { useState, useEffect, useMemo } from 'react';
import { getAvailableMentors } from '../api/aprenantService';

export const useMentors = (searchQuery, mentorsPerPage = 5) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAvailableMentors();
        setData(response.data);
      } catch (err) {
        console.error('An error occurred while fetching mentors:', err);
        setError(err.response ? 'Failed to load mentors. Please try again later.' : 'Network error: Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMentors = useMemo(() => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((mentor) => {
      const firstName = mentor.firstName?.toLowerCase() || '';
      const lastName = mentor.lastName?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const company = mentor.company?.toLowerCase() || '';
      const domains = mentor.domain?.map((d) => d.toLowerCase()) || [];
      const skills = mentor.skills?.map((s) => s.toLowerCase()) || [];

      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        fullName.includes(query) ||
        company.includes(query) ||
        domains.some((d) => d.includes(query)) ||
        skills.some((s) => s.includes(query))
      );
    });
  }, [data, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  const displayedMentors = filteredMentors.slice(
    (currentPage - 1) * mentorsPerPage,
    currentPage * mentorsPerPage
  );

  return {
    data,
    setData,
    displayedMentors,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    error,
  };
};
