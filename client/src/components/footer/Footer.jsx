import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';


import "../footer/footer.css"


const Footer = () => {
  return (
     
    <section id="contact">
    <div className="footer">
       <div className="main">
          <div className="list">
             <h4>quick links</h4>
             <ul>
                <li><Link to="/notFound">about us</Link></li>
                <li><Link to="/notFound">terems and condition</Link></li>
                <li><Link to="/notFound">privacy policy</Link></li>
                <li><Link to="/notFound">help</Link></li>
                <li><Link to="/notFound">mentors</Link></li>
             </ul>
          </div>
          <div className="list">
             <h4>support</h4>
             <ul>
                <li><Link to="/notFound">about us</Link></li>
                <li><Link to="/notFound">terems and condition</Link></li>
                <li><Link to="/notFound">privacy policy</Link></li>
                <li><Link to="/notFound">help</Link></li>
                <li><Link to="/notFound">mentors</Link></li>
             </ul>
          </div>
          <div className="list">
             <h4>contact info</h4>
             <ul>
                <li><Link to="/notFound">les vergers bir mourad rais</Link></li>
                <li><Link to="/notFound">alger la blanche</Link></li>
                <li><Link to="/notFound">+12344556788</Link></li>
                <li><Link to="/notFound">mentorlink@gmail.com</Link></li>
                <li><Link to="/notFound">+1(213)123344556</Link></li>
             </ul>
          </div>
          <div className="list">
             <h4>cnnect</h4>
             <div className="social">
                <Link to="/notFound"><FaInstagram/></Link>
                <Link to="/notFound"><FaLinkedin/></Link>
                <Link to="/notFound"><FaTwitter/></Link>
                <Link to="/notFound"><FaFacebook/></Link>
             </div>
          </div>
          <div className="end-text">
             <p>all rights are reserved - made by bahmed sofiane</p>
          </div>
       </div>
    </div>
 </section>
  )
}

export default Footer