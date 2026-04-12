import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/courses');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-to-home">
        <FiArrowLeft size={16} /> Back to Website
      </Link>

      <div className="login-branding">
        <motion.div 
          className="brand-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="brand-logo" style={{ flexDirection: 'column', gap: '24px' }}>
            <h1 className="brand-name">Yegara LMS</h1>
            <p className="brand-subtitle">Professional Training & Excellence</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="login-content">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-lg mx-auto"
        >
          <motion.div variants={fadeUpVariant} className="login-header-text">
            <h1>Welcome Back</h1>
            <p>Please enter your details to sign in.</p>
          </motion.div>

          <motion.form variants={fadeUpVariant} onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <Link to="#" className="forgot-link">Forgot?</Link>
              </div>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>


          </motion.form>

          <motion.div variants={fadeUpVariant} className="social-login">
            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>
            <div className="social-buttons">
              <button type="button" className="btn-social google">
                <FaGoogle className="social-icon" style={{color: '#EA4335'}} />
                Google
              </button>
              <button type="button" className="btn-social apple">
                <FaApple className="social-icon" style={{fontSize: '20px'}} />
                Apple
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register Now</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
