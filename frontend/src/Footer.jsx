import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h2 
              onClick={() => navigate('/')} 
              className="text-2xl font-black tracking-tighter text-red-500 mb-6 cursor-pointer uppercase"
            >
              SYNCHSPHERE
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading the way in global temporal management for high-performance engineering teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-200">Product</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-tight">
              <li onClick={() => navigate('/dashboard')} className="hover:text-red-500 transition-colors cursor-pointer">Scheduler</li>
              <li onClick={() => navigate('/exploreus')} className="hover:text-red-500 transition-colors cursor-pointer">Timezone API</li>
              <li onClick={() => navigate('/exploreus')} className="hover:text-red-500 transition-colors cursor-pointer">Integrations</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-200">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-tight">
              <li onClick={() => navigate('/aboutus')} className="hover:text-red-500 transition-colors cursor-pointer">About Us</li>
              <li onClick={() => navigate('/offices')} className="hover:text-red-500 transition-colors cursor-pointer">Global Offices</li>
              <li onClick={() => navigate('/workwithus')} className="hover:text-red-500 transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-200">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-tight">
              <li onClick={() => navigate('/contactus')} className="hover:text-red-500 transition-colors cursor-pointer">Help Center</li>
              <li onClick={() => navigate('/exploreus')} className="hover:text-red-500 transition-colors cursor-pointer">API Docs</li>
              <li onClick={() => navigate('/contactus')} className="hover:text-red-500 transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© 2026 PRATYAKSH GUPTA ● ALL RIGHTS RESERVED</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span onClick={() => navigate('/aboutus')} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span onClick={() => navigate('/aboutus')} className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span onClick={() => navigate('/contactus')} className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;