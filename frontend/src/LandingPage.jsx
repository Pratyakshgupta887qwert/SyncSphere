import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { Globe, LayoutDashboard, BellRing, AlarmClock, Settings2 } from 'lucide-react';
import Footer from './Footer';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white border border-gray-100 shadow-sm hover:border-red-200 transition-all duration-300">
    <div className="mb-4 p-3 bg-red-50 w-fit rounded-lg">{icon}</div>
    <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-slate-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm font-medium">{desc}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative px-8 py-24 flex flex-col items-center text-center bg-gradient-to-b from-white to-slate-50 flex-grow">
        <div className="max-w-4xl">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            The Ultimate Global Scheduler
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-tight text-slate-900">
            One Link. <span className="relative inline-block">
              Every Timezone.
              <span className="absolute bottom-2 left-0 w-full h-1.5 bg-red-600/20"></span>
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            A simple platform to schedule, manage, and remind your team about global meetings. 
            No more manual calculations—just seamless coordination.
          </p>
          <div className="mt-10 flex gap-4 justify-center pb-25">
            <Link to="/auth">
              <button className="bg-red-700 text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl shadow-red-200 active:scale-95 mb-22">
                Get Started & Schedule Your First Sync
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid: The 5 Main Pillars */}
      {/* <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Platform Features</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Globe className="text-red-700" size={28} />}
            title="Auto-Timezone Conversion"
            desc="Pick a time in your zone, and we'll automatically show the correct local time to every participant. Supports 400+ global timezones."
          />
          <FeatureCard 
            icon={<LayoutDashboard className="text-red-700" size={28} />}
            title="Meeting Dashboard"
            desc="A centralized view of all your upcoming and past global syncs. Stay organized with a clean, chronological timeline."
          />
          <FeatureCard 
            icon={<BellRing className="text-red-700" size={28} />}
            title="Smart Reminders"
            desc="Never miss a call. Receive automated browser notifications and SMS alerts 10 minutes before your meeting starts."
          />
          <FeatureCard 
            icon={<AlarmClock className="text-red-700" size={28} />}
            title="Alarm Alerts"
            desc="For critical meetings, enable a high-priority sound alarm that triggers directly in your browser so you're always ready."
          />
          <FeatureCard 
            icon={<Settings2 className="text-red-700" size={28} />}
            title="Global Management"
            desc="Easily edit, reschedule, or cancel meetings across different regions. We handle the time shift updates for everyone."
          />
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default LandingPage;