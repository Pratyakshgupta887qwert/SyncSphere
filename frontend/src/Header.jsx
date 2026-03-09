import React, { useState } from 'react';
import { ScanFace } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { CalendarCheck2 } from 'lucide-react';
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 shadow-sm">
      {/* Top Utility Bar (Secondary Nav) */}
      <div className="flex justify-end items-center px-8 py-2 text-xs font-semibold text-gray-600 border-b border-gray-50 tracking-wider">
        <div className="flex space-x-6 uppercase">
          <a href="#" className="hover:text-red-600 transition-colors">Offices</a>
          <a href="#" className="hover:text-red-600 transition-colors flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Explore Us
          </a>
          {/* <a href="#" className="hover:text-red-600 transition-colors">Global | English</a>
          <a href="#" className="hover:text-red-600 transition-colors flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            Saved Items
          </a> */}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-8">
          {/* Logo Section */}
          <div className="flex items-center border-r border-gray-300 pr-8">
            {/* <button className="mr-4 text-gray-800">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button> */}
            <img src="picture.jpg" alt="SyncSphere Logo" className="w-20 h-20 mr-2 rounded-2xl mr-12" />
            <h1 className="text-2xl font-black tracking-tighter text-red-700 flex items-center">
            SYNCHSPHERE <span className="ml-1 text-lg"></span>
            </h1>
            {/* <span className="ml-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Careers</span> */}
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            
            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              View Your Shedules <span className="ml-1 text-[10px]"><CalendarCheck2 /></span>
            </div>
            {/* <a href="#" className="text-red-600 border-b-2 border-red-600 pb-1">Impact Stories</a> */}
          </nav>
        </div>

        {/* Action Button */}
        <nav className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
        <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Work with Us <span className="ml-1 text-[10px]">▼</span>
            </div>

            <Link to="/auth" className="group relative flex items-center hover:text-red-600">
              Log In <span className="ml-1 text-[10px]"><ScanFace /></span>
            </Link>
            <div className="group relative cursor-pointer flex items-center hover:text-red-600">
              Log OUT <span className="ml-1 text-[10px]"> <LogOut /></span>
            </div>
            </nav>
        <div className="flex items-center space-x-4">
          <button className="border-2 border-red-600 text-red-600 px-6 py-2 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
            ADD NEW MEETING SHEDULE
          </button>
          <button className="text-gray-400 hover:text-red-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;