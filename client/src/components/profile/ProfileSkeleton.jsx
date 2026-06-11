import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F3F2EF] animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Placeholder */}
          <div className="py-4 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Banner Placeholder */}
          <div className="relative mt-6 rounded-t-xl h-48 md:h-64 bg-gray-200"></div>

          <div className="relative pb-8 px-4 md:px-8">
            {/* Avatar Placeholder */}
            <div className="relative -mt-16 md:-mt-20 mb-6 inline-block">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white bg-gray-300 shadow-lg"></div>
            </div>

            {/* Info Placeholder */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-64 md:w-80"></div>
                <div className="h-6 bg-gray-200 rounded w-48 md:w-60"></div>
                <div className="flex gap-4">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              
              {/* Buttons Placeholder */}
              <div className="flex gap-3 pt-4 md:pt-2">
                <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                <div className="h-10 bg-gray-200 rounded-full w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-100 flex flex-col items-center space-y-4">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSkeleton;
