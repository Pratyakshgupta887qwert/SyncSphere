import React from 'react';
import Header from './Header';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Footer from './Footer';
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Reach Out</span>
              <h1 className="text-5xl font-serif font-medium text-slate-900 mt-4 leading-tight">
                Connect with the Engine Room.
              </h1>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-600">
                <Mail className="text-red-700" size={20} />
                <span className="font-bold text-sm uppercase">support@syncsphere.io</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <Phone className="text-red-700" size={20} />
                <span className="font-bold text-sm uppercase">+91 (800) SYNC-NOW</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <MapPin className="text-red-700" size={20} />
                <span className="font-bold text-sm uppercase">Engineering Hub, India</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2 bg-white p-10 shadow-xl border-t-8 border-red-700">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                <input type="text" className="border-b-2 border-gray-100 py-3 focus:border-red-700 outline-none transition-all font-medium" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Engineering Role</label>
                <input type="text" className="border-b-2 border-gray-100 py-3 focus:border-red-700 outline-none transition-all font-medium" placeholder="Lead Developer" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows="4" className="border-b-2 border-gray-100 py-3 focus:border-red-700 outline-none transition-all font-medium resize-none" placeholder="How can we sync your team?"></textarea>
              </div>
              <button className="md:col-span-2 bg-slate-900 text-white py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                Initialize Transmission <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;