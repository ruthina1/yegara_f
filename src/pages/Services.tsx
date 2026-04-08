import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiAcademicCap, HiCurrencyDollar, HiChartBar, HiLightBulb, HiUserGroup } from 'react-icons/hi';
import Footer from '../components/Footer';
import './Services.css';

const servicesData = [
  {
    id: 'capacity',
    title: 'Capacity Building',
    label: 'Empowerment',
    description: 'Elevating potential through targeted skill-development. We provide extensive training for both individuals and enterprises to ensure our workforce remains competitive.',
    details: 'Expert-led modules covering everything from basic entrepreneurship to advanced executive leadership.',
    icon: <HiAcademicCap />,
    color: '#0F2440',
    textColor: '#FFFFFF',
    accent: '#F47920',
  },
  {
    id: 'finance',
    title: 'Impact Finance',
    label: 'Capital',
    description: "Accessing capital shouldn't be a barrier to innovation. We deploy financial tools designed to support sustainable and socially responsible initiatives.",
    details: 'Specialized funds designed for high-impact social enterprises and green technology startups.',
    icon: <HiCurrencyDollar />,
    color: '#F47920',
    textColor: '#FFFFFF',
    accent: '#0F2440',
  },
  {
    id: 'bds',
    title: 'Business Development',
    label: 'Strategy',
    description: 'Navigating the business landscape requires robust operational knowledge. Our comprehensive offerings cover strategy formulation and growth advisory.',
    details: 'Setting your company up for scalable and enduring success across African markets.',
    icon: <HiChartBar />,
    color: '#FBF8F5',
    textColor: '#1B3A5C',
    accent: '#F47920',
  },
  {
    id: 'research',
    title: 'Research & Innovation',
    label: 'Insights',
    description: 'Data sits at the core of all rational decisions. We conduct continuous market research, sector analyses, and feasibility studies.',
    details: 'Partner with our labs to develop innovative approaches that solve complex market challenges.',
    icon: <HiLightBulb />,
    color: '#0A1628',
    textColor: '#FFFFFF',
    accent: '#F47920',
  },
  {
    id: 'partnership',
    title: 'Partnership Facilitation',
    label: 'Alliance',
    description: 'No single entity can achieve systemic change alone. We act as a vital bridge between active private enterprises, non-profits, and government.',
    details: 'Forging strategic alliances capable of transforming socio-economic realities.',
    icon: <HiUserGroup />,
    color: '#1B3A5C',
    textColor: '#FFFFFF',
    accent: '#F47920',
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

  const blurValue = useTransform(progress, [rootRange[0], 1], [0, 3]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);


  return (
    <div ref={container} className="stack-card__wrapper" id={service.id}>
      <motion.div
        style={{
          scale,
          filter,
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
            <button
              className="stack-card__cta"
              style={{ color: service.textColor }}
            >
              Explore Full Program
              <span
                className="stack-card__cta-arrow"
                style={{ backgroundColor: service.accent, color: '#FFFFFF' }}
              >
                →
              </span>
            </button>
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

      {/* ── CTA Section ── */}
      <section className="services-cta">
        <motion.div
          className="services-cta__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="services-cta__title">
            Ready to <span style={{ color: '#F47920' }}>grow</span>
            <br />with Yegara?
          </h2>
          <p className="services-cta__text">
            Whether you're an individual looking to build skills or an enterprise
            seeking strategic partnership, we have the tools for your success.
          </p>
          <div className="services-cta__buttons">
            <button className="services-cta__btn services-cta__btn--primary">
              Become a Partner
            </button>
            <button className="services-cta__btn services-cta__btn--secondary">
              Explore Our Hub
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
