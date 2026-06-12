import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#017a53] text-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="inline-block">
              <img src={logo} alt="MentorLink Logo" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-gray-200/80 text-sm leading-relaxed max-w-xs">
              Empowering professional growth through meaningful mentorship. Connect with experts, share knowledge, and accelerate your career journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-all shadow-sm">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-all shadow-sm">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-all shadow-sm">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-all shadow-sm">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/mentors" className="hover:text-white transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AAD4C1]"></span>
                  Find a Mentor
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AAD4C1]"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="hover:text-white transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AAD4C1]"></span>
                  Join as Mentor
                </Link>
              </li>
              <li>
                <Link to="/notFound" className="hover:text-white transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AAD4C1]"></span>
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/notFound" className="hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/notFound" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/notFound" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/notFound" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <FaMapMarkerAlt className="text-[#AAD4C1] text-lg" />
                <span className="text-gray-200/90">Les Vergers, Bir Mourad Rais,<br className="hidden sm:block" /> Alger, Algeria</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <FaPhone className="text-[#AAD4C1]" />
                <span className="text-gray-200/90">+213 (0) 123 456 789</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <FaEnvelope className="text-[#AAD4C1]" />
                <span className="text-gray-200/90">contact@mentorlink.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300/60 uppercase tracking-widest font-bold">
            <p>© {currentYear} MentorLink. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Made with ❤️ for Developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;