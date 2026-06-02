
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from './context/SocketContext';

import SignUp from "./pages/signUp/SignUp";
import LogIn from "./pages/logIn/LogIn";
import Mentors from "./pages/mentors/Mentors";
import ProfilMentor from "./pages/profilMentor/ProfilMentor";
import ProfilAprenant from "./pages/profilAprenant/ProfilAprenant";
import DashboardAprenant from './pages/profilAprenant/DashboardAprenant';
import Messages from "./pages/messages/Messages";
import NotFound from './pages/page404';
import About from "./pages/About";

import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import ServiceContainer from './components/service/serviceContainer';
import HeaderText from "./components/HeaderText";
import TestimonialCardSlider from './components/testimonialCard/TestimonialCardSlider';
import MentorCardSlider from './components/mentorCard/MentorCardSlider';

import './App.css';

function App() {
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <SocketProvider userId={localUser?.userId}>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/" element={
            <>
              <NavBar />
              <Hero />
              <div className="relative z-10 mt-0 md:-mt-24 lg:-mt-32 px-4 max-w-7xl mx-auto">
                <ServiceContainer />
              </div>

              <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <HeaderText text="About us" />
                  <About />
                </div>
              </section>

              <section className="py-20 md:py-28 bg-[#f9fff5] border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <HeaderText text="Mentees testimonials" />
                  <TestimonialCardSlider />
                </div>
              </section>

              <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <HeaderText text="Best mentors" />
                  <MentorCardSlider />
                </div>
              </section>

              <Footer />
            </>
          } />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profilAprenant/:aprenantId" element={<ProfilAprenant />} />
          <Route path="/dashboardAprenant/:aprenantId" element={<DashboardAprenant />} />
          <Route path="/profilMentor/:mentorId" element={<ProfilMentor />} />
        </Routes>
      </div>
    </SocketProvider>
  );
}

export default App;
