import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiMap, 
  HiAcademicCap, 
  HiUserGroup, 
  HiTrendingUp, 
  HiLocationMarker, 
  HiShieldCheck,
  HiLightningBolt,
  HiOfficeBuilding,
  HiGlobe,
  HiStar,
  HiOutlineUserGroup,
  HiHeart,
  HiArrowRight
} from 'react-icons/hi';
import Footer from '../components/Footer';
import atiBg1 from '../assets/ati_bg1.png';
import atiBg2 from '../assets/ati_bg2.png';
import fikreImg from '../assets/fikre_journey_actual.png';
import tsionImg from '../assets/tsion_journey_actual.png';
import bizuyeImg from '../assets/bizuye_journey_actual.png';
import fcLogo from '../assets/fc_africa_logo.png';
import kifiyaLogo from '../assets/kifiya_logo.png';
import mohasLogo from '../assets/mohas_logo.png';
import molsLogo from '../assets/mols_logo.png';
import hopeLogo from '../assets/hope_college_logo.png';
import nefasLogo from '../assets/nefas_silk_logo.png';
import testimony1 from '../assets/testimony_1.png';
import testimony2 from '../assets/testimony_2.png';
import testimony3 from '../assets/testimony_3.png';
import testimony4 from '../assets/testimony_4.png';
import ethiopiaMap from '../assets/ethiopia_map_color.png';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import './Portfolio.css';

