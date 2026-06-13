import { useState, useEffect, useCallback } from 'react';
import { getAprenantProfile } from '../api/aprenantService';
import { getMentorshipRequestsAprenant } from '../api/requestService';

export const useDashboardData = (aprenantId) => {
  const [data, setData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [profileRes, requestsRes] = await Promise.all([
        getAprenantProfile(aprenantId),
        getMentorshipRequestsAprenant(aprenantId)
      ]);
      
      setData(profileRes.data.aprenant);
      setMyRequests(requestsRes.data?.requests || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [aprenantId]);

  useEffect(() => {
    if (aprenantId) {
      fetchData();
    }
  }, [aprenantId, fetchData]);

  return { data, myRequests, loading, error, refetch: fetchData };
};

