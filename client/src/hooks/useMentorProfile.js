import { useState, useEffect, useCallback } from 'react';
import { getMentorProfile } from '../api/mentorService';
import { getMentorshipRequestsAprenant, getMentorshipRequests } from '../api/requestService';

export const useMentorProfile = (mentorId, localUser, isAprenant, isOwnProfile) => {
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
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
        const profileResponse = await getMentorProfile(mentorId);
        setData(profileResponse.data);

        if (isAprenant && localUser?.userId) {
          const requestsResponse = await getMentorshipRequestsAprenant(localUser.userId);
          const requests = requestsResponse.data?.requests || [];
          const currentMentorRequest = requests.find((req) => req.mentor?._id === mentorId);
          if (currentMentorRequest) {
            setRequestStatus(currentMentorRequest.status);
          }
        }
      } catch (err) {
        console.error('Error fetching mentor profile data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mentorId, isAprenant, localUser?.userId, isOwnProfile, refetchIndex]);

  return { data, requestStatus, setRequestStatus, loading, error, refetch };
};
