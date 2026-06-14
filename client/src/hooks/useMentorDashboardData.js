import { useState, useEffect, useCallback } from 'react';
import { getMentorProfile } from '../api/mentorService';
import { getMentorshipRequests } from '../api/requestService';

export const useMentorDashboardData = (mentorId) => {
  const [data, setData] = useState(null);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [profileRes, requestsRes] = await Promise.all([
        getMentorProfile(mentorId),
        getMentorshipRequests(mentorId)
      ]);
      
      setData(profileRes.data);
      setReceivedRequests(requestsRes.data?.requests || []);
    } catch (err) {
      console.error('Error fetching mentor dashboard data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [mentorId]);

  useEffect(() => {
    if (mentorId) {
      fetchData();
    }
  }, [mentorId, fetchData]);

  return { data, receivedRequests, loading, error, refetch: fetchData };
};
