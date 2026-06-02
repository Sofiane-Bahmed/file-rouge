import { useState, useEffect } from 'react';
import { getAprenantProfile } from '../api/aprenantService';
import { getMentorshipRequestsAprenant } from '../api/requestService';

export const useDashboardData = (aprenantId) => {
  const [data, setData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    if (aprenantId) {
      fetchData();
    }
  }, [aprenantId]);

  return { data, myRequests, loading, error };
};
