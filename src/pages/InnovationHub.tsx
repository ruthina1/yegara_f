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
    gridClass: 'bento--wide-1 color-accent-1',
    description: 'Transforming agricultural systems through precision technology and sustainable infrastructure.',
    icon: <HiGlobe />,
    detailedDesc: 'Our Agri-Tech hub is at the forefront of Ethiopia\'s agricultural transformation. We integrate IoT for soil health monitoring, AI-driven supply chain optimization, and sustainable irrigation frameworks to empower the next generation of climate-smart farmers.',
    meta: ['Precision Farming', 'Climate-Smart Ag', 'Value Chain Tech']
  },
  {
    id: 'edtech',
    letter: 'B',
    title: 'EdTech',
    gridClass: 'bento--tall-1',
    description: 'Modernizing learning ecosystems through digital tools and adaptive pedagogy.',
    icon: <HiAcademicCap />,
    highlights: ['Adaptive Learning', 'Teacher Portals', 'Digital Literacy'],
    detailedDesc: 'Revolutionizing the educational landscape by bridging the digital divide. We develop offline-first learning solutions, interactive curriculum platforms, and teacher capacity-building tools designed for the diverse needs of Ethiopian classrooms.',
    meta: ['LMS Development', 'Offline Learning', 'Curriculum Innovation']
  },
  {
    id: 'innovation-tech',
    letter: 'C',
    title: 'Innovation Tech',
    gridClass: 'bento--box-1',
    description: 'Specialized infrastructure for scaling cutting-edge R&D and engineering solutions.',
    icon: <HiCog />,
    detailedDesc: 'Providing the hard technical foundation for hardware and software R&D. Our labs offer specialized equipment and prototyping spaces for tech startups moving from concept to industrial-grade products.',
    meta: ['R&D Labs', 'Prototyping', 'Tech Infrastructure']
  },
  {
    id: 'impact',
    letter: 'D',
    title: 'Impact',
    gridClass: 'bento--box-2',
    description: 'Nurturing social entrepreneurs working on sustainability and communal well-being.',
    icon: <HiHeart />,
    detailedDesc: 'A community-driven space for ventures that prioritize social return. We support projects in health accessibility, environmental conservation, and social equity through collaborative networks.',
    meta: ['Social Equity', 'Conservation', 'Health Tech']
  },
  {
    id: 'entrepreneurship',
    letter: 'E',
    title: 'Founders',
    gridClass: 'bento--tall-2 color-accent-2',
    description: 'Comprehensive scaffolding for startup founders navigating complex growth challenges.',
    icon: <HiUserGroup />,
    highlights: ['Incubation Programs', 'Investor Matching', 'Legal Scaffolding'],
    detailedDesc: 'The ultimate sanctuary for entrepreneurs. We provide the strategic guidance, legal support, and capital access necessary to navigate the "valley of death" and scale startups into institutional enterprises.',
    meta: ['VC Networking', 'Market Entry', 'Strategic Mentorship']
  },
  {
    id: 'business',
    letter: 'F',
    title: 'Business Growth',
    gridClass: 'bento--wide-2',
    description: 'Optimizing strategy and operational models for high-potential growth ventures.',
    icon: <HiChartBar />,
    detailedDesc: 'Nurturing the scaling of massive enterprises. We help founders refine business models, optimize operational strategies, and launch to new international markets with structural confidence.',
    meta: ['Scale-up Strategy', 'Operational Excellence', 'Market Expansion']
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

          <div className="ihub-bento__grid">
            {bentoHubs.map((hub, i) => (
              <motion.div 
                {...fadeIn(i * 0.1)} 
                key={hub.id} 
                className={`ihub-bento__card ${hub.gridClass}`}
                onClick={() => openHub(hub)}
              >
                {/* Visual Watermark */}
                <div className="ihub-bento__watermark">{hub.letter}</div>

                <div className="ihub-bento__icon-wrapper">
                  {hub.icon}
                </div>

                {/* Fill B and E gaps with creative highlights */}
                {hub.highlights && (
                   <div className="ihub-bento__highlights">
                     {hub.highlights.map(h => (
                        <div key={h} className="ihub-bento__highlight-item">
                           <div className="ihub-bento__highlight-dot" />
                           {h}
                        </div>
                     ))}
                   </div>
                )}

                <div className="ihub-bento__info">
                  <h3 className="ihub-bento__card-title">{hub.title}</h3>
                  <p className="ihub-bento__card-desc">{hub.description}</p>
                </div>

                {/* Animated Arrow - Now triggers the "Quick View" */}
                <div className="ihub-bento__arrow">
                  <HiArrowRight />
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
                   <Link to="/contact" className="ihub-portal__cta" onClick={closeHub}>
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
