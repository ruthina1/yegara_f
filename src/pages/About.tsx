import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollY } = useScroll();

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
      <section className="about-story about-story--creative">
        <div className="about-story__container">
          <motion.div 
            className="about-story__left"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="about-story__header-group">
              <motion.span 
                variants={{
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 }
                }}
                className="about-section-label"
              >
                Our Story
              </motion.span>
              <h2 className="about-section-title about-section-title--kinetic">
                {["A", "Vision", "for"].map((word, i) => (
                  <motion.span 
                    key={i}
                    custom={i}
                    variants={{
                      initial: { opacity: 0, y: 30, rotate: 2 },
                      animate: (i: number) => ({
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                      })
                    }}
                    className="word-wrap"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
                <br />
                <motion.span 
                  className="text-brand text-brand--reveal"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Africa's Future.
                </motion.span>
              </h2>
            </div>
            
            <div className="about-story__visual-anchor">
              <div className="about-story__line-grow" />
              <div className="about-story__dot-pulse" />
            </div>
          </motion.div>

          <motion.div 
            className="about-story__right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="about-story__text-block">
              <p className="about-story__text about-story__text--lead">
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
            </div>
            
            <div className="about-story__signature">
              <span className="signature-line" />
              <span className="signature-text">Est. 2022</span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Background SVG for creativity */}
        <div className="about-story__bg-graphic">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50"
              fill="none"
              stroke="rgba(244, 121, 32, 0.08)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          03 · IMPACT — Horizontal stat cards
         ═══════════════════════════════════════════════════ */}
      <section className="about-impact about-impact--schematic">
        <div className="about-impact__container">
          <motion.div {...fadeIn()} className="about-impact__header">
            <span className="about-section-label">Our Metrics</span>
            <h2 className="about-impact__title">
              Quantifying <br /> <span className="text-brand">Impact.</span>
            </h2>
          </motion.div>

          <div className="about-impact__schematic">
            {/* SVG Background Lines */}
            <svg className="schematic-lines" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <motion.path 
                d="M150,400 L500,100 L850,400" 
                fill="none" 
                stroke="rgba(244, 121, 32, 0.2)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path 
                d="M500,100 L500,450" 
                fill="none" 
                stroke="rgba(244, 121, 32, 0.15)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Metric Nodes */}
            <div className="schematic-node node--center">
              <motion.div 
                style={{ y: useTransform(scrollY, [1500, 2500], [0, -40]) }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="node-num node-num--hero">6k+</span>
                <span className="node-label">Individuals Reached</span>
              </motion.div>
            </div>

            <div className="schematic-node node--right">
              <motion.div 
                style={{ y: useTransform(scrollY, [1500, 2500], [0, 20]) }}
                {...fadeIn(0.3)}
              >
                <span className="node-num">50+</span>
                <span className="node-label">Enterprises Supported</span>
              </motion.div>
            </div>

            <div className="schematic-node node--left">
              <motion.div 
                style={{ y: useTransform(scrollY, [1500, 2500], [0, 20]) }}
                {...fadeIn(0.2)}
              >
                <span className="node-num">2022</span>
                <span className="node-label">Founded</span>
              </motion.div>
            </div>

            <div className="schematic-node node--bottom">
              <motion.div {...fadeIn(0.5)}>
                <span className="node-num">07</span>
                <span className="node-label">Service Pillars</span>
              </motion.div>
            </div>
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
          06 · VALUES — Vertical Narrative Stack
         ═══════════════════════════════════════════════════ */}
      <section className="about-values about-values--creative">
        <div className="about-values__container">
          <motion.div 
            className="about-values__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="about-section-label">Core Values</span>
            <h2 className="about-section-title">
              Our <span className="text-brand">Convictions.</span>
            </h2>
          </motion.div>

          <div className="about-values__constellation">
            {/* Ambient Orbs */}
            <div className="value-orb value-orb--1" />
            <div className="value-orb value-orb--2" />
            
            {/* Vertical Connecting Line */}
            <div className="about-values__vertical-line" />
            
            <div className="about-values__grid about-values__grid--vertical-stagger">
              {[
                { title: 'Collaboration', desc: 'Working together to achieve shared, sustainable success.', icon: <HiUserGroup />, index: '01' },
                { title: 'Innovation', desc: 'Pioneering solutions that open doors to new opportunities.', icon: <HiLightBulb />, index: '02' },
                { title: 'Inclusivity', desc: 'Ensuring everyone has a seat at the table and a voice.', icon: <HiGlobeAlt />, index: '03' },
                { title: 'Trustworthiness', desc: 'Long-lasting relationships anchored in integrity.', icon: <HiShieldCheck />, index: '04' },
                { title: 'Responsiveness', desc: 'Adapting swiftly to the evolving needs of communities.', icon: <HiLightningBolt />, index: '05' },
                { title: 'Excellence', desc: 'Pursuing the highest standards in every service.', icon: <HiBadgeCheck />, index: '06' }
              ].map((v, i) => (
                <motion.div 
                  key={i} 
                  className="about-values__card about-values__card--organic-vertical"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="v-card__content">
                    <div className="v-card__head">
                      <span className="v-card__index">{v.index}</span>
                      <div className="v-card__icon">{v.icon}</div>
                    </div>
                    <h3 className="v-card__title">{v.title}</h3>
                    <p className="v-card__desc">{v.desc}</p>
                    <div className="v-card__accent" />
                  </div>
                </motion.div>
              ))}
            </div>
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
