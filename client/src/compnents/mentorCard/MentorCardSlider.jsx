import React, { useEffect, useState } from 'react'
import MentorCard from './MentorCard'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';


const MentorCardSlider = () => {    
const [data,setData] = useState()
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/aprenants/getAvailableMentors', {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('An error occurred while fetching mentors:', error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <Carousel
    showArrows={true}
    showThumbs={false}
    emulateTouch={true}
    infiniteLoop={true}
    autoPlay={true}
    interval={2000}
    transitionTime={500}
    swipeable={true}
    showStatus={false}
    dynamicHeight={false}
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
      hasPrev && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          className="carousel-button-prev"
        >
           {/* <FaArrowLeft /> */}
        </button>
      )
    }
    renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          className="carousel-button-next "
        >
            {/* <FaArrowRight /> */}
        </button>
      )
    }
    responsive={{
      // Configure breakpoints for different screen sizes
      640: {
        // Two slides per view on screens >= 640px wide
        slidesToShow: 1,
      },
      768: {
        // Two slides per view on screens >= 768px wide
        slidesToShow: 1,
      },
      1024: {
        // Three slides per view on screens >= 1024px wide
        slidesToShow: 1,
      },
    }}
  >
    {
      data?.filter((item)=> item.rating==5).map((item)=>{
        return <div className="carousel-slide p-4 ">
        <MentorCard
          // image={"https://cdn.mentorcruise.com/cache/ab90d67e8e2acafbf6d671c9633f720b/237d07cb4df01d27/daa2e83358abfc5d34f6278b1d4d641f.jpg"}
          mentor={item}
        />
   </div>
      })
    }
  {/* <div className="carousel-slide p-4 ">
       <MentorCard
         image={"https://cdn.mentorcruise.com/cache/ab90d67e8e2acafbf6d671c9633f720b/237d07cb4df01d27/daa2e83358abfc5d34f6278b1d4d641f.jpg"}
         name={"Phong Huynh"}
         field={"Senior Software Engineer"}
         company={"Square"}
         rating={"5 stars"}
         price={"120$"}
         experience={"9+ years of experience in Front End Engineering"}
         description={"I am a Front End Software Engineer with over 9 years of experience at various tech companies, currently based in Toronto, Canada. I am currently working at Square and was previously at Coinbase, Taplytics. I also mentor at Lighthouse Labs: Canada's Leading Coding Bootcamp on the side. I have professional, …"}
         skills={"Engineering & Data"}
       />
  </div>
  <div className="carousel-slide p-4">
       <MentorCard
          image="https://cdn.mentorcruise.com/cache/0eb42f38501d36a972d74f3971ef9551/6028b81d6719f93c/c10e55e8785e197c00686fd030068466.jpg"
          name={"Munir Alsafi"}
          field={"ntermediate Software Engineer"}
          company={"PayPal"}
          rating={"5 stars"}
          price={"180$"}
          experience={"Accelerate your growth and land that dream software job"}
          description={"I am a Front-End Software Engineer II at PayPal with 3+ years of Software Engineering Experience. As your mentor I will - Refine your resume and LinkedIn to break into the tech industry - Sharpen your technical abilities and provide a clear path - Build your confidence to become the …"}
          skills={"React"}
       />
  </div>
  <div className="carousel-slide p-4">
       <MentorCard
         image="https://cdn.mentorcruise.com/cache/ca27553fafe84d2ea5c25094a2609e17/b478fe40a74f507d/0bb412c5ea96fa087cd4613a1f9e830c.jpg"
         name={"Victor Barros"}
         field={"Founder, Entrepreneur, Investor, Mentor"}
         company={"Gringo, Eskolare"}
         rating={"5 stars"}
         price={"160$"}
         experience={"16+ experience, tech-business-product background, early, growth and late stage experience, leadership"}
         description={"Are you an entrepreneur looking to start or grow your startup? 💬 Do you want to advance your career in product management or make a career transition? 💬 Are you a software developer looking for guidance on how to tackle new challenges? I may be able to help. My …"}
         skills={"Business & Management"}
       />
  </div> */}


   </Carousel>

  )
}

export default MentorCardSlider