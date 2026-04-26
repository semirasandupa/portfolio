import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const baseUrl = import.meta.env.BASE_URL;

const EngineShowcase = () => {
  const { unrealPhotos, unityPhotos } = usePortfolio();
  const [view, setView] = useState('menu');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSelect = (engine) => {
    setIsSpinning(true);
    // 1.2s of professional momentum-based transition
    setTimeout(() => {
        setView(engine);
        setIsSpinning(false);
    }, 1200);
  };

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-black min-h-screen flex flex-col justify-center font-sans">
      
      {/* Background Cinematic Dust & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl md:text-7xl font-black tracking-[20px] md:tracking-[35px] uppercase mb-4 text-white">Showcase</h2>
                <div className="flex items-center justify-center gap-6">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-accent-red"></div>
                    <span className="text-[10px] tracking-[8px] text-accent-red font-bold uppercase">System.Archive.v4</span>
                    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-accent-red"></div>
                </div>
            </motion.div>
        </div>

        <div className="relative min-h-[850px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {view === 'menu' ? (
              <motion.div 
                key="menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                    opacity: 0, 
                    scale: 1.1, 
                    filter: "blur(40px) contrast(1.5)" 
                }}
                className="relative flex items-center justify-center w-full"
              >
                {/* Lateral Depth Elements */}
                <div className="absolute -left-[30vw] top-0 w-80 opacity-5 hidden xl:block -rotate-6 pointer-events-none select-none">
                   <img src={`${baseUrl}images/showcase/7-min.jpg`} className="w-full rounded-sm mb-6 grayscale" alt="" />
                   <div className="text-[8px] tracking-[5px] text-white opacity-40 uppercase">Aesthetic.Vol.01</div>
                </div>
                <div className="absolute -right-[30vw] top-0 w-80 opacity-5 hidden xl:block rotate-6 pointer-events-none select-none">
                   <img src={`${baseUrl}images/showcase/9-min.jpg`} className="w-full rounded-sm mb-6 grayscale" alt="" />
                   <div className="text-[8px] tracking-[5px] text-white opacity-40 uppercase">Atmosphere.Vol.02</div>
                </div>

                {/* THE PROFESSIONAL CORE BIOME */}
                <div className="relative p-12">
                   {/* Orbiting Ring */}
                    <div className={`absolute inset-0 border border-white/5 rounded-full transition-transform duration-[1500ms] ${isSpinning ? 'rotate-[360deg] scale-110' : 'rotate-0 scale-100'}`}></div>
                    
                    <motion.div 
                        animate={{ 
                            rotate: isSpinning ? 1080 : 0,
                            scale: isSpinning ? 0.85 : 1,
                        }}
                        transition={{ 
                            rotate: { duration: 1.4, ease: [0.76, 0, 0.24, 1] },
                            scale: { duration: 0.6 }
                        }}
                        style={{ originX: "50%", originY: "50%" }}
                        className={`relative w-80 h-80 md:w-[650px] md:h-[650px] rounded-full shadow-[20px_20px_100px_rgba(0,0,0,0.8)] bg-white overflow-hidden border-[12px] border-white/5 z-20 transition-all duration-700 ${isSpinning ? 'brightness-150 blur-[1px]' : 'hover:border-white/10'}`}
                    >
                        {/* Background Halves */}
                        <div className="absolute inset-0 w-1/2 bg-black"></div>
                        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
                        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>

                        {/* Interactive Sectors */}
                        <div onClick={() => !isSpinning && handleSelect('unreal')} className="absolute inset-x-0 top-0 h-1/2 z-40 cursor-pointer group/unreal">
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity text-[8px] tracking-[10px] text-white uppercase">Pipeline.Unreal</div>
                        </div>
                        <div onClick={() => !isSpinning && handleSelect('unity')} className="absolute inset-x-0 bottom-0 h-1/2 z-40 cursor-pointer group/unity">
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity text-[8px] tracking-[10px] text-black uppercase">Pipeline.Unity</div>
                        </div>

                        {/* Core Seals (Logos) */}
                        {/* Core Seals (Logos) */}
                        <motion.div 
                            initial={{ x: "-50%", y: "-50%" }}
                            animate={{ 
                                x: "-50%",
                                y: "-50%",
                                scale: isSpinning ? 0.4 : [1, 1.02, 1],
                                opacity: isSpinning ? 0 : 1,
                                rotate: isSpinning ? -1080 : 0
                            }}
                            whileHover={{ 
                                y: "-65%", 
                                scale: 1.15, 
                                boxShadow: "0 30px 60px rgba(0,0,0,0.5)" 
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute top-1/4 left-1/2 w-24 h-24 md:w-36 md:h-36 bg-white rounded-full z-30 shadow-2xl flex items-center justify-center p-6 md:p-10 cursor-pointer"
                        >
                            <img src={`${baseUrl}images/unreal.png`} className="w-full h-full object-contain mix-blend-multiply" alt="Unreal" />
                        </motion.div>

                        <motion.div 
                            initial={{ x: "-50%", y: "50%" }}
                            animate={{ 
                                x: "-50%",
                                y: "50%",
                                scale: isSpinning ? 0.4 : [1, 1.02, 1],
                                opacity: isSpinning ? 0 : 1,
                                rotate: isSpinning ? -1080 : 0
                            }}
                            whileHover={{ 
                                y: "35%", 
                                scale: 1.15, 
                                boxShadow: "0 30px 60px rgba(0,0,0,0.5)" 
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute bottom-1/4 left-1/2 w-24 h-24 md:w-36 md:h-36 bg-black rounded-full z-30 shadow-2xl flex items-center justify-center p-6 md:p-10 border-4 border-white/5 cursor-pointer"
                        >
                            <img src={`${baseUrl}images/logo-puma.png`} className="w-full h-full object-contain" alt="Unity" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Information Sub-text */}
                <div className="absolute bottom-[-140px] inset-x-0 flex flex-col items-center pointer-events-none">
                    <div className={`flex justify-center gap-40 transition-all duration-1000 ${isSpinning ? 'opacity-0 scale-90 letter-spacing-[20px]' : 'opacity-40'}`}>
                        <div className="flex flex-col items-center">
                            <div className="text-[10px] md:text-sm tracking-[15px] uppercase font-black text-white">Unreal.Engine</div>
                            <div className="w-12 h-[1px] bg-white/20 mt-2"></div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-[10px] md:text-sm tracking-[15px] uppercase font-black text-white">Unity.Engine</div>
                            <div className="w-12 h-[1px] bg-white/20 mt-2"></div>
                        </div>
                    </div>
                    <motion.div 
                        animate={isSpinning ? { opacity: 1, letterSpacing: "30px" } : { opacity: 0.2, letterSpacing: "15px" }}
                        className="mt-12 uppercase font-bold text-accent-red text-[10px] transition-all duration-700"
                    >
                        {isSpinning ? 'SYNCHRONIZING_CORE_ARCHIVE' : 'SELECT_DEVELOPMENT_ENVIRONMENT'}
                    </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key={view}
                initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                className="w-full max-w-7xl px-4"
              >
                {/* Header for Engine View */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20">
                    <div className="text-left">
                       <div className="text-[10px] tracking-[10px] uppercase text-accent-red font-bold mb-4 opacity-70">Archive // Development</div>
                       <h3 className="text-4xl md:text-8xl font-black uppercase tracking-[15px] text-white">
                          {view} <span className="opacity-10 text-outline">Engine</span>
                       </h3>
                    </div>
                    <button 
                        onClick={() => setView('menu')}
                        className="group relative mt-12 md:mt-0 px-12 py-5 bg-white/5 border border-white/10 hover:border-accent-red transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-accent-red/0 group-hover:bg-accent-red/5 transition-colors"></div>
                        <span className="relative z-10 text-[10px] uppercase tracking-[8px] font-black text-white flex items-center gap-4">
                            <span className="w-1 h-3 bg-accent-red"></span>
                            Return.Cycle
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {(view === 'unreal' ? unrealPhotos : unityPhotos).map((photo, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.15 + 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-[16/10] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 hover:border-accent-red/50 transition-colors duration-700"
                        >
                            <img src={photo} alt="Showcase" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-[10px] tracking-[6px] uppercase font-bold text-white">Project.Archive_{i + 1}</span>
                            </div>

                            <div className="absolute top-0 left-0 w-[1px] h-0 group-hover:h-full bg-accent-red transition-all duration-700"></div>
                        </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EngineShowcase;
