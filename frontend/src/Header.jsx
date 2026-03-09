import React from 'react';
import { ScanFace, LogOut, CalendarCheck2, BriefcaseBusiness } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  // 3. Logout Logic
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('userEmail'); 
    // Redirect to Landing Page
    navigate('/'); 
  };

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 shadow-sm">
      {/* Top Utility Bar */}
      <div className="flex justify-end items-center px-8 py-2 text-xs font-semibold text-gray-600 border-b border-gray-50 tracking-wider">
        <div className="flex space-x-6 uppercase">
          <a href="#" className="hover:text-red-600 transition-colors">Offices</a>
          <a href="#" className="hover:text-red-600 transition-colors flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explore Us
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center border-r border-gray-300 pr-8">
            <img src="picture.jpg" alt="SyncSphere Logo" className="w-20 h-20 mr-2 rounded-2xl mr-12" />
            <h1 className="text-2xl font-black tracking-tighter text-red-700 flex items-center uppercase">
              SyncSphere
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            <Link to="/dashboard" className="group relative cursor-pointer flex items-center hover:text-red-600">
              View Your Schedules <span className="ml-2"><CalendarCheck2 size={16}/></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Work with Us <span className="ml-2"><BriefcaseBusiness size={16}/></span>
            </div>

            <Link to="/auth" className="group relative flex items-center hover:text-red-600">
              Log In <span className="ml-2"><ScanFace size={16}/></span>
            </Link>

            {/* 4. Added onClick handleLogout */}
            <div 
              onClick={handleLogout} 
              className="group relative cursor-pointer flex items-center hover:text-red-600 transition-colors"
            >
              Log OUT <span className="ml-2"> <LogOut size={16}/></span>
            </div>
          </nav>

          <button className="border-2 border-red-600 text-red-600 px-6 py-2 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
            ADD NEW MEETING SCHEDULE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;