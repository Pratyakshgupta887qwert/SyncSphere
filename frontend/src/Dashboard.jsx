import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Calendar, Clock, Plus, Globe, LogOut, X } from 'lucide-react';
import axios from 'axios';
import { DateTime } from 'luxon'; // Added Luxon for precision
import Footer from './Footer';

const TIMEZONES = [
  "UTC", "Asia/Kolkata", "America/New_York", "Europe/London", 
  "Asia/Tokyo", "Australia/Sydney", "Asia/Dubai", "America/Los_Angeles"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchMeetings(userData.email);
    } else {
      navigate('/auth'); 
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchMeetings = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5162/api/meetings?email=${email}`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this meeting from Cloud?")) {
      try {
        await axios.delete(`http://localhost:5162/api/meetings/${id}`);
        fetchMeetings(user.email);
      } catch (error) {
        alert("Delete failed. Check backend.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onLogout={handleLogout} />

      <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full relative">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-red-700 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-red-200">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-red-600 font-black uppercase tracking-widest text-xs">Member Dashboard</span>
              <h1 className="text-4xl font-serif font-medium text-slate-900 mt-2">
                Welcome back, {user.name}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-red-700 text-white px-5 py-2 font-black uppercase tracking-widest hover:bg-red-800 transition-all flex items-center gap-1 shadow-lg shadow-red-200"
            >
              <Plus size={18} /> Add New Sync
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-black uppercase tracking-widest text-sm text-slate-500 mb-4">Your Schedule</h3>
            {meetings.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-20 text-center">
                <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium">No meetings found in Cloud.</p>
              </div>
            ) : (
              meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleDelete} />
              ))
            )}
          </div>

          <div className="space-y-6">
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
                <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold">
                  <Globe size={12} /> {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <h4 className="font-black uppercase tracking-[0.15em] text-[11px] text-slate-900">
                    {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                  </h4>
                  <button onClick={handleGoToday} className="text-[9px] font-bold text-red-600 uppercase tracking-widest mt-1 hover:underline text-left">
                    Go to Today
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 font-bold">{"<"}</button>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 font-bold">{">"}</button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <span key={day} className="text-[10px] font-black text-slate-300 uppercase">{day}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-center">
                {Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="py-2"></div>
                ))}
                {Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                  const isToday = day === new Date().getDate() && viewDate.getMonth() === new Date().getMonth() && viewDate.getFullYear() === new Date().getFullYear();
                  return (
                    <div key={day} className={`relative py-2 text-xs font-bold ${isToday ? 'text-white z-10' : 'text-slate-600 hover:text-red-600'}`}>
                      {isToday && <span className="absolute inset-1 bg-red-700 rounded-xl -z-10 shadow-lg shadow-red-200 animate-pulse"></span>}
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <AddMeetingModal 
            user={user} 
            onClose={() => setShowModal(false)} 
            onRefresh={() => fetchMeetings(user.email)} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

const AddMeetingModal = ({ user, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    scheduledTime: '',
    hostTimezone: 'UTC'
  });

  // LUXON PREVIEW LOGIC
  const getISTPreview = () => {
    if (!formData.scheduledTime) return null;
    return DateTime.fromISO(formData.scheduledTime, { zone: "UTC" })
      .setZone("Asia/Kolkata")
      .toFormat("dd MMM, hh:mm a");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // FORCE LUXON TO TREAT INPUT AS UTC
      const utcTime = DateTime.fromISO(formData.scheduledTime, { zone: "UTC" }).toUTC().toISO();

      const payload = {
        title: formData.title,
        hostEmail: user.email,
        scheduledTime: utcTime,
        hostTimezone: formData.hostTimezone
      };
      await axios.post('http://localhost:5162/api/meetings', payload);
      onRefresh();
      onClose();
    } catch (err) {
      alert("Error saving meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <h2 className="font-black uppercase tracking-widest text-xs">New Meeting Sync</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input required type="text" placeholder="Meeting Title" className="w-full p-4 bg-slate-50 border rounded-xl outline-none"
            onChange={(e) => setFormData({...formData, title: e.target.value})} />
          
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">1. Original Meeting Time (UTC)</label>
            <input required type="datetime-local" className="w-full p-4 bg-slate-50 border rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})} />
          </div>

          {formData.scheduledTime && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 border-dashed">
              <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">2. Converted to Indian Time (IST)</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{getISTPreview()}</p>
              <p className="text-[10px] text-slate-400 font-medium italic mt-1">* Added 5 hours 30 minutes automatically.</p>
            </div>
          )}

          <button className="w-full bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-800 transition-all">
            {loading ? "Syncing..." : "Schedule Sync"}
          </button>
        </form>
      </div>
    </div>
  );
};

const MeetingCard = ({ meeting, onDelete }) => {
  // LUXON CARD DISPLAY LOGIC
  const istDisplay = DateTime.fromISO(meeting.scheduledTime).setZone("Asia/Kolkata").toFormat("dd MMM, hh:mm a");

  return (
    <div className="bg-white p-6 border-l-4 border-red-700 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
      <div>
        <h4 className="text-xl font-bold text-slate-800">{meeting.title}</h4>
        <div className="flex flex-col mt-2 gap-1">
          <div className="flex items-center gap-1 text-red-700 font-bold text-sm">
            <Clock size={14} /> {istDisplay} (IST)
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
            <Globe size={12} /> Ref: {DateTime.fromISO(meeting.scheduledTime).toUTC().toFormat("ccc, dd LLL yyyy HH:mm:ss")} UTC
          </div>
        </div>
      </div>
      <button onClick={() => onDelete(meeting.id)} className="bg-slate-100 text-red-600 px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-colors">
        Delete Sync
      </button>
    </div>
  );
};

export default Dashboard;