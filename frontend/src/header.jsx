import React, { useState, useEffect } from 'react';
import { ScanFace, LogOut, BriefcaseBusiness, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Contact } from 'lucide-react';
import { House } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [utcTime, setUtcTime] = useState(new Date());

  // 1. Sync User State and UTC Clock
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Update UTC clock every minute
    const timer = setInterval(() => setUtcTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // 2. Updated Logout Logic
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 shadow-sm">
      {/* Top Utility Bar - Added UTC Time Display */}
      <div className="flex justify-between items-center px-8 py-2 text-xs font-semibold text-gray-600 border-b border-gray-50 tracking-wider">
        <div className="flex items-center gap-2 text-red-700">
           <Globe size={12} /> 
           <span>UTC: {utcTime.getUTCHours().toString().padStart(2, '0')}:{utcTime.getUTCMinutes().toString().padStart(2, '0')}</span>
        </div>
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
             {/* Navigation Links can go here */}
          </nav>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Home <span className="ml-2"><House size={20}/></span>
            </div>

            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Work with Us <span className="ml-2"><BriefcaseBusiness size={20}/></span>
            </div>
            
            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Abous Us <span className="ml-2"><Info  size={20}/></span>
            </div>

            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Contact Us <span className="ml-2"><Contact size={20}/></span>
            </div>

            {/* 3. Conditional User Display */}
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-red-700 border-b-2 border-red-700 pb-1">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <div 
                  onClick={handleLogout} 
                  className="group relative cursor-pointer flex items-center hover:text-red-600 transition-colors"
                >
                  Log OUT <span className="ml-2"> <LogOut size={20}/></span>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="group relative flex items-center hover:text-red-600">
                Log In <span className="ml-2"><ScanFace size={20}/></span>
              </Link>
            )}
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