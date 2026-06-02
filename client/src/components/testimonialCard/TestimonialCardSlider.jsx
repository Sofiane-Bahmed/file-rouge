import React from 'react'
import TestimonialCard from './TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import TestimonialData from './TestimonialData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./testimonialCard.css"

const TestimonialCardSlider = () => {
    return (
        <div className='testimonial-background px-4 py-4 rounded-3xl overflow-hidden'>
            <div className="max-w-7xl mx-auto">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    centeredSlides={false}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={false}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="mySwiper pb-12"
                >
                    {TestimonialData.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <TestimonialCard
                                image={testimonial.image}
                                name={testimonial.name}
                                field={testimonial.field}
                                quote={testimonial.quote}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default TestimonialCardSlider