import React, { useEffect, useState } from 'react'
import MentorCard from './MentorCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import apiClient from '../../api/apiClient';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MentorCardSlider = () => {    
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/aprenants/getAvailableMentors');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching mentors:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading mentors...</div>;
  }

  const highRatedMentors = data?.filter((item) => item.rating >= 4) || [];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={highRatedMentors.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={false}
        className="mentor-swiper pb-12"
      >
        {highRatedMentors.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="py-4">
              <MentorCard mentor={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MentorCardSlider;