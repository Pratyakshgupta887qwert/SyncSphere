import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // This would trigger your Google OAuth flow
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");
    // window.location.href = "http://localhost:5000/api/auth/google-login";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tighter text-red-700 flex items-center justify-center">
          SYNCHSPHERE <span className="ml-2 text-xl text-gray-800"></span>
        </h1>
        <p className="text-gray-500 font-medium mt-2">Where global meetings stay in sync.</p>
      </div>

      <div className="w-full max-auto max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Toggle Header */}
        <div className="flex border-b">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${isLogin ? 'text-red-600 border-b-2 border-red-600 bg-white' : 'text-gray-400 bg-gray-50 hover:text-gray-600'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-all ${!isLogin ? 'text-red-600 border-b-2 border-red-600 bg-white' : 'text-gray-400 bg-gray-50 hover:text-gray-600'}`}
          >
            Join Now
          </button>
        </div>

        <div className="p-8">
          {/* Google Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <img src="Google_Favicon_2025.svg.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or email</span></div>
          </div>

          {/* Manual Form */}
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Full Name</label>
                <input type="text" placeholder="Aknp" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all" />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Email Address</label>
              <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all" />
            </div>

            <button className="w-full bg-red-700 text-white py-4 rounded-lg font-black uppercase tracking-widest hover:bg-red-800 shadow-lg shadow-red-200 transition-all transform active:scale-[0.98] mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <p className="text-center mt-6 text-xs text-gray-400 font-medium cursor-pointer hover:text-red-600">
              Forgot your password?
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