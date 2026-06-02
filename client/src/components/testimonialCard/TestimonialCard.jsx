import React from 'react'
import "./testimonialCard.css"

const TestimonialCard = (props) => {

  return (
    <div className='container-profil'>
      <figure className="snip1390">
        <img src={props.image} alt="profile-sample3" className="profile" />
        <figcaption>
          <h2>{props.name}</h2>
          <h4>{props.field}</h4>
          <blockquote>{props.quote}</blockquote>
        </figcaption>
      </figure>
    </div>




  )
}

export default TestimonialCard