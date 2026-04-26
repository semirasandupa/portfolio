import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const baseUrl = import.meta.env.BASE_URL;

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Use Motion Values for high-performance fluid tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for professional feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt Values
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // Create a motion template for the mask to avoid re-renders
  const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${smoothX}px ${smoothY}px, black 20%, transparent 80%)`;

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);

      // Calculate tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      rotateX.set((y - centerY) / 20);
      rotateY.set((centerX - x) / 20);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="about" className="px-[5%] py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div 
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-[550px] perspective-[1500px]"
          >
            <motion.div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="glass-panel p-2 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative cursor-none overflow-hidden group rounded-2xl border border-white/5"
            >
              {/* Base Image (Mask 1) */}
              <motion.img 
                src={`${baseUrl}images/mask1.png`} 
                alt="Background" 
                animate={{
                    filter: isHovered ? 'blur(8px) brightness(0.5)' : 'blur(0px) brightness(1)',
                    scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full rounded-xl" 
                style={{ backfaceVisibility: 'hidden' }}
              />
              
              {/* Professional Reveal Overlay (Mask 2) */}
              <motion.div
                className="absolute inset-2 z-10 pointer-events-none rounded-xl overflow-hidden"
                style={{
                  opacity: isHovered ? 1 : 0,
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                  transform: 'translateZ(50px)', // Pull overlay forward for 3D effect
                }}
                animate={{
                    scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img 
                    src={`${baseUrl}images/mask2.png`} 
                    alt="Mask Overlay" 
                    className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Enhanced Cinematic Lens UI (No Border, pure glow) */}
              <motion.div 
                className="absolute pointer-events-none z-20 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.15)] mix-blend-screen"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 300,
                    height: 300,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    transform: 'translateZ(60px)',
                }}
                animate={{
                  scale: isHovered ? 1 : 0.5,
                  opacity: isHovered ? 1 : 0
                }}
              />
              
              {/* Subtle Noise Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] grayscale mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">HEY THERE,</h3>
            <div className="w-10 h-0.5 bg-accent-red mb-10"></div>
            
            <p className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              Crafting immersive digital landscapes at Zenthos Productions where every pixel tells a story, and every environment breathes life into the world of gaming.
            </p>
            
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-xl">
              As a Senior Environment Developer at Zenthos Productions, I shape dynamic, high-fidelity worlds that push the boundaries of visual storytelling and interactive experiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
