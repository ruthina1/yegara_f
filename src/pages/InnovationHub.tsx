import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiGlobe,
  HiAcademicCap,
  HiCog,
  HiHeart,
  HiUserGroup,
  HiChartBar,
  HiArrowRight,
  HiSparkles,
  HiX,
  HiCheckCircle
} from 'react-icons/hi';
import Footer from '../components/Footer';
import './InnovationHub.css';

/* ── Bento Grid Data ─────────────────────────────────────────────────────── */
const bentoHubs = [
  {
    id: 'agritech',
    letter: 'A',
    title: 'Agri-Tech',
    description: 'Transforming agricultural systems through precision technology and sustainable infrastructure.',
    icon: <HiGlobe />,
    detailedDesc: 'Our Agri-Tech hub is at the forefront of Ethiopia\'s agricultural transformation. We integrate IoT for soil health monitoring, AI-driven supply chain optimization, and sustainable irrigation frameworks to empower the next generation of climate-smart farmers.',
    meta: ['Precision Farming', 'Climate-Smart Ag', 'Value Chain Tech'],
    color: '#0A1628',
    textColor: '#FFFFFF',
    accent: '#F47920'
  },
  {
    id: 'edtech',
    letter: 'B',
    title: 'EdTech',
    description: 'Modernizing learning ecosystems through digital tools and adaptive pedagogy.',
    icon: <HiAcademicCap />,
    detailedDesc: 'Revolutionizing the educational landscape by bridging the digital divide. We develop offline-first learning solutions, interactive curriculum platforms, and teacher capacity-building tools designed for the diverse needs of Ethiopian classrooms.',
    meta: ['LMS Development', 'Offline Learning', 'Curriculum Innovation'],
    color: '#F47920',
    textColor: '#FFFFFF',
    accent: '#0A1628'
  },
  {
    id: 'innovation-tech',
    letter: 'C',
    title: 'Innovation Tech',
    description: 'Specialized infrastructure for scaling cutting-edge R&D and engineering solutions.',
    icon: <HiCog />,
    detailedDesc: 'Providing the hard technical foundation for hardware and software R&D. Our labs offer specialized equipment and prototyping spaces for tech startups moving from concept to industrial-grade products.',
    meta: ['R&D Labs', 'Prototyping', 'Tech Infrastructure'],
    color: '#F8F9FC',
    textColor: '#1B3A5C',
    accent: '#F47920'
  },
  {
    id: 'impact',
    letter: 'D',
    title: 'Impact',
    description: 'Nurturing social entrepreneurs working on sustainability and communal well-being.',
    icon: <HiHeart />,
    detailedDesc: 'A community-driven space for ventures that prioritize social return. We support projects in health accessibility, environmental conservation, and social equity through collaborative networks.',
    meta: ['Social Equity', 'Conservation', 'Health Tech'],
    color: '#1B3A5C',
    textColor: '#FFFFFF',
    accent: '#F47920'
  },
  {
    id: 'entrepreneurship',
    letter: 'E',
    title: 'Founders',
    description: 'Comprehensive scaffolding for startup founders navigating complex growth challenges.',
    icon: <HiUserGroup />,
    detailedDesc: 'The ultimate sanctuary for entrepreneurs. We provide the strategic guidance, legal support, and capital access necessary to navigate the "valley of death" and scale startups into institutional enterprises.',
    meta: ['VC Networking', 'Market Entry', 'Strategic Mentorship'],
    color: '#FFFFFF',
    textColor: '#0A1628',
    accent: '#F47920'
  },
  {
    id: 'business',
    letter: 'F',
    title: 'Business Growth',
    description: 'Optimizing strategy and operational models for high-potential growth ventures.',
    icon: <HiChartBar />,
    detailedDesc: 'Nurturing the scaling of massive enterprises. We help founders refine business models, optimize operational strategies, and launch to new international markets with structural confidence.',
    meta: ['Scale-up Strategy', 'Operational Excellence', 'Market Expansion'],
    color: '#0F2440',
    textColor: '#FFFFFF',
    accent: '#F47920'
  },
];

const fadeIn = (delay = 0): any => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
});

