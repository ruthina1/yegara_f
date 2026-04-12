import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="ytsc-footer">
      {/* ── CTA Band ── */}
      <div className="footer-cta">
        <div className="ytsc-container">
          <div className="footer-cta__inner">
            <div className="footer-cta__text">
               <h3>
                Ready to Build <br />
                <span style={{ color: '#F47920' }}>Lasting Impact?</span>
              </h3>
              <p>Partner with YTSC to unlock sustainable growth opportunities across Ethiopia and Africa.</p>
            </div>
            <div className="footer-cta__actions">
              <Link to="/contact" className="ytsc-btn-primary">Get in Touch</Link>
              <Link to="/services" className="ytsc-btn-white">Our Services</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="footer-main">
        <div className="ytsc-container-wide">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-brand">
              <div className="footer-brand__logo">
                <img src={logo} alt="YTSC" />
                <div>
                  <div className="footer-brand__name">YEGARA</div>
                  <div className="footer-brand__sub">Trading Share Company</div>
                </div>
              </div>
              <p className="footer-brand__desc">
                Ethiopia's first national business, social, and development hub. 
                Operating at the intersection of private enterprise and nonprofit collaboration 
                since 2022.
              </p>
              <div className="footer-brand__tagline">
                "Trusted Partner for Lasting Impact!"
              </div>
              <div className="footer-social">
                <a href="https://www.linkedin.com/company/yegara-trading-share-company-ytsc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col__title">Company</h4>
              <nav className="footer-col__links">
                <Link to="/about">About Us</Link>
                <Link to="/board">Board of Directors</Link>
                <Link to="/services">Services & Programs</Link>
                <Link to="/news">News & Updates</Link>
                <Link to="/resources">Resources</Link>
              </nav>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h4 className="footer-col__title">Our Pillars</h4>
              <nav className="footer-col__links">
                <Link to="/services#capacity">Capacity Building</Link>
                <Link to="/services#finance">Impact Finance</Link>
                <Link to="/services#bds">Business Development</Link>
                <Link to="/services#research">Research & Innovation</Link>
                <Link to="/services#partnership">Partnership Facilitation</Link>
              </nav>
            </div>

            {/* Column 4: Stakeholders */}
            <div className="footer-col">
              <h4 className="footer-col__title">Stakeholders</h4>
              <nav className="footer-col__links">
                <Link to="/login">Shareholder Portal</Link>
                <Link to="/handbook">Digital Handbook</Link>
                <Link to="/resources">Reports & Documents</Link>
                <Link to="/contact">Inquiries</Link>
              </nav>
            </div>

            {/* Column 5: Contact */}
            <div className="footer-col">
              <h4 className="footer-col__title">Contact</h4>
              <div className="footer-contact">
                <div className="footer-contact__item">
                  <HiLocationMarker className="footer-contact__icon" />
                  <div>
                    <p>22 Mazorya, Getahun Beshah Bldg</p>
                    <p>6th Floor, Woreda 04</p>
                    <p>Bole Sub City, Addis Ababa</p>
                  </div>
                </div>
                <div className="footer-contact__item">
                  <HiMail className="footer-contact__icon" />
                  <a href="mailto:yegaratradingsc@yegarasc.com">yegaratradingsc@yegarasc.com</a>
                </div>
                <div className="footer-contact__item">
                  <HiPhone className="footer-contact__icon" />
                  <a href="tel:+251900473707">+251 900 473 707</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="ytsc-container-wide">
          <div className="footer-bottom__inner">
            <p>© {new Date().getFullYear()} Yegara Trading Share Company. All rights reserved.</p>
            <div className="footer-bottom__links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Massive Background Brand Text (Botronics-style) ── */}
      <div className="footer-huge-background">Yegara</div>
    </footer>
  );
};

export default Footer;
