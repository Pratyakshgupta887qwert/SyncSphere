import React from 'react';
import Header from './Header'; 
import { Clock, ShieldCheck, Zap, Layers } from 'lucide-react';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-20">
        <div className="mb-20 border-b border-gray-200 pb-12">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">The Mission</span>
          <h1 className="text-6xl font-serif font-medium text-slate-900 mt-4 leading-tight">
            Eliminating the 5:30 <br /> Hour Friction.
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl text-lg font-medium">
            SyncSphere was born from a simple problem: Global teams are held back by mental math. We built a high-performance engine that treats UTC as the law and local time as the priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="bg-red-700 text-white p-3 rounded-lg h-fit"><Clock size={24}/></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 uppercase">Temporal Accuracy</h3>
                <p className="text-slate-500 text-sm mt-2">Using Luxon's ISO-8601 parsing, we ensure that a meeting scheduled in London is mathematically perfect in New Delhi.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-slate-900 text-white p-3 rounded-lg h-fit"><Layers size={24}/></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 uppercase">Cloud Infrastructure</h3>
                <p className="text-slate-500 text-sm mt-2">Our .NET 8 backend and MongoDB persistence layer provide the backbone for thousands of sync points globally.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter text-red-500">The Core Engine</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  SyncSphere isn't just a calendar. It's a normalization layer for the world's time. We bridge the gap between engineering teams, regardless of their longitude.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-slate-800 rounded text-[10px] font-bold border border-slate-700 uppercase">.NET 8.0</div>
                    <div className="px-4 py-2 bg-slate-800 rounded text-[10px] font-bold border border-slate-700 uppercase">React 18</div>
                    <div className="px-4 py-2 bg-slate-800 rounded text-[10px] font-bold border border-slate-700 uppercase">MongoDB Atlas</div>
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;