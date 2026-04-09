import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUserGroup, HiLightBulb, HiGlobeAlt, HiShieldCheck, HiLightningBolt, HiBadgeCheck, HiTrendingUp, HiAcademicCap } from 'react-icons/hi';
import Footer from '../components/Footer';
import './About.css';

const fadeIn = (delay = 0): any => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" }
});

const About: React.FC = () => {
  return (
    <div className="about-page">

      {/* ═══════════════════════════════════════════════════
          01 · HERO — Full-screen cinematic opener
         ═══════════════════════════════════════════════════ */}
      <section className="about-hero">
        {/* HERO CONTENT */}

        <div className="about-hero__content">
          <motion.span {...fadeIn()} className="about-hero__label">
            EST. 2022  ·  ADDIS ABABA
          </motion.span>
          <motion.h1 {...fadeIn(0.15)} className="about-hero__title">
            Building <br />
            <em>Bridges.</em>
          </motion.h1>
          <motion.p {...fadeIn(0.3)} className="about-hero__subtitle">
            Ethiopia's pioneering hub where private enterprise meets
            nonprofit innovation to create lasting prosperity.
          </motion.p>
          <motion.div {...fadeIn(0.45)} className="about-hero__scroll-hint">
            <div className="about-hero__scroll-line" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          02 · STORY — Split narrative
         ═══════════════════════════════════════════════════ */}
      <section className="about-story">
        <div className="about-story__container">
          <motion.div {...fadeIn()} className="about-story__left">
            <span className="about-section-label">Our Story</span>
            <h2 className="about-section-title">
              A Vision for <br />
              <span className="text-brand">Africa's Future.</span>
            </h2>
          </motion.div>
          <motion.div {...fadeIn(0.15)} className="about-story__right">
            <p className="about-story__text">
              We believe that Africa's greatest lever for change is its people.
              Yegara Trading Share Company was founded to build the capacity of
              businesses and communities — equipping them with skills, capital access,
              and the networks needed to unlock lasting prosperity.
            </p>
            <p className="about-story__text">
              At the intersection of private enterprise and nonprofit synergy,
              our consortium of Ethiopian professionals is designing solutions to
              bridge the gap between community potential and institutional capital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          03 · IMPACT — Horizontal stat cards
         ═══════════════════════════════════════════════════ */}
      <section className="about-impact">
        <div className="about-impact__container">
          <motion.div {...fadeIn()} className="about-impact__header">
            <span className="about-section-label about-section-label--light">Our Reach</span>
            <h2 className="about-impact__title">
              Measuring <span className="text-brand">Prosperity.</span>
            </h2>
          </motion.div>

          <div className="about-impact__grid">
            {[
              { num: '2022', label: 'Founded', icon: <HiTrendingUp /> },
              { num: '10k+', label: 'Individuals Reached', icon: <HiUserGroup /> },
              { num: '50+', label: 'Enterprises Supported', icon: <HiAcademicCap /> },
              { num: '07', label: 'Service Pillars', icon: <HiLightningBolt /> }
            ].map((stat, i) => (
              <motion.div key={i} {...fadeIn(i * 0.1)} className="about-impact__card">
                <div className="about-impact__card-icon">{stat.icon}</div>
                <h4 className="about-impact__card-num">{stat.num}</h4>
                <p className="about-impact__card-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          04 · FOUNDING — Creative staggered blocks
         ═══════════════════════════════════════════════════ */}
      <section className="about-founding">
        <div className="about-founding__container">
          <motion.div {...fadeIn()} className="about-founding__intro">
            <span className="about-section-label">Our Foundation</span>
            <h2 className="about-section-title">
              Built on <span className="text-brand">Purpose.</span>
            </h2>
            <p className="about-founding__intro-text">
              Our founding consortium is driven by three pillars that shape every decision,
              initiative, and partnership we pursue.
            </p>
          </motion.div>

          <div className="about-founding__cards">
            {[
              { 
                icon: <HiUserGroup />, 
                title: 'Founding Vision', 
                desc: 'A consortium of Ethiopian professionals dedicated to bridging the socio-economic gap at the intersection of private enterprise and nonprofit synergy.',
                accent: 'var(--ytsc-orange)'
              },
              { 
                icon: <HiLightBulb />, 
                title: 'Data-First Culture', 
                desc: 'Our methodology is rooted in rigorous sector analysis, ensuring every initiative has a proven, sustainable pathway before deployment.',
                accent: 'var(--ytsc-orange)'
              },
              { 
                icon: <HiGlobeAlt />, 
                title: 'Systemic Shifts', 
                desc: 'Impact isn\'t about charity. It\'s about equipping the market with tools to self-correct and thrive without external dependency.',
                accent: 'var(--ytsc-orange)'
              }
            ].map((card, i) => (
              <motion.div key={i} {...fadeIn(i * 0.12)} className="about-founding__card">
                <div className="about-founding__card-icon" style={{ color: '#F47920' }}>
                  {card.icon}
                </div>
                <h3 className="about-founding__card-title">{card.title}</h3>
                <p className="about-founding__card-desc">{card.desc}</p>
                <div className="about-founding__card-line" style={{ background: card.accent }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          05 · QUOTE — Cinematic pull quote
         ═══════════════════════════════════════════════════ */}
      <section className="about-quote">
        <div className="about-quote__container">
          <motion.div {...fadeIn()} className="about-quote__content">
            <div className="about-quote__mark">"</div>
            <blockquote className="about-quote__text">
              To become Africa's premier business network,
              empowering businesses and communities for a
              brighter, inclusive future.
            </blockquote>
            <cite className="about-quote__cite">— The Yegara Vision</cite>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          06 · VALUES — Premium horizontal grid
         ═══════════════════════════════════════════════════ */}
      <section className="about-values">
        <div className="about-values__container">
          <motion.div {...fadeIn()} className="about-values__header">
            <span className="about-section-label">Core Values</span>
            <h2 className="about-section-title">
              Our <span className="text-brand">Convictions.</span>
            </h2>
          </motion.div>

          <div className="about-values__grid">
            {[
              { title: 'Collaboration', desc: 'Working together to achieve shared, sustainable success.', icon: <HiUserGroup /> },
              { title: 'Innovation', desc: 'Pioneering solutions that open doors to new opportunities.', icon: <HiLightBulb /> },
              { title: 'Inclusivity', desc: 'Ensuring everyone has a seat at the table and a voice.', icon: <HiGlobeAlt /> },
              { title: 'Trustworthiness', desc: 'Long-lasting relationships anchored in integrity.', icon: <HiShieldCheck /> },
              { title: 'Responsiveness', desc: 'Adapting swiftly to the evolving needs of communities.', icon: <HiLightningBolt /> },
              { title: 'Excellence', desc: 'Pursuing the highest standards in every service.', icon: <HiBadgeCheck /> }
            ].map((v, i) => (
              <motion.div key={i} {...fadeIn(i * 0.08)} className="about-values__card">
                <div className="about-values__card-icon" style={{ color: '#F47920' }}>{v.icon}</div>
                <h3 className="about-values__card-title">{v.title}</h3>
                <p className="about-values__card-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          07 · CTA SPLIT — Expanding panels
         ═══════════════════════════════════════════════════ */}
      <section className="about-cta-split">
        <Link to="/board" className="about-cta-split__panel about-cta-split__panel--light">
          <motion.div {...fadeIn()}>
            <span className="about-cta-split__label">Leadership</span>
            <h2 className="about-cta-split__title">Meet the<br />Board.</h2>
            <span className="about-cta-split__link">View Leadership →</span>
          </motion.div>
        </Link>
        <Link to="/login" className="about-cta-split__panel about-cta-split__panel--brand">
          <motion.div {...fadeIn(0.1)}>
            <span className="about-cta-split__label about-cta-split__label--white">Portal</span>
            <h2 className="about-cta-split__title about-cta-split__title--white">Investor<br />Hub.</h2>
            <span className="about-cta-split__link about-cta-split__link--white">Join Now →</span>
          </motion.div>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;
