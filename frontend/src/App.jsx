import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';

function App() {
  return (
    <Routes>
      {/* 1. Main Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* 2. Login/Sign-up Page */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* 3. The Dashboard (After Login) */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* 4. Redirect any mistake back to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;