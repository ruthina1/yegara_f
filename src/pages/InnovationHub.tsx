import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiGlobe,
  HiAcademicCap,
  HiCog,
  HiHeart,
  HiUserGroup,
  HiChartBar,
  HiArrowRight,
  HiSparkles
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
    description: 'Focuses on agricultural technologies, from precision farming to sustainable supply chains. We empower entrepreneurs to revolutionize food systems.',
    icon: <HiGlobe />,
  },
  {
    id: 'edtech',
    letter: 'B',
    title: 'EdTech',
    gridClass: 'bento--tall-1',
    description: 'Dedicated to supporting Educational Technology solutions to enhance learning, teaching, and education administration.',
    icon: <HiAcademicCap />,
  },
  {
    id: 'innovation-tech',
    letter: 'C',
    title: 'Innovation Tech',
    gridClass: 'bento--box-1',
    description: 'Providing specialized infrastructure and laboratories for scaling cutting-edge R&D solutions.',
    icon: <HiCog />,
  },
  {
    id: 'impact',
    letter: 'D',
    title: 'Impact',
    gridClass: 'bento--box-2',
    description: 'Co-working networks dedicated to social focus, fostering impactful projects in health, tech, and environmental sustainability.',
    icon: <HiHeart />,
  },
  {
    id: 'entrepreneurship',
    letter: 'E',
    title: 'Founders',
    gridClass: 'bento--tall-2 color-accent-2',
    description: 'Comprehensive support systems for founders to navigate complex startup challenges through mentorship and capital networks.',
    icon: <HiUserGroup />,
  },
  {
    id: 'business',
    letter: 'F',
    title: 'Business Growth',
    gridClass: 'bento--wide-2',
    description: 'Nurtures the growth and scaling of massive enterprises, helping founders refine business models, optimize strategies, and launch to new markets.',
    icon: <HiChartBar />,
  },
];

const fadeIn = (delay = 0): any => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
});

const InnovationHub: React.FC = () => {
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
              Africa's foremost innovation engine. Select a hub below.
            </p>
          </motion.div>

          <div className="ihub-bento__grid">
            {bentoHubs.map((hub, i) => (
              <motion.div 
                {...fadeIn(i * 0.1)} 
                key={hub.id} 
                className={`ihub-bento__card ${hub.gridClass}`}
              >
                {/* Visual Watermark */}
                <div className="ihub-bento__watermark">{hub.letter}</div>

                <div className="ihub-bento__icon-wrapper">
                  {hub.icon}
                </div>

                <div className="ihub-bento__info">
                  <h3 className="ihub-bento__card-title">{hub.title}</h3>
                  <p className="ihub-bento__card-desc">{hub.description}</p>
                </div>

                {/* Animated Arrow */}
                <Link to="/contact" className="ihub-bento__arrow">
                  <HiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOLD CTA ── */}
      <section className="ihub-cta">
        <div className="ihub-cta__content">
          <motion.div {...fadeIn()}>
            <HiSparkles className="ihub-cta__icon" />
            <h2 className="ihub-cta__title">
              Ready to accelerate your <span>impact?</span>
            </h2>
            <p className="ihub-cta__text">
              Whether you are an institutional investor navigating emerging markets, or a scaling 
              enterprise requiring strategic growth scaffolding—Yegara is the bridge.
            </p>
            <div className="ihub-cta__buttons">
              <Link to="/login" className="ihub-cta__btn ihub-cta__btn--primary">
                Join The Portal <HiArrowRight />
              </Link>
              <Link to="/contact" className="ihub-cta__btn ihub-cta__btn--secondary">
                Request Meeting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationHub;
