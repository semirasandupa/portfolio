import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Maximize } from 'lucide-react';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const NavItem = ({ link }) => (
    <a 
      href={link.href} 
      className="group relative text-[9px] tracking-[4px] uppercase text-white/50 hover:text-white font-black transition-all"
    >
      {link.name}
      <motion.span 
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-red rounded-full shadow-[0_0_10px_#D63447]"
      />
    </a>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        isScrolled 
          ? 'py-4 bg-white/[0.02] backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_25px_100px_rgba(0,0,0,0.8)]' 
          : 'py-8 bg-black/5 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Prismatic Top Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Subtle Inset Highlight */}
      <div className="absolute inset-0 border-t border-white/[0.05] pointer-events-none"></div>

      {/* Dynamic Scroll Indicator */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent-red origin-left z-[110]"
        style={{ scaleX }}
      />
      
      <div className="container mx-auto px-10 flex justify-between items-center relative">
        {/* Navigation - Left Group */}
        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.slice(0, 3).map(link => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>

        {/* Global Logo Identity */}
        <div className="text-xl md:text-2xl font-black tracking-[10px] mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 select-none group">
          <span className="text-white transition-all group-hover:tracking-[12px]">MR</span>
          <span className="text-accent-red shadow-glow animate-pulse">.</span>
          <span className="text-white transition-all group-hover:tracking-[12px]">VISCAM</span>
        </div>

        {/* Navigation - Right Group */}
        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.slice(3).map(link => (
            <NavItem key={link.name} link={link} />
          ))}
          
          <div className="w-px h-6 bg-white/5 mx-2"></div>

          <button 
            onClick={toggleFullscreen} 
            className="p-2 text-white/30 hover:text-accent-red transition-all hover:scale-125 active:scale-90"
            title="Toggle Fullscreen"
          >
            <Maximize size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Dynamic Mobile Trigger */}
        <button className="lg:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Advanced Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 z-[90]"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black tracking-[15px] uppercase text-white/20 hover:text-accent-red hover:tracking-[20px] transition-all duration-500"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => { toggleFullscreen(); setIsOpen(false); }} 
              className="mt-8 text-xs flex items-center gap-4 hover:text-accent-red transition-all uppercase tracking-[8px] font-black text-white/40"
            >
                FULLSCREEN <Maximize size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