const fadeIn = (delay = 0): any => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-page">

      {/* ── SLIDE 01: HERO / TITLE ── */}
      <section className="ati-slide ati-slide--hero">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-grid-pattern" />
        <div className="ati-slide__content">
          <motion.div {...fadeIn()} className="slide-badge">
             Capability & Achievement · March 2026
          </motion.div>
          <motion.h1 {...fadeIn(0.15)} className="slide-title slide-title--huge">
             Yegara Trading <br />
             <em>Share Co.</em>
          </motion.h1>
          <motion.p {...fadeIn(0.3)} className="slide-subtitle">
            A comprehensive overview of systemic impact, governance excellence, 
            and socio-economic empowerment across Ethiopia.
          </motion.p>
          <motion.div {...fadeIn(0.45)} className="slide-scroll-hint">
             <span>Scroll to explore</span>
             <div className="scroll-line-vertical" />
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 02: COMPANY PROFILE INTRO ── */}
      <section className="ati-slide ati-slide--compact">
        <div className="ati-container">
           <div className="profile-intro-layout">
              <motion.div {...fadeIn()} className="profile-intro-content">
                 <span className="slide-label">The Enterprise</span>
                 <h2 className="slide-title">Company Profile.</h2>
                 <p className="slide-desc">
                    Yegara Trading Share Company is a dynamic Ethiopian enterprise dedicated to catalyzing sustainable socio-economic development. 
                    As a strategic partner for businesses and communities, we provide integrated solutions that drive shared prosperity and innovation.
                 </p>
              </motion.div>
           </div>
        </div>
      </section>





      {/* ── SLIDE 05: GOVERNANCE & COMPLIANCE ── */}
      <section className="ati-slide gov-cyber-section">
        <div className="gov-cyber-grid-bg" />
        <div className="gov-glow-orb orb-1" />
        <div className="gov-glow-orb orb-2" />
        
        <div className="ati-container relative-z">
           <div className="gov-creative-layout">
              <motion.div {...fadeIn()} className="gov-creative-content">
                 <span className="slide-label label-orange">Accountability</span>
                 <h2 className="slide-title text-white">Governance <br />& Compliance.</h2>
                 
                 <p className="slide-desc text-white" style={{ opacity: 0.8, marginBottom: '2.5rem', maxWidth: '500px' }}>
                    Yegara maintains an unwavering commitment to transparent, ethical, and fully compliant business operations. We have established a robust institutional framework to ensure the highest standards of corporate accountability. Through strict legal compliances, comprehensive protocol endorsements, and continuous board-level capacity building, we safeguard our stakeholders' trust and drive long-term operational excellence.
                 </p>
                 
                 <div className="gov-creative-stats">
                    <motion.div whileHover={{ x: 10 }} className="gov-glass-card">
                       <div className="gov-card-icon"><HiShieldCheck /></div>
                       <div className="gov-card-text">
                          <span className="num">+25</span>
                          <span className="label">Governance documents finalized and endorsed.</span>
                       </div>
                    </motion.div>
                    
                    <motion.div whileHover={{ x: 10 }} className="gov-glass-card">
                       <div className="gov-card-icon"><HiUserGroup /></div>
                       <div className="gov-card-text">
                          <span className="num">08</span>
                          <span className="label">Board members engaged in capacity-building training.</span>
                       </div>
                    </motion.div>
                 </div>
              </motion.div>
              
              <motion.div 
                {...fadeIn(0.3)} 
                className="gov-creative-visual"
              >
                <div className="hologram-seal-container">
                  <div className="hologram-ring outer-ring"></div>
                  <div className="hologram-ring middle-ring"></div>
                  <div className="hologram-ring inner-ring"></div>
                  <div className="hologram-core">
                    <HiShieldCheck className="hologram-icon" />
                    <span>Compliant<br/>S.C.</span>
                  </div>
                  <div className="hologram-base-glow"></div>
                  <div className="hologram-scanline"></div>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── SLIDE 06: IMPACT & PARTNERSHIP ECOSYSTEM ── */}
      <section className="ati-slide impact-ecosystem-section">
        <div className="ati-container">
           <div className="ati-section-header text-center mb-16">
              <span className="slide-label">Impact & Partnership Ecosystem</span>
              <h2 className="slide-title">Building Sustainable Change.</h2>
           </div>

           {/* 1: The Impact Ledger (Structured Organic Constellation) */}
           <div className="impact-constellation mb-32">
              <div className="constellation-svg-wrapper">
                 <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                       d="M200,100 L1000,200 L200,500 L1000,700" 
                       stroke="rgba(244, 121, 32, 0.12)" 
                       strokeWidth="2" 
                       strokeDasharray="10 10"
                       initial={{ pathLength: 0 }}
                       whileInView={{ pathLength: 1 }}
                       transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                 </svg>
              </div>

              <div className="constellation-grid">
                 <motion.div 
                    {...fadeIn(0.1)} 
                    className="impact-node node-pos-1"
                 >
                    <div className="impact-node__icon"><HiTrendingUp /></div>
                    <div className="impact-node__content">
                       <span className="impact-val">6800+</span>
                       <span className="impact-lbl">Businesses Supported through BDS</span>
                       <p className="impact-sub">Structured services under MESMER & SAFEE programs strengthening resilience.</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    {...fadeIn(0.3)} 
                    className="impact-node node-pos-2"
                 >
                    <div className="impact-node__icon"><HiUserGroup /></div>
                    <div className="impact-node__content">
                       <span className="impact-val">7,100+</span>
                       <span className="impact-lbl">Change Makers Trained</span>
                       <p className="impact-sub">A pipeline of 298 Local Trainers and 6800 MSMEs with practical growth skills.</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    {...fadeIn(0.5)} 
                    className="impact-node node-pos-3"
                 >
                    <div className="impact-node__icon"><HiAcademicCap /></div>
                    <div className="impact-node__content">
                       <span className="impact-val">330+</span>
                       <span className="impact-lbl">Master & Local Trainers</span>
                       <p className="impact-sub">National architecture with 32 Master Trainers creating nationwide multiplier effects.</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    {...fadeIn(0.7)} 
                    className="impact-node node-pos-4"
                 >
                    <div className="impact-node__icon"><HiMap /></div>
                    <div className="impact-node__content">
                       <span className="impact-val">Nationwide</span>
                       <span className="impact-lbl">Ethiopian Impact Reach</span>
                       <p className="impact-sub">Active footprint across Addis, Dire Dawa, Oromia, Amhara, and Somali regions.</p>
                    </div>
                 </motion.div>
              </div>
           </div>

           {/* 2: The Content Block (The Yegara Advantage - RESTORED DESIGN) */}
           <div className="yegara-narrative-box mb-24">
              <motion.div {...fadeIn()} className="narrative-inner">
                 <h3 className="narrative-title">The Yegara Strategic Narrative</h3>
                 <p className="narrative-text">
                    Yegara is a strategic ecosystem builder dedicated to catalyzing sustainable socio-economic transformation. 
                    Integrating capacity development with innovation-driven business models, we address systemic constraints 
                    to address the evolving landscape of African entrepreneurship. 
                    Our focus is end-to-end value creation—from skills development to AgriTech innovation.
                 </p>
              </motion.div>
           </div>

           <div className="competitive-values-grid mb-24">
              <h3 className="cv-header">The Yegara Advantage: Competitive Values</h3>
              <div className="cv-items">
                 {[
                    { title: "Integrated Ecosystem", desc: "Capacity building, BDS, and finance in one framework.", icon: <HiLightningBolt /> },
                    { title: "Project Execution", desc: "Large-scale donor programs with high satisfaction.", icon: <HiShieldCheck /> },
                    { title: "Scalable Training", desc: "ToT model enabling nationwide replication.", icon: <HiAcademicCap /> },
                    { title: "Partnership Capital", desc: "Collaborations with financial and gov bodies.", icon: <HiUserGroup /> },
                    { title: "Innovation-Led", desc: "AgriTech Greenhouse positioning in green economy.", icon: <HiStar /> },
                    { title: "Inclusive Orientation", desc: "Focusing on women, youth, and PWDs.", icon: <HiHeart /> }
                 ].map((val, i) => (
                    <motion.div key={i} {...fadeIn(i*0.1)} className="cv-card">
                       <div className="cv-icon">{val.icon}</div>
                       <div className="cv-info">
                          <h4>{val.title}</h4>
                          <p>{val.desc}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* 3: Partners Engaged (The Logo Wall) */}
           <div className="partners-wall mb-24">
              <div className="partners-wall__header">
                 <h3 className="wall-title text-center mb-12">Our Growing Partnership Network</h3>
                 <p className="wall-desc text-center mb-16 px-12">Yegara’s credibility is anchored in its diverse and high-value partnership ecosystem, enabling resource mobilization and impact scaling.</p>
              </div>
              
              <div className="partners-container-pres">
                 <div className="partners-ticker-pres">
                    {[...new Array(2)].map((_, groupIdx) => (
                       <React.Fragment key={groupIdx}>
                          {[
                             { name: 'Enat Bank', logo: null, cat: 'Finance' },
                             { name: 'Min. of Labour & Skills', logo: molsLogo, cat: 'Gov' },
                             { name: 'EDI Ethiopia', logo: null, cat: 'Gov' },
                             { name: 'Kifiya FinTech', logo: kifiyaLogo, cat: 'Private' },
                             { name: 'First Consult', logo: fcLogo, cat: 'Private' },
                             { name: 'MoHas Consult', logo: mohasLogo, cat: 'Private' },
                             { name: 'Hope Enterprise UC', logo: hopeLogo, cat: 'Academia' },
                             { name: 'Nifas Silk Poly', logo: nefasLogo, cat: 'Academia' }
                          ].map((partner, i) => (
                             <div key={`${groupIdx}-${i}`} className="partner-pres-card">
                                <div className="partner-logo-box">
                                   {partner.logo ? <img src={partner.logo} alt={partner.name} className="partner-logo-pres" /> : <div className="partner-initials">{partner.name}</div>}
                                </div>

                             </div>
                          ))}
                       </React.Fragment>
                    ))}
                 </div>
              </div>
           </div>

           {/* 4: Strategic Dual-Action (The Buttons) */}
           <div className="strategic-actions-block">
              <div className="ati-section-header text-center">
                 <h2 className="slide-title">Engage with Yegara: Two Pathways to Impact</h2>
                 <p className="slide-desc px-12 mx-auto" style={{ maxWidth: '800px' }}>Whether you are an institution seeking scalable solutions or an individual ready to contribute, we provide clear pathways to collaborate and grow.</p>
              </div>

              <div className="dual-btn-grid mt-16">
                 <motion.div {...fadeIn(0.1)} className="action-card action-card--partner">
                    <div className="action-card__content">
                       <h3>Partner with Us</h3>
                       <p>Co-design and implement high-impact programs in business development, skills training, and entrepreneurship across Ethiopia.</p>
                       <Link to="/contact" className="action-btn">
                          Partner with Us <HiArrowRight />
                       </Link>
                    </div>
                 </motion.div>

                 <motion.div {...fadeIn(0.3)} className="action-card action-card--member">
                    <div className="action-card__content">
                       <h3>Join as a Member</h3>
                       <p>Join a network of change-makers, trainers, and entrepreneurs. Access opportunities for training and shareholding within Yegara.</p>
                       <Link to="/register" className="action-btn">
                          Join as a Member <HiArrowRight />
                       </Link>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>
      </section>


      {/* ── SLIDE 07: MAJOR PROJECTS HEADER ── */}
      <section className="ati-slide major-projects-hero">
        <div className="projects-ambient-glow" />
        <div className="projects-particle-field" />
        
        <div className="projects-marquee-bg">
          <div className="marquee-track">
             <span>MESMER</span><span>SAFEE</span><span>Qelem</span><span>Livestock</span><span>Poultry</span>
             <span>MESMER</span><span>SAFEE</span><span>Qelem</span><span>Livestock</span><span>Poultry</span>
          </div>
        </div>

        <div className="ati-container centered-text relative-z">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="projects-title-wrapper"
           >
              <div className="chapter-badge"><span>02</span> Portfolio Segment</div>
              <h1 className="hero-giant premium-text">
                 Major<br/>
                 <span className="text-stroke">Projects.</span>
              </h1>
              <div className="hero-dash-premium" />
              <p className="projects-hero-subtitle">
                Engineering sustainable impact at scale, bridging capital, capacity, and technology.
              </p>
           </motion.div>
        </div>
      </section>

      {/* ── SLIDE 08: PROJECTS OVERVIEW ── */}
      <section className="ati-slide bg-light">
        <div className="ati-container">
           <div className="ati-section-header">
              <span className="slide-label label-orange">Alignment</span>
              <h2 className="slide-title">Program <br />Overview.</h2>
           </div>
           <div className="overview-layout-elegant">
              <div className="overview-text-elegant">
                 <p className="slide-desc slide-desc--elegant">
                    Our projects seamlessly align with Ethiopia’s national MSME development agenda, 
                    architecting pathways for bankability, digital integration, and inclusive socio-economic growth.
                 </p>
                 <div className="overview-sub-decoration">
                   <div className="decor-line"></div>
                   <span>Core Ecosystem Drivers</span>
                 </div>
              </div>
              
              <div className="overview-elegant-grid">
                 {[
                   { name: 'FCAfrica', desc: 'Strategic scaling & capacity infusion.', num: '01' },
                   { name: 'MESMER', desc: 'MSME resilience & bankability frameworks.', num: '02' },
                   { name: 'SAFEE', desc: 'Systemic enterprise strengthening.', num: '03' },
                   { name: 'Kifiya', desc: 'Digital integration & financial tech.', num: '04' }
                 ].map((item, i) => (
                   <motion.div 
                     key={i} 
                     className="elegant-prog-card"
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   >
                     <div className="epc-num-wrap">
                        <span className="epc-num">{item.num}</span>
                        <div className="epc-num-line" />
                     </div>
                     <div className="epc-content">
                       <h3 className="epc-title">{item.name}</h3>
                       <p className="epc-desc">{item.desc}</p>
                     </div>
                     <div className="epc-arrow">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── SLIDE 09: MESMER HIGHLIGHTS ── */}
      <section className="ati-slide mesmer-creative-bg">
        <div className="mesmer-glow-orb m-orb-top" />
        <div className="mesmer-glow-orb m-orb-bottom" />
        
        <div className="ati-container relative-z">
           <div className="ati-section-header">
              <span className="neon-tag">Fintech & Bankability</span>
              <h2 className="neon-title">MESMER PROGRAM.</h2>
           </div>

           <div className="mesmer-dash-layout">
              {/* Left Column */}
              <div className="mesmer-brand-col">
                 <motion.div {...fadeIn()} className="mesmer-header-neon">
                    <p className="neon-desc">
                       Architecting the pathway to sustainable growth, scaling local MSMEs through deep financial inclusion,
                       dedicated coaching, and resilient business support frameworks.
                    </p>
                 </motion.div>
                 
                 <motion.div {...fadeIn(0.2)} className="mesmer-trust-box">
                    <div className="trust-stat">
                       <span className="trust-val">95%</span>
                       <span className="trust-lbl">Satisfaction Rate</span>
                    </div>
                    <div className="trust-divider" />
                    <div className="trust-stat">
                       <span className="trust-val">800+</span>
                       <span className="trust-lbl">Follow-up Calls</span>
                    </div>
                 </motion.div>
              </div>

              {/* Right Column: Floating Stat Cards */}
              <div className="mesmer-stats-cluster">
                 {[
                   { val: '306', lbl: 'MSMEs Trained', sub: '103% to Target', clr: 'orange' },
                   { val: '79%', lbl: 'Women-Led', sub: 'Enterprise Inclusion', clr: 'blue' },
                   { val: '70%', lbl: 'Youth-Led', sub: 'Initiatives', clr: 'blue' },
                   { val: 'ETB 7M+', lbl: 'Loans Facilitated', sub: 'Direct Capital', clr: 'orange' }
                 ].map((stat, i) => (
                    <motion.div 
                      key={i} 
                      className={`mesmer-floating-card mfc-${stat.clr} mfc-delay-${i}`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.15, type: 'spring', bounce: 0.4 }}
                      whileHover={{ scale: 1.05, translateY: -10 }}
                    >
                       <div className="mfc-inner">
                          <span className="mfc-val">{stat.val}</span>
                          <span className="mfc-lbl">{stat.lbl}</span>
                          <span className="mfc-sub">{stat.sub}</span>
                          <div className="mfc-accent-glow" />
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── SLIDE 10: FIKERTE'S JOURNEY ── */}
      <section className="ati-slide">
        <div className="ati-container">
           <div className="journey-layout">
              <div className="journey-visual">
                 <motion.div {...fadeIn()} className="journey-img-box">
                    <img src={fikreImg} alt="Fikerte" />
                    <div className="journey-label">Success Story — 01</div>
                 </motion.div>
              </div>
              <div className="journey-text">
                 <span className="slide-label">MESMER Journey</span>
                 <h2 className="slide-title">From Dream to Delicious Reality.</h2>
                 <p className="journey-quote">"Fikerte joined a two-day BDS training, received ongoing coaching, and accessed a 95,000 Birr loan to scale her business."</p>
                 <div className="journey-points">
                    <div className="j-point">Today, she makes informed decisions and leads her team with confidence.</div>
                    <div className="j-point">Ensures her children learn about saving and resilience at home.</div>
                 </div>
              </div>
           </div>
        </div>

      </section>

      {/* ── SLIDE 11: TSION'S JOURNEY ── */}
      <section className="ati-slide bg-light">
        <div className="ati-container">
           <div className="journey-layout journey-layout--reverse">
              <div className="journey-text">
                 <span className="slide-label">MESMER Journey</span>
                 <h2 className="slide-title">Vision to <br />Market Impact.</h2>
                 <p className="journey-quote">"Through training and a 95,000 ETB loan, Tsion strengthened her financial management and customer relations."</p>
                 <div className="journey-stats-mini">
                    <div className="js-item"><span>+20%</span> Income</div>
                    <div className="js-item"><span>+10%</span> Customers</div>
                    <div className="js-item"><span>+15%</span> Production</div>
                 </div>
              </div>
              <div className="journey-visual">
                 <motion.div {...fadeIn()} className="journey-img-box">
                    <img src={tsionImg} alt="Tsion" />
                    <div className="journey-label">Success Story — 02</div>
                 </motion.div>
              </div>
           </div>
        </div>

      </section>

      {/* ── SLIDE 12: BIZUYE'S JOURNEY ── */}
      <section className="ati-slide">
        <div className="ati-container">
           <div className="journey-layout">
              <div className="journey-visual">
                 <motion.div {...fadeIn()} className="journey-img-box">
                    <img src={bizuyeImg} alt="Bizuye" />
                    <div className="journey-label">Success Story — 03</div>
                 </motion.div>
              </div>
              <div className="journey-text">
                 <span className="slide-label">MESMER Journey</span>
                 <h2 className="slide-title">Corner Shop to Gathering Spot.</h2>
                 <p className="journey-quote">"Bizuye invested her loan in business assets and applied time-value-of-money principles to improv operations."</p>
                 <p className="journey-desc">
                    Today she runs a more efficient shop, expanded her offerings, and leads her own growth decisions.
                 </p>
              </div>
           </div>
        </div>

      </section>

      {/* ── SLIDE 13: IMPACT BY TYPE ── */}
      <section className="ati-slide bg-light">
        <div className="ati-container">
           <div className="chart-header">
              <span className="slide-label">Enterprises Benefited</span>
              <h2 className="slide-title">Impact by Support Type.</h2>
           </div>
           
           <div className="chart-pres">
              {[
                { name: 'Loan Process Guidance', val: 300, color: '#00A8A8', desc: 'Clarifying bank requirements & submissions' },
                { name: 'Financial Mgmt Coaching', val: 245, color: '#4A90E2', desc: 'Bookkeeping & financial statements' },
                { name: 'Technical Assistance', val: 210, color: '#7ED321', desc: 'Business operations & workflow optimization' },
                { name: 'Market Linkage', val: 150, color: '#F5A623', desc: 'Improving customer service & networking' },
                { name: 'Sustainability Planning', val: 90, color: '#F8E71C', desc: 'Long-term growth & resilience mapping' },
              ].map((bar, i) => (
                <div key={i} className="chart-bar-row">
                   <div className="bar-label-group">
                      <span className="bar-name">{bar.name}</span>
                      <span className="bar-val">{bar.val}</span>
                   </div>
                   <div className="bar-rail">
                      <motion.div 
                        className="bar-fill-pres"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(bar.val / 300) * 100}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                        style={{ backgroundColor: bar.color }}
                      />
                   </div>
                   <p className="bar-desc-pres">{bar.desc}</p>
                </div>
              ))}
           </div>
        </div>

      </section>

      {/* ── SLIDE 14: SAFEE HIGHLIGHTS ── */}
      <section className="ati-slide">
        <div className="ati-container">
           <div className="safee-layout-graphic">
              <motion.div 
                {...fadeIn()} 
                className="safee-graphic-visual"
              >
                 <div className="network-hub">
                    <div className="hub-center">
                       <span className="num">32</span>
                       <span className="lbl">Master Trainers</span>
                    </div>
                    <div className="hub-orbit">
                       <div className="orbit-node n1"><HiAcademicCap /></div>
                       <div className="orbit-node n2"><HiUserGroup /></div>
                       <div className="orbit-node n3"><HiTrendingUp /></div>
                       <div className="orbit-node n4"><HiLightningBolt /></div>
                    </div>
                 </div>
              </motion.div>

              <div className="safee-metrics-graphic">
                 <div className="mesmer-header">
                    <h2 className="mesmer-prog-name">SAFEE PROGRAM</h2>
                    <span className="mesmer-prog-tag">Systemic Strengthening for Enterprise</span>
                 </div>
                 
                 <div className="metric-row-graphic">
                    <div className="metric-circle">298</div>
                    <div className="metric-info-graphic">
                       <span className="m-title-graph">Local Trainers Mobilized</span>
                       <span className="m-desc-graph">A nationwide network of enterprise experts.</span>
                    </div>
                 </div>

                 <div className="metric-row-graphic">
                    <div className="metric-circle orange">34%</div>
                    <div className="metric-info-graphic">
                       <span className="m-title-graph">Gender Inclusion</span>
                       <span className="m-desc-graph">Strong female presence in leadership training.</span>
                    </div>
                 </div>

                 <motion.div {...fadeIn(0.4)} className="qelem-pulse-card">
                    <div className="pulse-dot" />
                    <div>
                       <span className="m-title-graph text-white d-block">100% Qelem Digital Integration</span>
                       <p className="m-desc-graph text-white opacity-70 mb-0">Full automated registration and tracking.</p>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>

      </section>

      {/* ── SLIDE 15: GEOGRAPHIC IMPACT ── */}
      <section className="ati-slide geo-impact-custom-bg text-white">
        <div className="ati-container">
           <div className="ati-section-header">
              <span className="slide-label label-orange">Geographic Scope</span>
              <h2 className="slide-title text-white">MSMEs Distribution & Reach.</h2>
           </div>
           <div className="geo-creative-layout">
            <motion.div 
              {...fadeIn()} 
              className="geo-map-visual"
            >
               <div className="ethiopia-svg-wrap">
                  <img src={ethiopiaMap} alt="Ethiopia Map" className="ethiopia-map-base" />
               </div>
               <div className="impact-pulse-container">
                  <div className="pulse-node node-oromia">
                     <div className="node-ring" />
                     <span className="node-label-geo">Oromia Engine</span>
                  </div>
                  <div className="pulse-node node-amhara">
                     <div className="node-ring" />
                     <span className="node-label-geo">Amhara Reach</span>
                  </div>
                  <div className="pulse-node node-addis">
                     <div className="node-ring" />
                     <span className="node-label-geo">Addis Hub</span>
                  </div>
                  <div className="pulse-node node-snnpr">
                     <div className="node-ring" />
                     <span className="node-label-geo">SNNPR Focus</span>
                  </div>
               </div>
            </motion.div>

              <div className="geo-dashboard-side">
                 <div className="geo-header-box">
                 </div>
                 
                 <div className="geo-impact-grid">
                    {[
                       { label: 'Oromia Region', val: '3,869', pct: 90 },
                       { label: 'Amhara Region', val: '1,381', pct: 60 },
                       { label: 'Addis Ababa', val: '607', pct: 40 },
                       { label: 'SNNPR & Central', val: '393', pct: 30 }
                    ].map((stat, i) => (
                       <motion.div 
                         key={i} 
                         {...fadeIn(0.2+i*0.1)} 
                         className="impact-card-dashboard"
                       >
                          <div>
                             <span className="ic-label">{stat.label}</span>
                             <span className="ic-value">{stat.val}</span>
                          </div>
                          <div className="ic-progress-wrap">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: `${stat.pct}%` }}
                               transition={{ duration: 1.5, delay: 0.5 + i*0.1 }}
                               className="ic-progress-bar"
                             />
                          </div>
                       </motion.div>
                    ))}
                 </div>

                 <motion.div {...fadeIn(0.8)} className="total-tracked-ribbon">
                    <span className="ribbon-tag">Cumulative Network</span>
                    <span>6,250+ MSMEs Tracked</span>
                 </motion.div>
              </div>
            </div>
        </div>

      </section>

      {/* ── SLIDE 16: MASTER TRAINERS ── */}
      <section className="ati-slide">
        <div className="ati-container">
           <div className="centered-header">
              <span className="slide-label">Expert Capital</span>
              <h2 className="slide-title">Master Trainer Network.</h2>
           </div>
           
           <div className="trainers-grid-alt">
              <motion.div {...fadeIn()} className="trainers-hero-card">
                 <div className="v-num">32</div>
                 <div className="v-lbl">Total Licensed Master Trainers</div>
                 <div className="v-line" />
              </motion.div>
              
              <div className="trainers-details">
                 {[
                   { loc: 'Adama, Jimma, Asella, Nekemet', count: 16 },
                   { loc: 'Lideta, Sebeta, Tafo, Kirkos', count: 9 },
                   { loc: 'Baherdar, Gonder', count: 4 },
                   { loc: 'Hossana, Arba Minch', count: 2 },
                   { loc: 'Lemi Kura', count: 1 },
                 ].map((t, i) => (
                   <motion.div key={i} {...fadeIn(i*0.1)} className="t-row">
                      <span className="t-count">{t.count}</span>
                      <span className="t-loc">{t.loc}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>

      </section>

      {/* ── SLIDE 17: INCLUSION METRICS (MODERN PROFESSIONAL) ── */}
      <section className="ati-slide bg-light">
        <div className="ati-container">
           <div className="ati-section-header">
              <span className="slide-label">Equity & Inclusion</span>
              <h2 className="slide-title">Participant Demographics.</h2>
           </div>

           <div className="inclusion-professional-layout">
              <div className="inclusion-prof-grid">
                 {/* Main Metric: Total */}
                 <motion.div 
                   {...fadeIn(0.3)} 
                   className="prof-metric-card total-card"
                 >
                    <span className="p-card-lbl">Total Active Network</span>
                    <div className="p-card-val-wrap">
                       <span className="p-card-val">298</span>
                       <span className="p-card-unit">Participants</span>
                    </div>
                    <div className="p-card-footer">
                       <HiUserGroup className="p-footer-icon" />
                       <span>Nationwide Engagement</span>
                    </div>
                 </motion.div>

                 {/* Gender Split Card */}
                 <motion.div 
                   {...fadeIn(0.4)} 
                   className="prof-metric-card gender-card"
                 >
                    <span className="p-card-lbl">Gender Distribution</span>
                    
                    <div className="prof-split-viz">
                       <div className="split-labels">
                          <div className="split-label-item">
                             <span className="dot male"></span>
                             <span className="name">Male</span>
                             <span className="pct">66%</span>
                          </div>
                          <div className="split-label-item">
                             <span className="dot female"></span>
                             <span className="name">Female</span>
                             <span className="pct">34%</span>
                          </div>
                       </div>
                       <div className="prof-split-bar">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '66%' }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="split-fill male-fill"
                          />
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '34%' }}
                            transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                            className="split-fill female-fill"
                          />
                       </div>
                    </div>
                 </motion.div>

                 {/* Special Inclusion Cards */}
                 <div className="inclusion-mini-grid">
                    {[
                      { val: '3%', lbl: 'PWD Inclusion', icon: <HiUserGroup />, delay: 0.5 },
                      { val: '5%', lbl: 'Refugees', icon: <HiShieldCheck />, delay: 0.6 }
                    ].map((m, i) => (
                       <motion.div 
                         key={i}
                         {...fadeIn(m.delay)}
                         className="prof-mini-card"
                       >
                          <div className="p-mini-icon">{m.icon}</div>
                          <div>
                             <span className="p-mini-val">{m.val}</span>
                             <span className="p-mini-lbl">{m.lbl}</span>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── SLIDE 18: EDUCATION ── */}
      <section className="ati-slide">
        <div className="ati-container">
           <div className="ati-section-header">
              <span className="slide-label">Academic Background</span>
              <h2 className="slide-title">Human Capital Architecture.</h2>
           </div>
           
           <div className="edu-stack-alt">
              
              <div className="talent-stack-container">
                 <div className="talent-visual-architecture">
                    {[
                       { name: 'Leadership & Mgmt', h: '100%' },
                       { name: 'Sociology & Psych', h: '35%' },
                       { name: 'Agriculture', h: '30%' },
                       { name: 'Finance Admin', h: '25%' },
                       { name: 'Engineering', h: '20%' },
                    ].map((p, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ height: 0 }}
                         whileInView={{ height: p.h }}
                         transition={{ duration: 1, delay: i*0.1 }}
                         className="talent-pillar"
                       >
                          <span className="pillar-tag">{p.name}</span>
                       </motion.div>
                    ))}
                 </div>

                 <div className="talent-legend">
                    {[
                       { name: 'Leadership & Mgmt', count: 38, icon: 'dot-blue', desc: 'Core strategic & operations leads.' },
                       { name: 'Sociology & Psychology', count: 10, icon: 'dot-orange', desc: 'Social impact & community specialists.' },
                       { name: 'Agriculture Studies', count: 9, icon: 'dot-blue', desc: 'Rural enterprise development.' },
                       { name: 'Finance Admin', count: 8, icon: 'dot-orange', desc: 'Fiscal governance & compliance.' },
                       { name: 'Engineering', count: 6, icon: 'dot-blue', desc: 'Infrastructure & tech integration.' }
                    ].map((item, i) => (
                       <motion.div key={i} {...fadeIn(0.4+i*0.1)} className="legend-item">
                          <div className={`legend-dot ${item.icon}`} />
                          <div className="legend-info">
                             <span className="legend-name">{item.name}</span>
                             <span className="legend-desc">{item.desc}</span>
                          </div>
                          <span className="edu-count-bubble" style={{ marginLeft: 'auto', fontWeight: 900, color: 'var(--ytsc-orange)' }}>{item.count}</span>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </section>



      {/* ── IMPACT GALLERY & TESTIMONY (CREATIVE ADDITION) ── */}
      <section className="impact-mosaic-section">
        <div className="ati-container">
           <div className="ati-section-header">
              <span className="slide-label">Community Results</span>
              <h2 className="slide-title">Living the Impact.</h2>
           </div>
           
           <div className="mosaic-grid">
              <motion.div {...fadeIn(0.1)} className="mosaic-item mosaic-item--large">
                 <img src={testimony1} alt="Community Shop" />
              </motion.div>
              <motion.div {...fadeIn(0.2)} className="mosaic-item">
                 <img src={testimony3} alt="Livestock Development" />
              </motion.div>
              <motion.div {...fadeIn(0.3)} className="mosaic-item mosaic-item--tall">
                 <img src={testimony4} alt="Poultry Results" />
              </motion.div>
              <motion.div {...fadeIn(0.4)} className="mosaic-item">
                 <img src={testimony2} alt="MESMER Training" />
              </motion.div>
           </div>
           
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
             className="testimony-quote-wrapper"
           >
              <div className="testimony-content">
                 <HiOutlineChatAlt2 className="quote-icon-large" />
                 <p className="testimony-text">
                   "Yegara didn't just provide a loan; they provided a roadmap for my family's future. 
                   The training gave me the confidence to dream bigger, and today my business supports 
                   not just my children, but my entire community's growth."
                 </p>
                 <div className="testimony-author">
                    <span className="author-name">Bizuye H.</span>
                    <span className="author-role">Entrepreneur & Community Leader</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
