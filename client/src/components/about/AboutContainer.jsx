import { Link } from "react-router-dom";
import AboutItems from "./AboutItem";
import aboutPhoto from "../../assets/aboutImage.png"


const AboutContainer = () => {
  return (
    <div className="py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div
          className="wow fadeInUp relative"
          data-wow-delay="0.1s"
        >
          <div className="relative z-10">
            <img
              className="img-fluid w-full h-[400px] lg:h-[550px] rounded-2xl shadow-2xl object-cover border-b-8 border-r-8 border-[#57F2CC]"
              src={aboutPhoto}
              alt="About Mentorlink"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#57F2CC]/20 rounded-full blur-2xl z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl z-0"></div>
        </div>

        <div className="wow fadeInUp" data-wow-delay="0.3s">
          <h2 className="mb-6 text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            Empowering Your Journey through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57F2CC] to-blue-600">Expert Mentorship</span>
          </h2>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            Mentorlink is more than just a platform; it's a bridge between ambition and achievement. We believe that everyone deserves access to quality guidance to navigate their career and personal growth.
          </p>
          <p className="mb-8 text-gray-600 leading-relaxed font-light">
            Our mission is to foster a community where knowledge sharing is seamless, and every interaction brings you one step closer to your full potential. Join us and start your transformation today.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-10">
            <AboutItems content="Industry Expert Mentors" />
            <AboutItems content="Flexible Online Sessions" />
            <AboutItems content="Personalized Growth Plans" />
            <AboutItems content="Vibrant Learning Community" />
          </div>

          <Link
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            to="/notFound"
          >
            Explore Our Mission
            <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;