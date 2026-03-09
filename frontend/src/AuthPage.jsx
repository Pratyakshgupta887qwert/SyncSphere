import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    
    // Create the exact payload the C# DTO expects
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const res = await axios.post(`http://localhost:5162/api/auth/${endpoint}`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Auth Error:", error);
      // This shows the specific message from your C# 'return BadRequest("...")'
      alert(error.response?.data || "Connection failed. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-red-700 uppercase">
          SyncSphere
        </h1>
        <p className="text-gray-500 font-medium mt-2">Global meetings, perfectly timed.</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex border-b">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-5 text-xs font-black tracking-[0.2em] uppercase transition-all ${isLogin ? 'text-red-600 border-b-2 border-red-600 bg-white' : 'text-gray-400 bg-gray-50 hover:text-gray-600'}`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-5 text-xs font-black tracking-[0.2em] uppercase transition-all ${!isLogin ? 'text-red-600 border-b-2 border-red-600 bg-white' : 'text-gray-400 bg-gray-50 hover:text-gray-600'}`}
          >
            Create Account
          </button>
        </div>

        <div className="p-10">
          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  placeholder="Enter your name" 
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all bg-slate-50/50"
                  onChange={handleChange}
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                placeholder="name@university.edu" 
                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all bg-slate-50/50"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                placeholder="••••••••" 
                className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all bg-slate-50/50"
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-red-700 text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-800 shadow-xl shadow-red-100 transition-all transform active:scale-[0.98] mt-4"
            >
              {isLogin ? 'Enter Dashboard' : 'Start Syncing Now'}
            </button>
          </form>

          {isLogin && (
            <p className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest cursor-pointer hover:text-red-600 transition-colors">
              Forgot Access Credentials?
            </p>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-400 max-w-xs text-center leading-relaxed">
        By continuing, you agree to SyncSphere's Terms of Service and Privacy Policy. We respect your privacy and will never share your information without your consent.<br></br> Pratyaksh Gupta all rights reserved. &copy; 2026
      </p>
    </div>
  );
};

export default AuthPage;