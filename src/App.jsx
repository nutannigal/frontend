// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import ArchitecturalDesign from './pages/ArchitecturalDesign';
import ResidentialDesignPage from './pages/ResidentialDesignPage';
import CommercialDesignPage from './pages/CommercialDesignPage';
import ConsultationPage from './pages/ConsultationPage';
import RenovationPage from './pages/RenovationPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FrontUIDesign from './pages/admin/FrontUIDesign';
import PortfolioManagement from './pages/admin/PortfolioManagement';
import EnquiriesManagement from './pages/admin/EnquiriesManagement';
import BlogManagement from './pages/admin/BlogManagement';
import SettingsPage from './pages/admin/SettingsPage';
import { AuthProvider } from './context/AuthContext';
import useLenis from './hooks/useLenis';

function AppLayout() {
  useLenis();
  const location = useLocation();
  const showAdminSidebar = location.pathname.startsWith('/admin/') && location.pathname !== '/admin/login';
  const showGlobalFooter = location.pathname !== '/' && !location.pathname.startsWith('/admin/');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {showAdminSidebar && <AdminSidebar />}
      <main className={`flex-1 ${showAdminSidebar ? 'lg:pl-64' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/residential" element={<ResidentialDesignPage />} />
          <Route path="/services/commercial" element={<CommercialDesignPage />} />
          <Route path="/services/architectural" element={<ArchitecturalDesign />} />
          <Route path="/services/consultation" element={<ConsultationPage />} />
          <Route path="/services/renovation" element={<RenovationPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/front-ui" element={<FrontUIDesign />} />
          <Route path="/admin/portfolio" element={<PortfolioManagement />} />
          <Route path="/admin/enquiries" element={<EnquiriesManagement />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      {showGlobalFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;