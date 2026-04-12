import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import StickyHeaderMorph from './components/StickyHeaderMorph';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Services from './pages/Services';
import InnovationHub from './pages/InnovationHub';
import Contact from './pages/Contact';
import './App.css';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <StickyHeaderMorph />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/courses" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/courses" replace /> : <Register />} />
        <Route path="/" element={<Home />} />
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
              <CourseDetail />
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
        <Route
          path="/about"
          element={<About />}
        />
        {/* Placeholders for new pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/innovation-hub" element={<InnovationHub />} />
        <Route path="/news" element={<div style={{ paddingTop: '80px', minHeight: '100vh' }}>News Page (Coming Soon)</div>} />
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
