import ServiceItem from "./serviceItem"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import blurServices from "../../assets/blurServices.png"

const ServiceContainer = (props) => {

  return (
    
    <div 
      className="container-xxl py-8 bg-cover bg-center rounded-[2rem] relative z-10 shadow-xl text-center max-w-5xl mx-auto"
      style={{ backgroundImage: `url(${blurServices})` }}
    >
    <div className="container bg-transparent items-center px-4">
      <Carousel
        showArrows={true}
        showThumbs={false}
        emulateTouch={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        transitionTime={600}
        swipeable={true}
        showStatus={false}
        dynamicHeight={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="carousel-button-prev left-0 md:-left-4"
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
              className="carousel-button-next right-0 md:-right-4"
            >
                {/* <FaArrowRight /> */}
            </button>
          )
        }
        responsive={{
          // Configure breakpoints for different screen sizes
          640: {
            slidesToShow: 1,
          },
          768: {
            slidesToShow: 2,
          },
          1024: {
            slidesToShow: 3,
          },
        }}
      >
        <div className="carousel-slide px-2 pb-6">
          <ServiceItem
            service="Find your mentor"
            text="Explore our network of expert mentors and find the perfect match."
            icon="fa-hands-helping"
          />
        </div>
        <div className="carousel-slide px-2 pb-6">
          <ServiceItem
            service="Apply for mentorship"
            text="Simple application process to connect you with mentors quickly."
            icon="fa-comments"
          />
        </div>
        <div className="carousel-slide px-2 pb-6">
          <ServiceItem
            service="Level up your skills"
            text="Gain practical insights to accelerate your professional growth."
            icon="fa-chart-line"
          />
        </div>
      </Carousel>
    </div>
  </div>
  );
};

export default ServiceContainer;