import React from 'react'

const MentorCard = ({ mentor }) => {

  return (
    <div className="relative box px-7 py-8 transition-all duration-150 mb-12 max-w-screen-lg mx-auto  border-2 border-solid border-black border-opacity-5 rounded-3xl bg-[#fff]  " style={{ marginBottom: '4rem' }}>
      <div className="absolute top-0 -m-4 right-12 block border-2 border-solid border-gray-200 rounded-2xl bg-white has-text-blue font-bold px-2 py-1 text-sm ">
        Only 2 Spots Left
      </div>
      <div className="sm:grid grid-cols-12  sm:space-x-8 ">
        <div className="col-span-7 md:col-span-5 relative">
          <a 
            href={`/profilMentor/${mentor._id}`} 
            target="_blank" 
            className="relative block w-full h-72 rounded-xl overflow-hidden md:mb-20 group"
          > 
            <img 
              src={mentor?.image?.url} 
              alt={`${mentor.firstName} ${mentor.lastName}`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#304160] via-[#304160]/40 to-transparent">
              <div className="md:hidden absolute bottom-4 left-4" >
                <h3 className="title text-2xl text-white font-bold mb-0">
                  {mentor.firstName} {mentor.lastName}
                </h3>
                <span className="text-white text-base mt-2">{mentor.domain} {" "} 
                  at <span className="font-bold">{mentor.company}</span>
                </span>
              </div>
              <div className="absolute block md:hidden top-4 right-4 text-base text-navy-900">
                <div className="bg-white rounded-full px-3 py-2" data-rating="5.0">
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400 mr-0.5 align-sub" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"></path>
                  </svg>
                  <span className="font-bold">{mentor.rating}</span>&nbsp;
                </div>
              </div>
            </div>
          </a>
          <div className="hidden md:block has-text-blue text-3xl lg:text-4xl font-black leading-none absolute bottom-0">
            <span className="price-element minimize">{mentor.price}$</span>
            <span className="inline font-bold text-lg">/&nbsp;month</span>
          </div>
        </div>
        <div className="col-span-full col-start-8 md:col-start-6 lg:col-span-13 border-0  pr-5" style={{ position: 'relative' }}>
          <div className="relative h-full pb-10 md:pb-16">
            <div className="grid-cols-3 hidden md:grid">
              <div className="col-span-2">

                <h3 className="title text-2xl has-text-blue font-bold">
                  {mentor.firstName} {mentor.lastName}
                </h3>

              </div>
              <div className="sm:text-right my-4 sm:my-0">
                <a href="/top/" target="_blank" className="whitespace-nowrap py-2 px-4 rounded-full text-sm cursor-pointer font-bold bg-green text-white hover:text-white"><i className="fa fa-star mr-1"></i>Top mentor</a>
              </div>
            </div>
            <span className="has-text-blue text-base mt-2 hidden md:inline-block">{mentor.domain}{" "}
              at <span className="font-bold">{mentor.company}</span><br />
            </span>
            <span className="font-medium text-teal-700 text-base mt-[2px] hidden md:inline-block">
              {mentor.experience}
            </span>
            <div className="mt-2 hidden md:block">
              <div className="star-rating-display" data-rating="5.0"><span className="is-vishidden">

                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>

                </div>

              </span>
              </div>
              <span className="rating-display"><b className="has-text-blue">{mentor.rating}</b>&nbsp;<span className="has-text-blue"></span></span>
            </div>
            <div className="flex space-x-4 cursor-default w-full py-3 my-5 border-0 border-solid border-t border-b border-gray-200 has-text-blue text-sm font-semibold md:flex">
              <div>
                <svg className="w-5 h-5 align-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>&nbsp;
                Chat
              </div>
              <div>
                <svg className="w-5 h-5  align-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                2
                x&nbsp;Calls
              </div>
              <div>
                <svg className="w-5 h-5  align-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
                Tasks
              </div>
            </div>
            <div className="break-word mt-4 mb-6 max-w-screen-md text-sm leading-6">
              {mentor.about}
            </div>
            <div className="tags flex flex-wrap">
              {/* <a href="#" className="tag-sm  focus:outline-none text-white bg-[#aad4c1] hover:bg-[#bad5ad] focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-1.5 mr-2 mb-2">{mentor.skills}</a> */}
              {mentor.skills.map((skill, index) => (
                <a
                  key={index}
                  href="#"
                  className="tag-sm focus:outline-none text-white bg-[#aad4c1] hover:bg-[#bad5ad] focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-1.5 mr-2 mb-2"
                >
                  {skill}
                </a>
              ))}

            </div>
            <hr className="md:hidden my-4 bg-red" />
            <div className="md:hidden has-text-blue text-3xl lg:text-4xl font-black leading-none">
              <span className="price-element minimize">{mentor.price}$</span>
              <span className="inline font-bold text-lg">/&nbsp;month</span>
            </div>

            <hr className="md:hidden mt-4" />
            <div className="md:grid grid-cols-2 mt-8 space-x-4 absolute bottom-0 w-full">
              <div ><a target="_blank" href={`/profilMentor/${mentor._id}`} className="text-white  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                Profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default MentorCard