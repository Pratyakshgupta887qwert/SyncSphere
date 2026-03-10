import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';
import WorkWithUs from './WorkWithUs';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Offices from './Offices';
import ExploreUs from './ExploreUs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Route defined exactly to match Header navigate call */}
      <Route path="/workwithus" element={<WorkWithUs />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/offices" element={<Offices />} />
      <Route path="/exploreus" element={<ExploreUs />} />

      {/* Redirect any mistake back to Home (Always at the bottom) */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;