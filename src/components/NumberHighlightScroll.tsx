import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const stats = [
  { id: 1, number: "100+", title: "Our Reach", desc: "Comprehensive courses offered to boost your skills." },
  { id: 2, number: "5K+",  title: "Community",  desc: "Active students learning and growing with us." },
  { id: 3, number: "50+",  title: "Expertise",  desc: "Expert instructors guiding your educational journey." }
];

const ITEM_H = 300; // px height per slot in the wheel

const NumberHighlightScroll: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress RELATIVE to this section's own height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]   // 0 when top hits viewport-top, 1 when bottom hits viewport-bottom
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.34) setActiveIndex(0);
    else if (v < 0.67) setActiveIndex(1);
    else setActiveIndex(2);
  });

  // Scroll the wheel from showing stat[0] → stat[2]
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(stats.length - 1) * ITEM_H]
  );
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 30, mass: 1 });

  const bgProgress = useTransform(scrollYProgress, [0, 1], ['#FF6B35', '#E53935']);

  return (
    /*
     * The section is 300 vh tall so the sticky panel has room to "scroll through"
     * all three stats while staying pinned to the top.
     */
    <motion.section ref={containerRef} className="scroll-number-section" style={{ backgroundColor: bgProgress, zIndex: 10 }}>
      {/* ── Main content center layer ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-12 md:px-24">
        
        {/* Side Descriptions (Absolute positioning relative to viewport center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-[1100px] flex items-center justify-between px-6 lg:px-12">
            
            {/* Left Label */}
            <div className="scroll-side-label left">
              <motion.p className="text-xs font-black tracking-[0.4em] uppercase text-white/50 mb-2">
                0{activeIndex + 1}&nbsp;•&nbsp;0{stats.length}
              </motion.p>
              <motion.h3
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-5xl font-black leading-none text-white mb-2"
              >
                {stats[activeIndex].title}
              </motion.h3>
            </div>

            {/* Placeholder to keep space for the pill */}
            <div className="scroll-number-pill" style={{ opacity: 0, visibility: 'hidden' }} />

            {/* Right Label */}
            <div className="scroll-side-label right">
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-4xl font-sans font-bold leading-tight text-white max-w-[420px] ml-auto lg:ml-0"
              >
                {stats[activeIndex].desc}
              </motion.p>
            </div>

          </div>
        </div>

        {/* ── Visual Pill wheel (The actual one that shows) ── */}
        <div className="scroll-number-pill relative z-20 overflow-hidden">
          {/* Fades */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          {/* scrolling strip */}
          <motion.div
            className="absolute inset-x-0"
            style={{
              y: smoothY,
              top: `calc(50% - ${ITEM_H / 2}px)`
            }}
          >
            {stats.map((stat, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={stat.id}
                  style={{ height: ITEM_H }}
                  className="flex items-center justify-center w-full"
                >
                  <span
                    className="scroll-stat-number font-sans font-black tracking-tighter select-none transition-all duration-500"
                    style={{
                      fontSize: isActive ? 'clamp(5rem, 11vw, 11rem)' : 'clamp(3.5rem, 8vw, 8rem)',
                      color: isActive ? '#1a1a1a' : '#e5e7eb',
                      opacity: isActive ? 1 : 0.3,
                      transform: isActive ? 'scale(1)' : 'scale(0.85)',
                    }}
                  >
                    {stat.number}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Mobile Caption ── */}
        <div className="scroll-mobile-caption">
          <motion.p className="text-xs font-black tracking-widest text-white/50 mb-1">
            0{activeIndex + 1} / 0{stats.length}
          </motion.p>
          <motion.h3 key={`m-t-${activeIndex}`} className="text-xl font-bold text-white mb-1">
            {stats[activeIndex].title}
          </motion.h3>
          <motion.p key={`m-d-${activeIndex}`} className="text-sm font-medium text-white/80">
            {stats[activeIndex].desc}
          </motion.p>
        </div>

      </div>
    </motion.section>
  );
};

export default NumberHighlightScroll;
