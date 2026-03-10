import React from 'react';
import Header from './Header';
import { Cpu, Terminal, Database, Activity } from 'lucide-react';
import Footer from './Footer';

const ExploreUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Inside the Engine</span>
            <h1 className="text-6xl font-serif font-medium text-slate-900 mt-4 leading-tight">Explore the <br /> SyncSphere Stack.</h1>
            <p className="text-slate-500 mt-8 leading-relaxed font-medium">
              We've open-sourced our philosophy on temporal management. Explore how we utilize .NET 8 background services and React-Luxon bridges to maintain a zero-latency global schedule.
            </p>
            <button className="mt-10 bg-slate-900 text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl">
              Download Technical Whitepaper
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-8 rounded-2xl text-white transform translate-y-8">
              <Terminal className="text-red-500 mb-4" />
              <h4 className="font-bold uppercase text-xs tracking-widest">API Layer</h4>
              <p className="text-[10px] text-slate-400 mt-2">RESTful endpoints with 99.9% uptime.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
              <Database className="text-red-600 mb-4" />
              <h4 className="font-bold uppercase text-xs tracking-widest text-slate-900">Data Persistence</h4>
              <p className="text-[10px] text-slate-500 mt-2">NoSQL MongoDB Atlas architecture.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
              <Activity className="text-red-600 mb-4" />
              <h4 className="font-bold uppercase text-xs tracking-widest text-slate-900">Live Sync</h4>
              <p className="text-[10px] text-slate-500 mt-2">Real-time UTC normalization.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl text-white transform -translate-y-8">
              <Cpu className="text-red-500 mb-4" />
              <h4 className="font-bold uppercase text-xs tracking-widest">Core Engine</h4>
              <p className="text-[10px] text-slate-400 mt-2">C# .NET 8 Multi-threaded processing.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreUs;