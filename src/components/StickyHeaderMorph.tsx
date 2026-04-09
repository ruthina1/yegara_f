import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './CorporateNav.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const StickyHeaderMorph: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';

  // ── Morph ─────────────────────────────────────────────────────────
  const MORPH_END = 400;
  const morphProgress = useTransform(scrollY, [0, MORPH_END], [0, 1]);
  const smooth = useSpring(morphProgress, { stiffness: 100, damping: 30, mass: 1 });

  // Function-based transforms (these actually interpolate correctly)
  // top: 50vh → 45px (center of nav)
  const top = useTransform(smooth, (p: number) =>
    `calc(50vh - (${p} * 50vh) + (${p} * 45px))`
  );
  // fontSize: 18vw → 1.4rem  (function-based so it actually works)
  const fontSize = useTransform(smooth, (p: number) =>
    `clamp(1.4rem, ${18 - p * 16.6}vw, 28vh)`
  );
  // letterSpacing: -0.04em → 0.12em
  const letterSpacing = useTransform(smooth, (p: number) =>
    `${-0.04 + p * 0.16}em`
  );
  // color
  const color = useTransform(smooth, (p: number) => {
    const r = Math.round(0 + p * 27);
    const g = Math.round(0 + p * 58);
    const b = Math.round(0 + p * 92);
    return `rgb(${r},${g},${b})`;
  });

  // Fade out hero sub-elements early
  const heroFade = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <>
      {/* ── The morphing YEGARA text ─────────────────────────────────── */}
      {isHome && (
        <motion.div
          className="morph-text-layer"
          style={{ top, zIndex: 1101 }}
        >
          <motion.h1
            style={{ fontSize, letterSpacing, color }}
            className="morph-text"
          >
            YEGARA
          </motion.h1>
        </motion.div>
      )}

      {/* ── Nav Bar ──────────────────────────────────────────────────── */}
      <nav className={`corp-nav ${scrolled ? 'corp-nav--scrolled' : ''} ${isHome && !scrolled ? 'corp-nav--transparent-white' : ''}`}>
        <div className="corp-nav__inner">
          {/* Left: Logo */}
          <Link to="/" className="corp-nav__logo">
            <img src={logo} alt="YTSC" />
          </Link>

          {/* Center: Static YEGARA for non-home pages */}
          {!isHome && (
            <span className="corp-nav__brand-center">YEGARA</span>
          )}
          {/* On home, center is reserved for the morphing text */}
          {isHome && <span className="corp-nav__brand-center-placeholder" />}

          {/* Right: Nav links animate out to the right, burger animates in */}
          <div className="corp-nav__right">
            {/* Desktop Links (managed by CSS for visibility) */}
            <div className="corp-nav__links-row">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.path}
                    className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
              <div>
                {user ? (
                  <button onClick={logout} className="corp-nav__action-btn">Logout</button>
                ) : (
                  <Link to="/login" className="corp-nav__action-btn">Portal</Link>
                )}
              </div>
            </div>

            {/* Mobile Toggle (managed by CSS for visibility) */}
            <button
              className="corp-nav__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── White Hero (Home only) ───────────────────────────────────── */}
      {isHome && (
        <section className="white-hero">
          <motion.span className="white-hero__subtitle" style={{ opacity: heroFade }}>
            TRADING SHARE COMPANY
          </motion.span>

          <motion.div className="white-hero__scroll" style={{ opacity: heroFade }}>
            <div className="white-hero__scroll-line" />
            <span>EXPLORE</span>
          </motion.div>
        </section>
      )}

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div className={`corp-mobile-menu ${mobileOpen ? 'corp-mobile-menu--open' : ''}`}>
        <div className="corp-mobile-menu__inner">
          <Link to="/" className="corp-mobile-menu__link">Home</Link>
          <Link to="/about" className="corp-mobile-menu__link">About</Link>
          <Link to="/services" className="corp-mobile-menu__link">Services</Link>
          <Link to="/news" className="corp-mobile-menu__link">News</Link>
          <Link to="/contact" className="corp-mobile-menu__link">Contact</Link>
          
          {user ? (
            <button 
              onClick={logout} 
              className="corp-mobile-menu__link" 
              style={{ color: 'var(--ytsc-orange)', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="corp-mobile-menu__link" 
              style={{ color: 'var(--ytsc-orange)' }}
            >
              Portal
            </Link>
          )}
        </div>
      </div>

      {/* Spacer for non-home pages */}
      {!isHome && <div style={{ height: 90 }} />}
    </>
  );
};

export default StickyHeaderMorph;
