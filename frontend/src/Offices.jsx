import React from 'react';
import Header from './Header';
import { MapPin, Globe2, Building2 } from 'lucide-react';
import Footer from './Footer';

const Offices = () => {
  const locations = [
    { city: "New Delhi", region: "Asia Pacific", address: "Engineering Hub, Okhla Phase III", tz: "IST (UTC+5:30)" },
    { city: "Singapore", region: "ASEAN HQ", address: "Marina Bay Financial Centre", tz: "SGT (UTC+8:00)" },
    { city: "London", region: "EMEA", address: "The Shard, 32 London Bridge St", tz: "GMT (UTC+0:00)" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-20">
        <div className="mb-16">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Global Footprint</span>
          <h1 className="text-6xl font-serif font-medium text-slate-900 mt-4 leading-tight">Our Physical <br /> Sync Points.</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((loc, idx) => (
            <div key={idx} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center rounded-lg mb-6 group-hover:bg-red-700 transition-colors">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{loc.city}</h3>
              <p className="text-red-600 font-bold text-[10px] uppercase tracking-widest mb-4">{loc.region}</p>
              <div className="space-y-2 border-t border-gray-50 pt-4">
                <p className="text-slate-500 text-xs font-medium">{loc.address}</p>
                <p className="text-slate-900 text-xs font-bold uppercase tracking-tighter">Current Zone: {loc.tz}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Offices;