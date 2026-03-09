import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Calendar, Clock, Plus, Globe, LogOut } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State Management
  const [user, setUser] = useState({ name: "Aknp", email: "aknp@gla.ac.in" });
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  // 1. LIVE CLOCK EFFECT
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. FETCH DATA EFFECT
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/meetings?email=${user.email}`);
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, [user.email]);

  // 3. HANDLERS
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleGoToday = () => {
    setViewDate(new Date());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onLogout={handleLogout} />

      <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
        {/* Welcome Bar */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div>
            <span className="text-red-600 font-black uppercase tracking-widest text-xs">Member Dashboard</span>
            <h1 className="text-4xl font-serif font-medium text-slate-900 mt-2">
              Welcome back, {user.name}
            </h1>
          </div>
          <div className="flex gap-4">
            {/* <button 
              onClick={handleLogout}
              className="border-2 border-slate-900 text-slate-900 px-6 py-3 font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button> */}
            <button 
              onClick={() => setShowModal(true)}
              className="bg-red-700 text-white px-6 py-3 font-black uppercase tracking-widest hover:bg-red-800 transition-all flex items-center gap-2 shadow-lg shadow-red-200"
            >
              <Plus size={18} /> Add New Sync
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Meetings List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-500 mb-4">Your Schedule</h3>
            {meetings.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-20 text-center">
                <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium">No meetings found.</p>
              </div>
            ) : (
              meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* DIGITAL CLOCK CARD */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-slate-800 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <Globe size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-red-500">Live System Time</h4>
                </div>
                <p className="text-4xl font-mono tracking-tighter mb-2">
                  {currentTime.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe size={12} />
                  <p className="text-[10px] uppercase tracking-widest font-bold">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* CALENDAR CARD */}
            <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <h4 className="font-black uppercase tracking-[0.15em] text-[11px] text-slate-900">
                    {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                  </h4>
                  <button 
                    onClick={handleGoToday}
                    className="text-[9px] font-bold text-red-600 uppercase tracking-widest mt-1 hover:underline text-left"
                  >
                    Go to Today
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 font-bold">
                    {"<"}
                  </button>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 font-bold">
                    {">"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <span key={day} className="text-[10px] font-black text-slate-300 uppercase">{day}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-center">
                {/* Correct Empty Spacing for Start of Month */}
                {Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="py-2"></div>
                ))}

                {/* Actual Days */}
                {Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                  const isToday = day === new Date().getDate() && 
                                  viewDate.getMonth() === new Date().getMonth() &&
                                  viewDate.getFullYear() === new Date().getFullYear();
                  return (
                    <div 
                      key={day} 
                      className={`relative py-2 text-xs font-bold cursor-default transition-all duration-300
                        ${isToday ? 'text-white z-10' : 'text-slate-600 hover:text-red-600'}`}
                    >
                      {isToday && (
                        <span className="absolute inset-1 bg-red-700 rounded-xl -z-10 shadow-lg shadow-red-200"></span>
                      )}
                      {day}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Database Status</span>
                  <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span> Connected
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Total Syncs</span>
                  <span className="text-sm font-black text-slate-900">{meetings.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 px-8 text-center mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          © 2026 PRATYAKSH GUPTA ● SYNCSPHERE PROJECT ENGINE
        </p>
      </footer>
    </div>
  );
};

const MeetingCard = ({ meeting }) => (
  <div className="bg-white p-6 border-l-4 border-red-700 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
    <div>
      <h4 className="text-xl font-bold text-slate-800">{meeting.title}</h4>
      <div className="flex gap-4 mt-2 text-sm text-gray-500 font-medium">
        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(meeting.scheduledTime).toLocaleTimeString()}</span>
        <span className="flex items-center gap-1"><Globe size={14} /> {meeting.hostTimezone}</span>
      </div>
    </div>
    <button className="bg-slate-100 text-slate-600 px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-colors">
      Join Link
    </button>
  </div>
);

export default Dashboard;