import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import StickyHeaderMorph from './components/StickyHeaderMorph';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseOverview from './pages/CourseOverview';
import CourseDetail from './pages/CourseDetail';
import SavedCourses from './pages/SavedCourses';
import MyCourses from './pages/MyCourses';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import InnovationHub from './pages/InnovationHub';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import News from './pages/News';
import './App.css';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAdminRoute && !isAuthRoute && <StickyHeaderMorph />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to={user.email === 'admin@yegara.com' ? '/admin' : '/courses'} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/courses" replace /> : <Register />} />
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={user.email === 'admin@yegara.com' ? '/admin' : '/courses'} replace />
            ) : (
              <Home />
            )
          } 
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id/learn"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-courses"
          element={
            <ProtectedRoute>
              <SavedCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/innovation-hub" element={<InnovationHub />} />
        <Route path="/news" element={<News />} />
        <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/board" element={<div style={{ paddingTop: '80px', minHeight: '100vh' }}>Board of Directors Page (Coming Soon)</div>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shareholder" element={<div style={{ paddingTop: '80px', minHeight: '100vh' }}>Shareholder Portal (Coming Soon)</div>} />
        <Route path="/handbook" element={<div style={{ paddingTop: '80px', minHeight: '100vh' }}>Digital Handbook (Coming Soon)</div>} />
      </Routes>
    </>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
