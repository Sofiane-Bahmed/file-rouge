import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="space-y-3 w-full max-w-lg">
            <div className="h-10 w-2/3 bg-gray-200 rounded-xl"></div>
            <div className="h-6 w-3/4 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-11 w-32 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card Skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8"></div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Table Card Skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="h-8 w-56 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 p-4 border-b border-gray-50">
                    <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Requests Card Skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="h-7 w-48 bg-gray-200 rounded-lg mb-6"></div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="h-14 w-full bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
