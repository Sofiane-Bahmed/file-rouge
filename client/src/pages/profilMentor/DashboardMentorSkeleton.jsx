import React from 'react';

const DashboardMentorSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F3F2EF] animate-pulse">
      {/* Streamlined Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3 w-full max-w-lg">
              <div className="h-10 w-2/3 bg-gray-200 rounded-xl"></div>
              <div className="h-5 w-3/4 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="h-11 w-48 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              {[1, 2].map((i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
                      </div>
                   </div>
                   <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-56 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 border-b border-gray-50 pb-4">
                    <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="space-y-3">
                <div className="h-2.5 bg-gray-100 rounded-full w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMentorSkeleton;
