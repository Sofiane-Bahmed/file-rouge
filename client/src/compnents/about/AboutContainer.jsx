import { Link } from "react-router-dom";
import AboutItems from "./AboutItem";
import aboutPhoto from "../../assets/aboutImage.png"


const AboutContainer = () => {
  return (
    <div className="container-xxl py-5 rounded-3xl  ">
      <div className="container bg-white ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            className="wow fadeInUp flex items-center"
            data-wow-delay="0.1s"
            style={{ minHeight: "400px" }}
          >
            <div className="relative h-full w-full "> 
              <img
                className="img-fluid absolute w-full h-full rounded-tl-3xl border-4 border-solid border-[#57F2CC] "
                src={aboutPhoto}
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="wow fadeInUp" data-wow-delay="0.3s">
         
              
            <h1 className="mb-4 font-bold">Welcome to <span className="text-[#57F2CC]">Mentorlink</span> </h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
              Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
            </p>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
              Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
              sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <AboutItems content="Skilled Instructors" />
              <AboutItems content="Online Classes" />
              <AboutItems content="Guiding Your Path to Success" />
             
            </div>
            <Link
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              to="/notFound"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;