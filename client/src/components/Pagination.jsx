import { useState, useEffect } from "react";


const Pagination = ({ onPageChange, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
;



  useEffect(() => {
    generatePages();
  }, [totalPages]);

  const generatePages = () => {
    const pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    setPages(pageArray);
  };

  const handlePageChange = (page) => {
    
    setCurrentPage(page);
    onPageChange(page);
  
  };

  return (
    
      <div className="max-w-screen-lg mx-auto mt-12 px-4 text-gray-600 mb-28 ">
        <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="hover:text-indigo-600 flex items-center gap-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          <ul className="flex items-center gap-1">
            {pages.map((item) => (
              <li key={item} className="text-sm">
                <button
                  onClick={() => handlePageChange(item)}
                  aria-current={currentPage === item ? "page" : false}
                  className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage === item ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                    }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="hover:text-indigo-600 flex items-center gap-x-2"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* On mobile version */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Previous
          </button>
          <div className="font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    
  );
};

export default Pagination;