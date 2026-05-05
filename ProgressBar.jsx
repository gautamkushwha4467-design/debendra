import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CareerDetailPage from './pages/CareerDetailPage.jsx';
import SkillGapPage from './pages/SkillGapPage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/career/:id" element={<CareerDetailPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
