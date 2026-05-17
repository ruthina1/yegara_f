import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './Login.css';

declare global {
  interface Window {
    google?: any;
    AppleID?: any;
  }
}

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSocialSuccess = useCallback(async (data: any) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/courses';
  }, []);

  // Load Social Sign-In SDKs (Google & Apple)
  React.useEffect(() => {
    let googleScript: HTMLScriptElement | null = null;
    if (GOOGLE_CLIENT_ID) {
      googleScript = document.createElement('script');
      googleScript.src = 'https://accounts.google.com/gsi/client';
      googleScript.async = true;
      googleScript.defer = true;
      document.head.appendChild(googleScript);
    }

    const appleScript = document.createElement('script');
    appleScript.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    appleScript.async = true;
    appleScript.defer = true;
    document.head.appendChild(appleScript);

    return () => {
      if (googleScript && document.head.contains(googleScript)) {
        document.head.removeChild(googleScript);
      }
      if (document.head.contains(appleScript)) {
        document.head.removeChild(appleScript);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(email, password, name);
    setLoading(false);

    if (result.success) {
      navigate('/courses');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('Google Sign-In is not configured. Please set REACT_APP_GOOGLE_CLIENT_ID.');
      return;
    }
    setSocialLoading('google');
    setError('');

    try {
      if (!window.google) {
        setError('Google SDK is blocked or still loading. Please disable any adblockers/trackers and refresh.');
        setSocialLoading('');
        return;
      }
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            const res = await api.post('/auth/google', { credential: response.credential });
            await handleSocialSuccess(res.data);
          } catch (err: any) {
            setError(err.response?.data?.error || 'Google sign-in failed');
            setSocialLoading('');
          }
        },
      });
      window.google.accounts.id.prompt();
    } catch (err) {
      setError('An error occurred while launching Google Sign-In. Please try again.');
      setSocialLoading('');
    }
  };

  const handleAppleLogin = () => {
    setSocialLoading('apple');
    setError('');

    if (!window.AppleID) {
      setError('Apple Sign-In is not configured.');
      setSocialLoading('');
      return;
    }

    try {
      window.AppleID.auth.init({
        clientId: process.env.REACT_APP_APPLE_CLIENT_ID || '',
        scope: 'name email',
        redirectURI: window.location.origin + '/register',
        usePopup: true,
      });

      window.AppleID.auth.signIn().then(async (response: any) => {
        try {
          const res = await api.post('/auth/apple', {
            id_token: response.authorization.id_token,
            user: response.user,
          });
          await handleSocialSuccess(res.data);
        } catch (err: any) {
          setError(err.response?.data?.error || 'Apple sign-in failed');
          setSocialLoading('');
        }
      }).catch(() => {
        setSocialLoading('');
      });
    } catch {
      setError('Apple Sign-In failed to initialize.');
      setSocialLoading('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as any;

  return (
    <div className="auth-screen-wrapper">
      <div className="auth-split-layout">
        {/* Left Info Panel */}
        <motion.div 
          className="auth-sidebar-info"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="auth-sidebar-glow" />
          
          <motion.div className="auth-sidebar-brand" variants={itemVariants}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: 'inherit' }}>
              <motion.div 
                className="auth-sidebar-logo-mark"
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to Home"
              >
                <FiArrowLeft style={{ fontSize: '1.25rem' }} />
              </motion.div>
              <span className="auth-sidebar-brand-name">Yegara Academy</span>
            </Link>
          </motion.div>

          <div className="auth-sidebar-content">
            <h2 className="auth-sidebar-welcome">Start Your Journey</h2>
            <p className="auth-sidebar-desc">
              Your gateway to trading mastery and professional growth. Access interactive learning materials, deep-dive courses, visual player layouts, and real-time certification tracks designed to build financial excellence.
            </p>

            <div className="auth-sidebar-features">
              <motion.div 
                className="sidebar-feature-item"
                whileHover={{ x: 6, color: '#f47920' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="feature-dot"></span>
                <span>Fully-featured visual player systems</span>
              </motion.div>
              <motion.div 
                className="sidebar-feature-item"
                whileHover={{ x: 6, color: '#f47920' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="feature-dot"></span>
                <span>Rich multimedia visual learning galleries</span>
              </motion.div>
              <motion.div 
                className="sidebar-feature-item"
                whileHover={{ x: 6, color: '#f47920' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="feature-dot"></span>
                <span>Integrated progress tracking & pathing</span>
              </motion.div>
            </div>
          </div>

          <div className="auth-sidebar-footer">
            © {new Date().getFullYear()} Yegara Trading. All rights reserved.
          </div>
        </motion.div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-flat-card">
            {/* Header */}
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>Join us and start learning today</p>
            </div>

            {/* Social login buttons */}
            <div className="auth-social-row">
              <button
                type="button"
                className="auth-social-btn"
                onClick={handleGoogleLogin}
                disabled={!!socialLoading}
              >
                {socialLoading === 'google' ? (
                  <span className="auth-spinner-mini" />
                ) : (
                  <FaGoogle className="auth-social-icon google-icon" />
                )}
                Google
              </button>
              <button
                type="button"
                className="auth-social-btn"
                onClick={handleAppleLogin}
                disabled={!!socialLoading}
              >
                {socialLoading === 'apple' ? (
                  <span className="auth-spinner-mini" />
                ) : (
                  <FaApple className="auth-social-icon apple-icon" />
                )}
                Apple
              </button>
            </div>

            <div className="auth-divider">
              <span>or register with email</span>
            </div>

            {/* Error Message */}
            {error && <div className="auth-error" role="alert">{error}</div>}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="register-name">Full Name</label>
                <div className="auth-input-wrap">
                  <FiUser className="auth-input-icon" />
                  <input
                    type="text"
                    id="register-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">Email Address</label>
                <div className="auth-input-wrap">
                  <FiMail className="auth-input-icon" />
                  <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">Password</label>
                <div className="auth-input-wrap">
                  <FiLock className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner-mini" />
                ) : (
                  <>
                    Create Account <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-footer-link">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