const InnovationHub: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<any>(null);

  const openHub = (hub: any) => {
    setSelectedHub(hub);
    document.body.style.overflow = 'hidden';
  };

  const closeHub = () => {
    setSelectedHub(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="ihub-page">
      {/* ── HERO ── */}
      <section className="ihub-hero">
        <div className="ihub-hero__content">
          <motion.div {...fadeIn()}>
            <div className="ihub-hero__badge">
              <HiSparkles className="ihub-hero__badge-icon" />
              Innovation Ecosystem
            </div>
          </motion.div>

          <motion.h1 {...fadeIn(0.15)} className="ihub-hero__title">
            Innovation <br />
            <em>Hubs.</em>
          </motion.h1>

          <motion.p {...fadeIn(0.3)} className="ihub-hero__subtitle">
            Collaborative ecosystems designed to support the commercialization of new ideas. 
            We bring together leading entrepreneurs, startups, investors, and researchers.
          </motion.p>

          <motion.div {...fadeIn(0.45)} className="ihub-hero__stats">
            <div className="ihub-hero__stat">
              <span className="ihub-hero__stat-number">6</span>
              <span className="ihub-hero__stat-label">Specialized Hubs</span>
            </div>
            <div className="ihub-hero__stat-divider" />
            <div className="ihub-hero__stat">
              <span className="ihub-hero__stat-number">2022</span>
              <span className="ihub-hero__stat-label">Established</span>
            </div>
            <div className="ihub-hero__stat-divider" />
            <div className="ihub-hero__stat">
              <span className="ihub-hero__stat-number">1st</span>
              <span className="ihub-hero__stat-label">In Ethiopia</span>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeIn(0.8)} className="ihub-hero__scroll">
          <span className="ihub-hero__scroll-text">Discover Areas</span>
          <div className="ihub-hero__scroll-line" />
        </motion.div>
      </section>

      {/* ── INTERACTIVE BENTO GRID ── */}
      <section className="ihub-bento">
        <div className="ihub-bento__container">
          <motion.div {...fadeIn()} className="ihub-bento__header">
            <span className="ihub-bento__label">Specialized Areas</span>
            <h2 className="ihub-bento__title">
              Ecosystem <em>Matrix.</em>
            </h2>
            <p className="ihub-bento__desc">
              Six interconnected ecosystems structurally integrated to scale up 
              foremost innovation engine. Select a hub below.
            </p>
          </motion.div>

          <div className="ihub-services-list">
            {bentoHubs.map((hub, i) => (
              <motion.div 
                {...fadeIn(i * 0.1)} 
                key={hub.id} 
                className="ihub-service-card"
                style={{ backgroundColor: hub.color, color: hub.textColor }}
                onClick={() => openHub(hub)}
              >
                <div 
                  className="ihub-service-card__icon-box"
                  style={{ backgroundColor: hub.textColor, color: hub.color }}
                >
                  {hub.icon}
                  <div className="ihub-service-card__letter" style={{ color: hub.textColor }}>{hub.letter}</div>
                </div>

                <div className="ihub-service-card__content">
                  <div className="ihub-service-card__header">
                    <h3 className="ihub-service-card__title" style={{ color: hub.textColor }}>{hub.title}</h3>
                    <div className="ihub-service-card__tags">
                      {hub.meta?.map(m => (
                        <span 
                          key={m} 
                          className="ihub-service-card__tag"
                          style={{ backgroundColor: hub.textColor + '22', color: hub.textColor }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="ihub-service-card__description" style={{ color: hub.textColor, opacity: 0.8 }}>
                    {hub.description}
                  </p>
                  
                  <div className="ihub-service-card__footer">
                    <span 
                      className="ihub-service-card__explore"
                      style={{ color: hub.textColor }}
                    >
                      Explore Program
                    </span>
                    <HiArrowRight 
                      className="ihub-service-card__arrow" 
                      style={{ color: hub.accent }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC PORTAL MODAL ── */}
      <AnimatePresence>
        {selectedHub && (
          <div className="ihub-portal">
            <motion.div 
              className="ihub-portal__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHub}
            />
            
            <motion.div 
              className="ihub-portal__window"
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ihub-portal__header">
                <div className="ihub-portal__title-group">
                  <div className="ihub-portal__letter">{selectedHub.letter}</div>
                  <h2 className="ihub-portal__title">{selectedHub.title}</h2>
                </div>
                <button className="ihub-portal__close" onClick={closeHub}>
                  <HiX />
                </button>
              </div>

              <div className="ihub-portal__body">
                 <div className="ihub-portal__left">
                   <p className="ihub-portal__main-text">
                      {selectedHub.detailedDesc}
                   </p>
                   <Link to="/login" className="ihub-portal__cta" onClick={closeHub}>
                      Partner With Us <HiArrowRight />
                   </Link>
                 </div>

                 <div className="ihub-portal__sidebar">
                    <div className="ihub-portal__meta-item">
                       <h4>Key Expertise</h4>
                       <div className="ihub-portal__meta-list">
                          {selectedHub.meta?.map((m: string) => (
                             <div key={m} className="ihub-portal__meta-li">
                                <HiCheckCircle style={{color: '#F47920'}} />
                                {m}
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="ihub-portal__meta-item">
                       <h4>Hub Status</h4>
                       <p style={{fontSize: '0.9rem', color: '#64748B', fontWeight: 500}}>
                          Operational - accepting applications from high-growth startups and strategic partners.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default InnovationHub;
