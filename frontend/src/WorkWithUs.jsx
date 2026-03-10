import React from 'react';
import Header from './Header'; // Reuse your existing header
import { BriefcaseBusiness, Cpu, Zap, Globe } from 'lucide-react';
import Footer from './Footer'; // Reuse your existing footer

const WorkWithUs = () => {
  const roles = [
    { title: "Full-Stack Pioneer", level: "Senior", stack: "React / .NET 8 / Luxon" },
    { title: "Temporal Data Engineer", level: "Mid-Senior", stack: "MongoDB / Time-Series" },
    { title: "Cloud Infrastructure", level: "Mid", stack: "Docker / Render / Vercel" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-20">
        {/* Hero Area */}
        <div className="mb-20 border-b border-gray-200 pb-12">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Careers</span>
          <h1 className="text-6xl font-serif font-medium text-slate-900 mt-4 leading-tight">
            Build the Engine <br /> of Global Time.
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl text-lg font-medium">
            We are looking for developers who understand that "12:30 PM UTC" is more than just a string—it's a global commitment. Join SyncSphere.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-white p-8 border-l-4 border-red-700 shadow-sm hover:shadow-xl transition-all group">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{role.title}</h3>
              <p className="text-red-600 font-bold text-[10px] uppercase tracking-widest mt-2">{role.level} • {role.stack}</p>
              <button className="mt-8 w-full bg-slate-900 text-white py-3 font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-colors">
                Apply to Bench
              </button>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <Cpu size={300} />
          </div>
          <div className="relative z-10 grid md:grid-cols-3 gap-12">
            <div>
              <Zap className="text-red-500 mb-4" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">High Performance</h4>
              <p className="text-slate-400 text-xs leading-relaxed">We optimize for sub-second latency across global deployments.</p>
            </div>
            <div>
              <Globe className="text-red-500 mb-4" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Sync-First Culture</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Our tools are built by the people who need them most.</p>
            </div>
            <div>
              <Cpu className="text-red-500 mb-4" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Clean Architecture</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Service-oriented backends and reactive frontends are our DNA.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkWithUs;