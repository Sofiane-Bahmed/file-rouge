import React, { useState, useEffect, useRef } from 'react';

import axios from "axios"


// const SelectButton = ({ handleSkillChange, selectedSkills }) => {

//   const skills = ['Apple', 'Fitbit', 'Dell', 'Asus', 'Logitech', 'MSI', 'Bosch', 'Sony', 'Samsung', 'Canon', 'Microsoft', 'Razor'];

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleCheckboxChange = (event) => {
//     const skill = event.target.value;
//     const isChecked = event.target.checked;

//     if (isChecked) {
//       handleSkillChange([...selectedSkills, skill]);
//     } else {
//       const updatedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
//       handleSkillChange(updatedSkills);
//     }
//   };

// return (

// <div classNameName='w-full flex items-center justify-center mb-14'>
//   <div classNameName='w-1/2 flex items-center justify-around flex-wrap'>
//     <div classNameName="relative  max-w-xs mx-auto mt-12">
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         classNameName="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//           clipRule="evenodd"
//         />
//       </svg>
//       <label classNameName="inline-flex items-center mt-2">
//           <input
//             type="checkbox"
//             classNameName="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//             value="Software engineer"
//             checked={skills.includes('Software engineer')}
//             onChange={() => handleSkillToggle('Software engineer')}
//           />
//           <span classNameName="ml-2">Software engineer</span>
//         </label>
//     </div>
// <div classNameName="relative max-w-xs mx-auto mt-12">
//   <svg xmlns="http://www.w3.org/2000/svg" classNameName="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
//     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//   </svg>
//   <select classNameName="w-full p-2.5 text-gray-500 bg-white border rounded-full shadow-sm outline-none appearance-none focus:border-indigo-600 text-center  shadow-cyan-600">
//     <option disabled selected>Rating</option>
//     <option>Software engineer</option>
//     <option>IT manager</option>
//     <option>UI / UX designer</option>
//   </select>
// </div>
//     <div classNameName="relative max-w-xs mx-auto mt-12">
//       <svg xmlns="http://www.w3.org/2000/svg" classNameName="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//       </svg>
//       <select classNameName="w-full p-2.5 text-gray-500 bg-white border rounded-full shadow-sm outline-none appearance-none focus:border-indigo-600 text-center  shadow-cyan-600  ">
//         <option disabled selected>Price</option>
//         <option>Software engineer</option>
//         <option>IT manager</option>
//         <option>UI / UX designer</option>
//       </select>
//     </div>

//   </div>
// </div>

//     <div classNameName="flex items-center justify-center p-4">
//       <button
//         id="dropdownDefault"
//         data-dropdown-toggle="dropdown"
//         classNameName="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         type="button"
//         onClick={toggleDropdown}
//       >
//         Filter by category
//         <svg classNameName="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>
//       {isOpen && (
//         <div id="dropdown" classNameName="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
//           <h6 classNameName="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
//           <ul classNameName="space-y-2 text-sm" aria-labelledby="dropdownDefault">
//             {skills.map((skill) => (
//               <li key={skill} classNameName="flex items-center">
//                 <input
//                   id={skill.toLowerCase()}
//                   type="checkbox"
//                   value={skill}
//                   checked={selectedSkills.includes(skill)}
//                   classNameName="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                   onChange={(event) => handleCheckboxChange(event)}
//                 />
//                 <label
//                   htmlFor={skill.toLowerCase()}
//                   classNameName="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
//                 >
//                   {skill} (56) {/* Replace with the appropriate count */}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };



// export default SelectButton



const FiltreButtons = ({ setData }) => {

  const skillsTest = ["React", "Node.js", "JavaScript","Python","SQL","Product Management","Machine Learning","Deep Learning","Prototyping"]
  const domainTest = ["Full Stack Developer", "UX/UI Designer", "Product Manager","Mobile App Developer","Digital Marketing","Data Scientist","Graphic Designer","Cybersecurity"]
  const priceTest = ["80", "90", "100","110","120","130","140","150","160","170","180","190","200","210","220","230"]

  const [dropDownState, setDropDownState] = useState(false)
  const [skillsFilter, setSkillsFilter] = useState([])
  const [domainFilter, setDomainFilter] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  // const [checkedState, setCheckedState] = useState(false)
  const refTest = useRef(null)
  const refTest2 = useRef(null)
  const refTest3 = useRef(null)

  const checkRefs = useRef([])
  const checkRefs2 = useRef([])
  const checkRefs3 = useRef([])



  window.addEventListener("click", (event) => {

    if (dropDownState) {

      refTest?.current?.classList?.add("hidden");
      refTest2?.current?.classList?.add("hidden");
      refTest3?.current?.classList?.add("hidden");
      setDropDownState(false)
    }
  })

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" & dropDownState) {

      refTest?.current?.classList?.add("hidden");
      refTest2?.current?.classList?.add("hidden");
      refTest3?.current?.classList?.add("hidden");
      setDropDownState(false)

    }
  })

  useEffect(() => {
    const filterMentors = async () => {
      try {
       
        const response = await axios.get(`http://localhost:8082/aprenants/filtreMentors?skills=${skillsFilter}&domain=${domainFilter}&price=${priceFilter}`, {
          withCredentials: true
        })
        setData(response.data.mentors)
        
      } catch (error) {
        console.log({ error });
      }

    }

    filterMentors()
  }, [skillsFilter, domainFilter, priceFilter])



  const test = (e) => {
    e.preventDefault()

    e.stopPropagation()

    refTest.current.classList.toggle("hidden")
    setDropDownState(true)
  }
  const test2 = (e) => {
    e.preventDefault()

    e.stopPropagation()

    refTest2.current.classList.toggle("hidden")
    setDropDownState(true)
  }
  const test3 = (e) => {
    e.preventDefault()

    e.stopPropagation()

    refTest3.current.classList.toggle("hidden")
    setDropDownState(true)
  }



  const handleCheckSkill = (e, i) => {
    e.stopPropagation();
    const isChecked = checkRefs.current[i].checked;
    checkRefs.current[i].checked = isChecked;

    setSkillsFilter((prevSkills) => {
      if (isChecked) {
        return [...prevSkills, skillsTest[i]];
      } else {
        return prevSkills.filter((skill) => skill !== skillsTest[i]);
      }
    });
  };
  const handleCheckDomain = (e, i) => {
    e.stopPropagation();
    const isChecked = checkRefs3.current[i].checked;
    checkRefs3.current[i].checked = isChecked;

    setDomainFilter((prevDomain) => {
      if (isChecked) {
        return [...prevDomain, domainTest[i]];
      } else {
        return prevDomain.filter((domain) => domain !== domainTest[i]);
      }
    });
  };
  const handleCheckPrice = (e, i) => {
    e.stopPropagation();
    const isChecked = checkRefs2.current[i].checked;
    checkRefs2.current[i].checked = isChecked;

    setPriceFilter((prevPrice) => {
      if (isChecked) {
        return [...prevPrice, priceTest[i]];
      } else {
        return prevPrice.filter((price) => price !== priceTest[i]);
      }
    });
  };

  useEffect(() => {
    console.log({ skillsFilter });
    console.log({ priceFilter });
    console.log({ domainFilter });
  }, [skillsFilter, priceFilter, domainFilter])



  return (
    <>
      <div className='w-full flex items-center justify-center mb-10'>
        <div className='max-w-screen-lg w-full flex justify-center items-center gap-4 flex-wrap px-4'>
          <div className="relative" >
            <button onClick={test} id="dropdownDefault" data-dropdown-toggle="dropdown "
              className="mb-7   shadow-green-100 text-black bg-transparent  font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center border  shadow-lg outline-none appearance-none focus:border-indigo-600 "
              type="button">
              Skills
              <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>




            <div ref={refTest} id="dropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Skills
              </h6>
              <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                {skillsTest?.map((skill, i) => {
                  return (
                    <li className="flex items-center">
                      <input id="apple" type="checkbox" value={skill} onClick={(e) => {
                        handleCheckSkill(e, i)
                      }} ref={(ref) => {
                        return checkRefs.current[i] = ref
                      }}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                      <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {skill}
                      </label>
                    </li>
                  )
                })}

              </ul>
            </div>

          </div>



          <div Name="flex items-center justify-center p-4 " >
            <button onClick={test2} id="dropdownDefault" data-dropdown-toggle="dropdown"
              className="mb-7 shadow-lg shadow-green-100 text-black bg-transparent font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center border  outline-none appearance-none focus:border-indigo-600  "
              type="button">
              Price
              <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>


            <div ref={refTest2} id="dropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </h6>
              <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                {priceTest?.map((price, i) => {
                  return (
                    <li className="flex items-center">
                      <input id="apple" type="checkbox" value={price} onClick={(e) => {
                        handleCheckPrice(e, i)
                      }} ref={(ref) => {
                        return checkRefs2.current[i] = ref
                      }}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                      <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {price}
                      </label>
                    </li>
                  )
                })}

              </ul>
            </div>
          </div>

          <div Name="flex items-center justify-center p-4 " >
            <button onClick={test3} id="dropdownDefault" data-dropdown-toggle="dropdown"
              className="mb-7 shadow-lg shadow-green-100 text-black bg-transparent  font-medium rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center border  outline-none appearance-none focus:border-indigo-600   "
              type="button">
              Domain
              <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>


            <div ref={refTest3} id="dropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Domains
              </h6>
              <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                {domainTest?.map((domain, i) => {
                  return (
                    <li className="flex items-center">
                      <input id="apple" type="checkbox" value={domain} onClick={(e) => {
                        handleCheckDomain(e, i)
                      }} ref={(ref) => {
                        return checkRefs3.current[i] = ref
                      }}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                      <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {domain}
                      </label>
                    </li>
                  )
                })}

              </ul>
            </div>
          </div>
        </div>
      </div>


    </>


  )
}

export default FiltreButtons



