import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiArrowRight, HiAcademicCap, HiCurrencyDollar, HiChartBar, HiLightBulb, HiUserGroup } from 'react-icons/hi';
import Footer from '../components/Footer';
import heroBg from '../assets/hero_bg.png';
import missionVisual from '../assets/mission_visual.png';
import valuesVisual from '../assets/values_visual.png';
import milestonesVisual from '../assets/milestones_visual.png';
import ContactSection from '../components/ContactSection';
import CurtainSection from '../components/CurtainSection';
import './Home.css';

const fadeUpVariant: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const pillarVariant: any = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home: React.FC = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: rawTreeProgress } = useScroll({
    target: treeRef,
    offset: ["start center", "end end"]
  });
  
  const smoothTreeProgress = useSpring(rawTreeProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const treeLineHeight = useTransform(smoothTreeProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="home-page overflow-hidden">
      {/* Hero Section Parallax */}
      <section className="ytsc-hero-content-reveal relative h-screen w-full flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            scale: 1.1
          }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="ytsc-container relative z-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="reveal-content"
          >
            <motion.span variants={fadeUpVariant} className="ytsc-label mb-6 inline-block" style={{ color: 'rgba(244, 121, 32, 0.9)' }}>
              Since 2022
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="ytsc-heading-lg text-white mb-8">
              Trusted Partner for <br />
              <span style={{ color: '#F47920' }}>Lasting Impact.</span>
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="ytsc-body text-white mb-10 max-w-2xl" style={{ opacity: 0.85 }}>
              Ethiopia's first national business, social, and development hub operating at the intersection of private enterprise and nonprofit collaboration.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex mt-12">
              <div className="flex flex-row shadow-[0_20px_50px_rgba(244,121,32,0.3)] overflow-hidden rounded-sm">
                <Link 
                  to="/about" 
                  style={{ backgroundColor: '#F47920', color: '#ffffff' }} 
                  className="px-12 py-6 min-w-[240px] text-center font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#e06c1a] transition-all duration-300 flex items-center justify-center"
                >
                  Our Story
                </Link>
                <Link 
                  to="/services" 
                  style={{ backgroundColor: '#ffffff', color: '#0A1628' }} 
                  className="px-12 py-6 min-w-[240px] text-center font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center border-l border-gray-100"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CurtainSection removed */}

      {/* Mission Section */}
      <section id="intro-section" className="home-mission py-24">
        <div className="ytsc-container-wide">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="home-mission__hero"
          >
            <div className="home-mission__left">
              <motion.span variants={fadeUpVariant} className="home-mission__label">Vision &amp; Mission</motion.span>
              <motion.h2 variants={fadeUpVariant} className="home-mission__heading">
                Empowering Africa's<br />
                <span style={{ color: '#F47920' }}>Future. Together.</span>
              </motion.h2>
              <motion.div variants={fadeUpVariant}>
                <Link to="/about" className="home-mission__cta">Discover Our Story</Link>
              </motion.div>
            </div>
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }} 
              className="home-mission__right"
            >
              <img src={missionVisual} alt="Mission" className="home-mission__visual rounded-3xl shadow-2xl" />
            </motion.div>
          </motion.div>

          {/* Intro Body */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="home-mission__body mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              We believe that Africa's greatest lever for change is its people. Yegara Trading Share Company was founded to build the capacity of businesses and communities — equipping them with skills, capital access, and the networks needed to unlock lasting prosperity.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              At Yegara, we imagine an Ethiopia where businesses are resilient, communities are empowered, and development is sustainable. By catalyzing collaboration between private enterprise, nonprofits, and government, we bridge vision and impact.
            </motion.p>
          </motion.div>

          <div className="home-mission__divider my-24 h-px bg-gray-200"></div>

          {/* Values Section */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="home-mission__hero home-mission__hero--mirrored flex flex-col-reverse md:flex-row gap-12"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }} 
              className="home-mission__right flex-1"
            >
              <img src={valuesVisual} alt="Values" className="home-mission__visual rounded-3xl shadow-2xl" />
            </motion.div>
            <div className="home-mission__left flex-1 flex flex-col justify-center">
              <motion.span variants={fadeUpVariant} className="home-mission__label">Our Core Values</motion.span>
              <motion.h2 variants={fadeUpVariant} className="home-mission__heading">
                Excellence in Every<br />
                <span style={{ color: '#F47920' }}>Collaboration.</span>
              </motion.h2>
              <motion.div variants={fadeUpVariant}>
                <Link to="/about#values" className="home-mission__cta">Our Principles</Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="home-mission__body mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              <strong>Innovation & Responsiveness:</strong> We don't just react to the market; we anticipate its evolution. Our commitment is to pioneering solutions that open doors for our shareholders and communities alike.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              <strong>Trust & Inclusivity:</strong> Integrity is our baseline. We build transparent relationships and ensure every stakeholder has a voice in our collective progress toward a brighter future for Africa.
            </motion.p>
          </motion.div>

          <div className="home-mission__divider my-24 h-px bg-gray-200"></div>

          {/* Milestones */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="home-mission__hero"
          >
            <div className="home-mission__left">
              <motion.span variants={fadeUpVariant} className="home-mission__label">Our Milestones</motion.span>
              <motion.h2 variants={fadeUpVariant} className="home-mission__heading">
                Sustainable Scalability.<br />
                <span style={{ color: '#F47920' }}>Proven Progress.</span>
              </motion.h2>
              <motion.div variants={fadeUpVariant}>
                <Link to="/about" className="home-mission__cta">Our Roadmap</Link>
              </motion.div>
            </div>
            <motion.div 
               variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }} 
               className="home-mission__right"
            >
              <img src={milestonesVisual} alt="Milestones" className="home-mission__visual rounded-3xl shadow-2xl" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="home-mission__body mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              <strong>2022 — The Foundation:</strong> Yegara was established as Ethiopia's first unified business-development-social hub. We began with a core focus on bridging the gap between capital and social innovation.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="home-mission__body-text text-lg text-gray-700 leading-relaxed">
              <strong>2024 — Future Scaling:</strong> Today, we are expanding our national reach, having established core service pillars that support thousands of individuals and dozens of enterprises across the region.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars of Impact — Scroll-Draw Tree */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative" ref={treeRef}>

          {/* Center Trunk Line — background track */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#F47920]/10 -translate-x-1/2" />
          {/* Center Trunk Line — drawn on scroll */}
          <motion.div 
            className="absolute left-1/2 top-0 w-[1.5px] -translate-x-1/2 origin-top bg-[#F47920]/60"
            style={{ height: treeLineHeight }}
          />

          {/* Section Title — right of center line */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="relative mb-32"
          >
            <div className="w-1/2 ml-auto pl-16">
              <motion.span variants={fadeUpVariant} className="block text-[11px] font-extrabold tracking-[0.3em] uppercase text-[#F47920] mb-3">
                | Our Services |
              </motion.span>
              <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-4xl font-serif font-black text-gray-900">
                Pillars of Impact
              </motion.h2>
            </div>
          </motion.div>

          {/* ── Card 1: Left — Capacity Building ── */}
          <div className="relative mb-16">
            <motion.div 
              className="w-[45%] mr-auto"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services#capacity" className="group block bg-[#fafafa] border border-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center text-3xl text-[#F47920]">
                  <HiAcademicCap />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacity Building</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                  Elevating potential through targeted skill-development programs for individuals and enterprises.
                </p>
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-900 group-hover:text-[#F47920] transition-colors">
                  Learn More <HiArrowRight className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── Card 2: Right — Impact Finance ── */}
          <div className="relative mb-16">
            <motion.div 
              className="w-[45%] ml-auto"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services#finance" className="group block bg-[#fafafa] border border-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center text-3xl text-[#F47920]">
                  <HiCurrencyDollar />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact Finance</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                  Innovative financial tools designed to support sustainable and socially responsible initiatives.
                </p>
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-900 group-hover:text-[#F47920] transition-colors">
                  Learn More <HiArrowRight className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── Card 3: Left — Business Development ── */}
          <div className="relative mb-16">
            <motion.div 
              className="w-[45%] mr-auto"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services#bds" className="group block bg-[#fafafa] border border-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center text-3xl text-[#F47920]">
                  <HiChartBar />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Development</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                  Comprehensive BDS covering strategy, operations, and growth advisory for scalable success.
                </p>
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-900 group-hover:text-[#F47920] transition-colors">
                  Learn More <HiArrowRight className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── Card 4: Right — Research & Innovation ── */}
          <div className="relative mb-16">
            <motion.div 
              className="w-[45%] ml-auto"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services#research" className="group block bg-[#fafafa] border border-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center text-3xl text-[#F47920]">
                  <HiLightBulb />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Research & Innovation</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                  Data-driven insights and innovative approaches to solve complex market challenges in Africa.
                </p>
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-900 group-hover:text-[#F47920] transition-colors">
                  Learn More <HiArrowRight className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── Card 5: Left — Partnership Facilitation ── */}
          <div className="relative">
            <motion.div 
              className="w-[45%] mr-auto"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services#partnership" className="group block bg-[#fafafa] border border-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center text-3xl text-[#F47920]">
                  <HiUserGroup />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Facilitation</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                  Bridging the gap between active private enterprises, non-profits, and government entities.
                </p>
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-900 group-hover:text-[#F47920] transition-colors">
                  Learn More <HiArrowRight className="ml-2" />
                </span>
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ContactSection />
      </motion.section>

      <Footer />
    </div>
  );
};

export default Home;
