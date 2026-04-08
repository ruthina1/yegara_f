import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import logo from '../assets/logo.png';
import './CorporateNav.css';

interface NavLink {
  label: string;
  path: string;
  children?: { label: string; path: string; desc?: string }[];
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'About', 
    path: '/about',
    children: [
      { label: 'Company Profile', path: '/about', desc: 'Our story and identity' },
      { label: 'Vision & Mission', path: '/about#vision', desc: 'Where we are headed' },
      { label: 'Core Values', path: '/about#values', desc: 'What drives us' },
      { label: 'Board of Directors', path: '/board', desc: 'Our leadership team' },
    ]
  },
  { 
    label: 'Services', 
    path: '/services',
    children: [
      { label: 'Capacity Building', path: '/services#capacity', desc: 'Skills & knowledge programs' },
      { label: 'Impact Finance', path: '/services#finance', desc: 'Innovative financial tools' },
      { label: 'Business Development', path: '/services#bds', desc: 'Growth & advisory services' },
      { label: 'Research & Innovation', path: '/services#research', desc: 'Data-driven insights' },
      { label: 'Partnership Facilitation', path: '/services#partnership', desc: 'Strategic alliances' },
    ]
  },
  { label: 'News', path: '/news' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const CorporateNav: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav className={`corp-nav ${scrolled ? 'corp-nav--scrolled' : ''} ${isTransparent ? 'corp-nav--transparent' : ''}`}>
        <div className="corp-nav__inner">
          {/* Logo */}
          <Link to="/" className="corp-nav__logo">
            <img src={logo} alt="Yegara Trading Share Company" />
          </Link>

          {/* Right Side Group (Links + Actions) */}
          <div className="corp-nav__right-group">
            {/* Desktop Nav */}
            <div className="corp-nav__links">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="corp-nav__item"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={link.path} 
                  className={`corp-nav__link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                  {link.children && <HiChevronDown className="corp-nav__chevron" />}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="corp-nav__dropdown">
                    <div className="corp-nav__dropdown-inner">
                      {link.children.map((child) => (
                        <Link key={child.label} to={child.path} className="corp-nav__dropdown-item">
                          <span className="corp-nav__dropdown-label">{child.label}</span>
                          {child.desc && <span className="corp-nav__dropdown-desc">{child.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="corp-nav__actions">
            {user ? (
              <>
                <Link to="/shareholder" className="corp-nav__portal-link">Portal</Link>
                <button onClick={logout} className="corp-nav__btn-logout">Logout</button>
              </>
            ) : (
              <Link to="/login" className="corp-nav__btn-login">
                Shareholder Login
              </Link>
            )}
            
            {/* Mobile Toggle */}
            <button 
              className="corp-nav__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`corp-mobile-menu ${mobileOpen ? 'corp-mobile-menu--open' : ''}`}>
        <div className="corp-mobile-menu__inner">
          {navLinks.map((link) => (
            <div key={link.label} className="corp-mobile-menu__group">
              <Link to={link.path} className="corp-mobile-menu__link">
                {link.label}
              </Link>
              {link.children && (
                <div className="corp-mobile-menu__sub">
                  {link.children.map((child) => (
                    <Link key={child.label} to={child.path} className="corp-mobile-menu__sub-link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="corp-mobile-menu__actions">
            {user ? (
              <>
                <Link to="/shareholder" className="ytsc-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Shareholder Portal
                </Link>
                <button onClick={logout} className="ytsc-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="ytsc-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Shareholder Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump (only on non-home pages) */}
      {!isHome && <div className="corp-nav__spacer" />}
    </>
  );
};

export default CorporateNav;
