import React, { useState, useEffect } from 'react';
import { ScanFace, LogOut, BriefcaseBusiness, Globe, Info, Contact, House } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to detect page changes
  const [user, setUser] = useState(null);
  const [utcTime, setUtcTime] = useState(new Date());

  const parseStoredUser = (rawUser) => {
    if (!rawUser) return null;
    try {
      const parsed = JSON.parse(rawUser);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  };

  // 1. Sync User State and UTC Clock
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setUser(parseStoredUser(savedUser));

    const timer = setInterval(() => setUtcTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [location]); // Re-check user when moving between pages

  // 2. Updated Logout Logic.
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleHomeClick = () => {
    const activeUser = localStorage.getItem('user');
    if (activeUser) {
      if (window.location.pathname === '/dashboard') {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 shadow-sm sticky top-0 z-50 mb-8">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center px-8 py-2 text-xs font-semibold text-gray-600 border-b border-gray-50 tracking-wider">
        <div className="flex items-center gap-2 text-red-700">
          <Globe size={12} />
          <span>UTC: {utcTime.getUTCHours().toString().padStart(2, '0')}:{utcTime.getUTCMinutes().toString().padStart(2, '0')}</span>
        </div>
        <div className="flex space-x-6 uppercase">
          <div onClick={() => navigate('/offices')} className="hover:text-red-600 transition-colors cursor-pointer">Offices</div>
          <div onClick={() => navigate('/exploreus')} className="hover:text-red-600 transition-colors flex items-center cursor-pointer">Explore Us</div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-8">
          <div 
            onClick={() => navigate(user ? '/dashboard' : '/')} 
            className="flex items-center border-r border-gray-300 pr-8 cursor-pointer"
          >
            <img src="picture.jpg" alt="Logo" className="w-12 h-12 mr-4 rounded-xl" />
            <h1 className="text-2xl font-black tracking-tighter text-red-700 flex items-center uppercase">
              SyncSphere
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            {/* Home / Dashboard Toggle */}
            <div
              onClick={handleHomeClick}
              className="group relative cursor-pointer flex items-center hover:text-red-700 transition-colors duration-300 font-bold uppercase tracking-widest text-xs"
            >
              {user && window.location.pathname !== '/dashboard' ? 'Dashboard' : 'Home'}
              <span className="ml-2 group-hover:scale-110 transition-transform">
                <House size={18} />
              </span>
            </div>

            {/* Work with Us */}
            <div
              onClick={() => navigate('/workwithus')}
              className="group relative cursor-pointer flex items-center hover:text-red-600 transition-colors"
            >
              Work with Us
              <span className="ml-2 group-hover:scale-110 transition-transform">
                <BriefcaseBusiness size={20} />
              </span>
            </div>

            {/* About Us */}
            <div onClick={() => navigate('/aboutus')} className="group relative cursor-pointer flex items-center hover:text-red-600">
              About Us <span className="ml-2"><Info size={20} /></span>
            </div>

            {/* Contact Us */}
            <div onClick={() => navigate('/contactus')} className="group relative cursor-pointer flex items-center hover:text-red-600">
              Contact Us <span className="ml-2"><Contact size={20} /></span>
            </div>

            {/* Conditional User Display */}
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-red-700 border-b-2 border-red-700 pb-1 lowercase first-letter:uppercase">
                  Hi, {(user.name || user.email || 'member').split(' ')[0]}
                </span>
                <div
                  onClick={handleLogout}
                  className="group relative cursor-pointer flex items-center hover:text-red-600 transition-colors pr-20"
                >
                  Log OUT <span className="ml-2"> <LogOut size={20} /></span>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="group relative flex items-center hover:text-red-600">
                Log In <span className="ml-2"><ScanFace size={20} /></span>
              </Link>
            )}
          </nav>

          {/* <button className="border-2 border-red-600 text-red-600 px-6 py-2 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
            ADD NEW MEETING SCHEDULE
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;