import React from 'react';

const CorporateIdentity: React.FC = () => {
  const brandColor = "#FF6B35";

  return (
    <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden flex flex-col items-center">
      {/* Background Decorative Logo - The gear/W shape */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
        
        {/* Left Side: Large Decorative Gear/Logo Structure */}
        <div className="relative">
          <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.08] absolute -left-24 -top-24 select-none pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.9 90 10 72.1 10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90ZM65 35L75 45L50 70L25 45L35 35L50 50L65 35Z" fill="#2563EB"/>
            </svg>
          </div>
          
          {/* Detailed Info Column */}
          <div className="relative z-20 space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-6">Location</p>
              <div className="text-xl md:text-2xl font-serif font-black text-black leading-relaxed">
                Woreda 04, Bole Sub City,<br/>
                Addis Ababa, Ethiopia<br/>
                22 Mazorya, Getahun Beshah Bldg,<br/>
                6th Floor
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-6">Contact Details</p>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-[#FF6B35] font-black">Mobile</span>
                  <span className="text-2xl font-serif font-black">+251 900 473 707</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-[#FF6B35] font-black">Email</span>
                  <span className="text-lg md:text-xl font-serif font-black text-black/80">yegaratradingsc@yegaratrading.com</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 flex items-center gap-4">
              <div className="w-12 h-[2px]" style={{ backgroundColor: brandColor }} />
              <p className="text-xs uppercase tracking-[0.3em] font-black text-black/40">Established Excellence</p>
            </div>
          </div>
        </div>

        {/* Right Side: Large Orange Branding */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-8">
          <h2 
            style={{ color: brandColor }}
            className="text-7xl md:text-[12rem] font-serif font-black leading-none tracking-tighter"
          >
            YEGARA
          </h2>
          <h1 
            style={{ color: brandColor }}
            className="text-5xl md:text-8xl font-serif font-black leading-[0.9] uppercase tracking-tighter max-w-xl"
          >
            Yegara Trading Share Company
          </h1>
          <p className="text-xs md:text-sm font-black tracking-[0.4em] text-black/40 uppercase">
            all rights reserved © 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default CorporateIdentity;
