import { useState, useEffect, useCallback } from 'react';
import { getAprenantProfile } from '../api/aprenantService';
import { getMentorshipRequests } from '../api/requestService';

export const useAprenantProfile = (aprenantId, localUser, isMentor) => {
  const [data, setData] = useState(null);
  const [mentorshipStatus, setMentorshipStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileResponse = await getAprenantProfile(aprenantId);
        setData(profileResponse.data.aprenant);

        if (isMentor && localUser?.userId) {
          const requestsResponse = await getMentorshipRequests(localUser.userId);
          const requests = requestsResponse.data?.requests || [];
          const currentAprenantRequest = requests.find(
            (req) => req.aprenant?._id.toString() === aprenantId.toString()
          );
          if (currentAprenantRequest) {
            setMentorshipStatus(currentAprenantRequest.status);
          }
        }
      } catch (err) {
        console.error('Error fetching aprenant profile data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aprenantId, isMentor, localUser?.userId, refetchIndex]);

  return { data, mentorshipStatus, loading, error, refetch };
};
