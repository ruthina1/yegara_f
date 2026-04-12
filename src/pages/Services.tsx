import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiAcademicCap, HiCurrencyDollar, HiChartBar, HiLightBulb, HiUserGroup, HiSparkles, HiChatAlt2, HiUsers, HiClipboardList, HiSearch } from 'react-icons/hi';
import Footer from '../components/Footer';
import './Services.css';

const servicesData = [
  {
    id: 'workshops',
    title: 'Workshops & Training',
    label: 'Education',
    description: 'Educational programs, seminars, and hands-on workshops on product development, fundraising, leadership, and digital transformation.',
    details: 'Interactive sessions designed to build practical skills and knowledge.',
    icon: <HiSparkles />,
    color: '#0A1628',
    textColor: '#FFFFFF',
    accent: '#F47920',
  },
  {
    id: 'mentorship',
    title: 'Mentorship & Coaching',
    label: 'Guidance',
    description: 'Direct guidance from experienced entrepreneurs, industry leaders, and technical experts.',
    details: 'One-on-one coaching to navigate challenges and accelerate growth.',
    icon: <HiChatAlt2 />,
    color: '#F47920',
    textColor: '#FFFFFF',
    accent: '#0F2440',
  },
  {
    id: 'networking',
    title: 'Networking & Community',
    label: 'Connections',
    description: 'Facilitating connections among entrepreneurs, investors, corporate partners, and stakeholders.',
    details: 'Building a vibrant community of innovators and industry leaders.',
    icon: <HiUsers />,
    color: '#FBF8F5',
    textColor: '#1B3A5C',
    accent: '#F47920',
  },
  {
    id: 'consultancy',
    title: 'Consultancy Services',
    label: 'Advisory',
    description: 'Professional advisory by experts to solve problems, improve performance, and implement new strategies.',
    details: 'Tailored solutions to optimize your business operations.',
    icon: <HiClipboardList />,
    color: '#1B3A5C',
    textColor: '#FFFFFF',
    accent: '#F47920',
  },
  {
    id: 'research-hub',
    title: 'Research Hub',
    label: 'Discovery',
    description: 'Systematic studies aimed at gaining new knowledge and solving specific problems in science, technology, and business.',
    details: 'Data-driven insights to inform your strategic decisions.',
    icon: <HiSearch />,
    color: '#0F2440',
    textColor: '#FFFFFF',
    accent: '#F47920',
  },
  {
    id: 'cocreation',
    title: 'Co-creation & Co-Work',
    label: 'Collaboration',
    description: 'Shared physical workspaces and collaborative product development for a productive, community-driven environment.',
    details: 'Flexible workspaces designed for collaboration and innovation.',
    icon: <HiUserGroup />,
    color: '#F47920',
    textColor: '#FFFFFF',
    accent: '#0A1628',
  },
];

const StackCard = ({
  index,
  service,
  progress,
  rootRange,
}: {
  index: number;
  service: any;
  progress: any;
  rootRange: [number, number];
}) => {
  const container = useRef<HTMLDivElement>(null);

  const targetScale = 1 - (servicesData.length - index) * 0.04;
  const scale = useTransform(progress, [rootRange[0], 1], [1, targetScale]);


  return (
    <div ref={container} className="stack-card__wrapper" id={service.id}>
      <motion.div
        style={{
          scale,
          backgroundColor: service.color,
          top: `calc(5vh + ${index * 18}px)`,
        }}
        className="stack-card"
      >
        {/* Corner accent */}
        <div
          className="stack-card__corner-accent"
          style={{ background: `radial-gradient(circle at top right, ${service.accent}22, transparent 70%)` }}
        />

        {/* Background watermark */}
        <div className="stack-card__watermark" style={{ color: service.textColor }}>
          {service.icon}
        </div>

        {/* Card number label */}
        <div className="stack-card__number" style={{ color: service.accent }}>
          <span className="stack-card__number-line" style={{ backgroundColor: service.accent }} />
          0{index + 1} — {service.label}
        </div>

        {/* Inner layout */}
        <div className="stack-card__inner">
          {/* Left — Title side */}
          <div className="stack-card__left">
            <div
              className="stack-card__icon-box"
              style={{ backgroundColor: service.textColor, color: service.color }}
            >
              {service.icon}
            </div>
            <h2 className="stack-card__title" style={{ color: service.textColor }}>
              {service.title}
            </h2>
          </div>

          {/* Divider */}
          <div
            className="stack-card__divider"
            style={{ backgroundColor: service.textColor }}
          />

          {/* Right — Content side */}
          <div className="stack-card__right">
            <p className="stack-card__description" style={{ color: service.textColor }}>
              {service.description}
            </p>
            <div
              className="stack-card__detail"
              style={{ color: service.textColor, borderColor: service.accent }}
            >
              {service.details}
            </div>
            <Link
              to="/login"
              className="stack-card__cta"
              style={{ color: service.textColor, textDecoration: 'none' }}
            >
              Explore Full Program
              <span
                className="stack-card__cta-arrow"
                style={{ backgroundColor: service.accent, color: '#FFFFFF' }}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pillLabels = ['Capacity Building', 'Impact Finance', 'Business Dev', 'Research', 'Partnerships'];

  return (
    <div style={{ background: '#FFFFFF', overflowX: 'hidden' }}>

      {/* ── Hero Section ── */}
      <section className="services-hero" style={{ paddingTop: '80px' }}>
        {/* Orbs */}
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />

        {/* Grid pattern */}
        <div className="hero-grid-pattern" />

        {/* Content */}
        <div className="services-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="services-hero__badge">
              <span className="services-hero__badge-dot" />
              Capabilities &amp; Offerings
            </div>
          </motion.div>

          <motion.h1
            className="services-hero__title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
          >
            Pillars of<br />
            <em>Impact.</em>
          </motion.h1>

          <motion.p
            className="services-hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            Five core capabilities designed to systematically build capacity, unlock
            capital, and foster sustainable growth across Africa.
          </motion.p>

          {/* Service pills */}
          <motion.div
            className="services-hero__pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {pillLabels.map((label, i) => (
              <motion.span
                key={label}
                className="services-hero__pill"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="services-hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="services-hero__scroll-text">Scroll to explore</span>
          <div className="services-hero__scroll-line" />
        </motion.div>
      </section>

      {/* ── Stacked Cards Section ── */}
      <div style={{ background: '#f8f9fc' }}>
        <main ref={mainRef} className="relative w-full">
          {servicesData.map((service, i) => {
            const startRange = i / servicesData.length;
            return (
              <StackCard
                key={service.id}
                index={i}
                service={service}
                progress={smoothProgress}
                rootRange={[startRange, 1]}
              />
            );
          })}
        </main>
      </div>



      <Footer />
    </div>
  );
};

export default Services;
