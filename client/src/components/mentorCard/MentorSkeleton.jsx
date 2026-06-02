import React from 'react';

const MentorSkeleton = () => {
  return (
    <div className="relative box px-7 py-8 mb-12 max-w-screen-lg mx-auto border-2 border-solid border-gray-100 rounded-3xl bg-white animate-pulse">
      <div className="sm:grid grid-cols-12 sm:space-x-8">
        {/* Image & Price Area Skeleton */}
        <div className="col-span-7 md:col-span-5 relative">
          <div className="w-full h-72 bg-gray-200 rounded-lg mb-4 md:mb-20"></div>
          <div className="hidden md:flex items-baseline space-x-2 absolute bottom-0">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-100 rounded"></div>
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="col-span-full col-start-8 md:col-start-6 lg:col-span-13 pr-5 relative">
          <div className="relative h-full pb-10 md:pb-16">
            <div className="grid-cols-3 hidden md:grid mb-4">
              <div className="col-span-2">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
              </div>
              <div className="sm:text-right">
                <div className="h-8 w-24 bg-gray-100 rounded-full ml-auto"></div>
              </div>
            </div>
            
            {/* Mobile Title Skeleton */}
            <div className="md:hidden h-8 w-3/4 bg-gray-200 rounded mb-4"></div>

            <div className="space-y-2 mb-6">
              <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-50 rounded"></div>
            </div>

            {/* Icons Skeleton */}
            <div className="flex space-x-4 py-3 my-5 border-y border-gray-100">
              <div className="h-5 w-16 bg-gray-50 rounded"></div>
              <div className="h-5 w-16 bg-gray-50 rounded"></div>
              <div className="h-5 w-16 bg-gray-50 rounded"></div>
            </div>

            {/* About Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-gray-50 rounded"></div>
              <div className="h-4 w-full bg-gray-50 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-50 rounded"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 bg-gray-100 rounded-full"></div>
              <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
              <div className="h-8 w-16 bg-gray-100 rounded-full"></div>
            </div>

            {/* Button Skeleton */}
            <div className="hidden md:block absolute bottom-0 w-full">
              <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSkeleton;
