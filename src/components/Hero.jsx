import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const baseUrl = import.meta.env.BASE_URL;

const Hero = () => {
  const { scrollY } =
  
  
  useScroll();
  
  // Parallax Values
  const bgY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-[5%] relative overflow-hidden bg-black">
      
      {/* Cinematic Background - Mask Man (Centered & Subtle) */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.35 : 0.25 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src={`${baseUrl}/images/mask_man.jpg`} 
          alt="Masked Figure" 
          className="h-[110vh] w-auto object-contain transition-all duration-1000"
          style={{ 
            filter: isHovered ? 'drop-shadow(0 0 50px rgba(214, 52, 71, 0.15)) brightness(0.8)' : 'brightness(0.7)',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
        />
      </motion.div>

      {/* Hero Title and Identity (Centered) */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl"
      >
        
        {/* Top Technical Metadata */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          className="mb-6 flex items-center gap-8"
        >
          <div className={`h-[1px] bg-accent-red/50 transition-all duration-1000 ${isHovered ? 'w-24' : 'w-12'}`}></div>
          <span className="text-[10px] tracking-[12px] uppercase font-black text-white/80">System.Identity.v4</span>
          <div className={`h-[1px] bg-accent-red/50 transition-all duration-1000 ${isHovered ? 'w-24' : 'w-12'}`}></div>
        </motion.div>

        {/* Transitioning Title Container */}
        <div 
          className="relative h-24 md:h-48 flex items-center justify-center cursor-pointer mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.h1 
                key="viscam"
                initial={{ opacity: 0, letterSpacing: "40px", y: 20 }}
                animate={{ opacity: 1, letterSpacing: "25px", y: 0 }}
                exit={{ opacity: 0, letterSpacing: "60px", filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl lg:text-[120px] font-black uppercase text-white select-none absolute"
              >
                VISCAM
              </motion.h1>
            ) : (
              <motion.h1 
                key="whitedevil"
                initial={{ opacity: 0, letterSpacing: "0px", y: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, letterSpacing: "15px", lg: "20px", y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, letterSpacing: "20px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl lg:text-[120px] font-black uppercase text-white select-none absolute whitespace-nowrap"
                style={{ textShadow: "0 0 60px rgba(214, 52, 71, 0.3)" }}
              >
                WHITE <span className="text-accent-red">D</span>EVIL
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        
        {/* Personal Details with Dynamic Opacity */}
        <motion.div 
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.6 }}
          className="w-full"
        >
          <p className="text-sm md:text-3xl font-black tracking-[12px] md:tracking-[22px] uppercase text-white mb-6">
            Semira <span className={isHovered ? 'text-accent-red transition-colors duration-1000' : 'text-white transition-colors duration-1000'}>Sandupa</span>
          </p>
          <div className="h-[2px] w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
          <p className="text-[10px] md:text-sm font-bold tracking-[8px] md:tracking-[12px] uppercase text-white/50">
            Senior Environment Designer <span className="text-accent-red/60 mx-4">•</span> Zenthos Studio
          </p>
        </motion.div>
      </motion.div>

      {/* Cinematic Footer Stamp */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity duration-1000 cursor-default">
          <span className="text-[9px] tracking-[15px] uppercase font-black text-white">AUTHENTICATED.SESSION.ENV.03</span>
      </div>
    </section>
  );
};

export default Hero;
