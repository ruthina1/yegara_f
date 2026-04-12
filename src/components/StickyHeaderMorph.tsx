import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './CorporateNav.css';

const leftNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
];

const rightNavLinks = [
  { label: 'Innovation Hub', path: '/innovation-hub' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const allNavLinks = [...leftNavLinks, ...rightNavLinks];

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
    // Keep it solid Brand Blue (#1B3A5C) throughout the morph
    return `rgb(27, 58, 92)`;
  });

  // ── Split‑nav transforms (home only) ─────────────────────────────
  // Left group: starts invisible & pushed right (off), slides into position
  const leftGroupOpacity = useTransform(smooth, [0.6, 1], [0, 1]);
  const leftGroupX = useTransform(smooth, [0.6, 1], [60, 0]);

  // Right group: starts pushed fully right, then slides in from the right
  const rightGroupOpacity = useTransform(smooth, [0.6, 1], [0, 1]);
  const rightGroupX = useTransform(smooth, [0.6, 1], [-60, 0]);

  // All-right row (the initial single row of links on the right): fades OUT as split happens
  const allRightOpacity = useTransform(smooth, [0.4, 0.7], [1, 0]);

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
        <div className={`corp-nav__inner ${isHome ? 'corp-nav__inner--home' : ''}`}>
          {/* Left: Logo */}
          <Link to="/" className="corp-nav__logo">
            <img src={logo} alt="YTSC" />
          </Link>

          {/* ── HOME PAGE: Split layout ── */}
          {isHome && (
            <>
              {/* LEFT group appears when scrolled (positioned after logo) */}
              <motion.div
                className="corp-nav__split-left"
                style={{ opacity: leftGroupOpacity, x: leftGroupX }}
              >
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>

              {/* Center placeholder for morphing YEGARA text */}
              <span className="corp-nav__brand-center-placeholder" />

              {/* RIGHT group appears when scrolled */}
              <motion.div
                className="corp-nav__split-right"
                style={{ opacity: rightGroupOpacity, x: rightGroupX }}
              >
                {rightNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button onClick={logout} className="corp-nav__action-btn">Logout</button>
                ) : (
                  <Link to="/login" className="corp-nav__action-btn">Portal</Link>
                )}
              </motion.div>

              {/* Initial all-right row: visible at top, fades out as split takes over */}
              <motion.div
                className="corp-nav__all-right"
                style={{ opacity: allRightOpacity }}
              >
                <div className="corp-nav__links-row">
                  {allNavLinks.map((link) => (
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
              </motion.div>
            </>
          )}

          {/* ── NON-HOME PAGES: Standard centered layout ── */}
          {!isHome && (
            <>
              {/* Left group */}
              <div className="corp-nav__split-left corp-nav__split-left--static">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <span className="corp-nav__brand-center">YEGARA</span>

              {/* Right group */}
              <div className="corp-nav__split-right corp-nav__split-right--static">
                {rightNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button onClick={logout} className="corp-nav__action-btn">Logout</button>
                ) : (
                  <Link to="/login" className="corp-nav__action-btn">Portal</Link>
                )}
              </div>
            </>
          )}

          {/* Mobile Toggle (managed by CSS for visibility) */}
          <button
            className="corp-nav__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
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
          <Link to="/innovation-hub" className="corp-mobile-menu__link">Innovation Hub</Link>
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
