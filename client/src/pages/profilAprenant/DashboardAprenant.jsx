import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import NavBar from "../../compnents/navbar/NavBar";
import Footer from "../../compnents/footer/Footer";
import ProgressComponent from "../../compnents/Progress";
import Table from "../../compnents/Table";
import { MdDashboard, MdAssignment, MdTimeline } from 'react-icons/md';
import DashboardSkeleton from './DashboardSkeleton';

const DashboardAprenant = () => {
  const { aprenantId } = useParams();
  const [data, setData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, requestsRes] = await Promise.all([
          axios.get(`http://localhost:8082/aprenants/viewAprenantProfile/${aprenantId}`, { withCredentials: true }),
          axios.get(`http://localhost:8082/requests/getMentorshipAprenant/${aprenantId}`, { withCredentials: true })
        ]);
        
        setData(profileRes.data.aprenant);
        setMyRequests(requestsRes.data?.requests || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aprenantId]);

  if (loading) {
    return (
      <>
        <NavBar />
        <DashboardSkeleton />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
              <MdDashboard className="text-[#007749]" />
              Learning Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Welcome back, {data?.firstName}! Track your progress and mentorships here.</p>
          </div>
          <Link 
            to={`/profilAprenant/${aprenantId}`}
            className="px-6 py-2.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            View Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <MdTimeline className="text-[#007749]" />
                Curriculum Progress
              </h2>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <ProgressComponent />
              </div>
            </div>

            {/* Mentorship Sessions */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <MdAssignment className="text-[#007749]" />
                Active Mentorships
              </h2>
              <Table aprenant={data} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Requests Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Mentorship Requests
              </h2>
              
              <div className="space-y-4">
                {myRequests.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No requests sent yet.</p>
                ) : (
                  myRequests.map((req) => (
                    <div key={req._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={req.mentor?.image?.url || "https://via.placeholder.com/40"} 
                          className="w-10 h-10 rounded-full object-cover"
                          alt="Mentor"
                        />
                        <div>
                          <p className="font-bold text-sm text-gray-900">{req.mentor?.firstName} {req.mentor?.lastName}</p>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                      
                      {req.responseMessage && (
                        <div className="mt-3 p-3 bg-white rounded-xl text-xs text-gray-600 border border-gray-50">
                          <p className="italic">"{req.responseMessage}"</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link 
                  to="/mentors"
                  className="w-full inline-flex items-center justify-center py-4 bg-[#007749] text-white font-bold rounded-2xl shadow-lg shadow-[#007749]/20 hover:bg-[#00663d] transition-all transform hover:scale-[1.02]"
                >
                  Find More Mentors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardAprenant;
