import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import missionVisual from '../assets/mission_visual.png';

const CurtainSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Delayed Grow Effect: starts only after exploring the white hero
  const clipPath = useTransform(
    scrollYProgress, 
    [0, 0.6], 
    ["inset(0% 12% 15% 12% round 30px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  
  // Scale the image slightly for dynamic feel
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.15, 1]);
  
  // Fade in text as the image grows
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#fafafa]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* The "Growing" Image Container */}
        <motion.div 
          style={{ clipPath }}
          className="relative w-full h-full overflow-hidden"
        >
          <motion.img 
            src={missionVisual} 
            alt="Luxury Learning" 
            style={{ scale: imageScale }}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay & Text - Fades in as image expands */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <span className="text-[10px] md:text-xs font-black tracking-[0.6em] uppercase text-white/70 mb-6 block">
                The Heritage of Excellence
              </span>
              <h2 className="text-4xl md:text-7xl font-serif font-black text-white max-w-4xl leading-tight mb-8">
                Around the world, <br/> one learner at a time.
              </h2>
              <div className="w-20 md:w-32 h-[1px] bg-white/30 mx-auto" />
              <p className="mt-8 text-white/80 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                We believe that premium education is about more than just data—it's about the atmosphere, 
                the connection, and the luxury of dedicated learning.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurtainSection;
