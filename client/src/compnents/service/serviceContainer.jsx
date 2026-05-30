import ServiceItem from "./serviceItem"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import blurServices from "../../assets/blurServices.png"

const ServiceContainer = (props) => {

  return (
    
    <div 
      className="container-xxl py-12 bg-cover bg-center rounded-[3rem] relative z-10 shadow-xl text-center max-w-6xl mx-auto"
      style={{ backgroundImage: `url(${blurServices})` }}
    >
    <div className="container bg-transparent items-center ">
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
              className="carousel-button-next"
            >
                {/* <FaArrowRight /> */}
            </button>
          )
        }
        responsive={{
          // Configure breakpoints for different screen sizes
          640: {
            // Two slides per view on screens >= 640px wide
            slidesToShow: 2,
          },
          768: {
            // Two slides per view on screens >= 768px wide
            slidesToShow: 2,
          },
          1024: {
            // Three slides per view on screens >= 1024px wide
            slidesToShow: 3,
          },
        }}
      >
        <div className="carousel-slide text-white">
          <ServiceItem
            service="Find your mentor"
            text="Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
            icon=" fa-hands-helping"
          />
        </div>
        <div className="carousel-slide text-white">
          <ServiceItem
            service="Apply for mentorship"
            text="Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
            icon="fa-comments"
          />
        </div>
        <div className="carousel-slide text-white">
          <ServiceItem
            service="Level up your skills"
            text="Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
            icon="fa-chart-line"
          />
        </div>
      </Carousel>
    </div>
  </div>
  );
};

export default ServiceContainer;