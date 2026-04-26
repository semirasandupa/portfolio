import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Environment Design', pct: 90 },
  { name: 'Adobe Illustrator', pct: 60 },
  { name: 'Unity 3D', pct: 95 },
  { name: 'C#', pct: 55 },
];

const Skills = () => {
  return (
    <section id="skills" className="px-[5%] py-24 bg-gradient-to-b from-transparent to-black/40">
      <div className="container mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-center mb-2">My Skills</h2>
        <div className="divider mb-16"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mt-12">
          {skills.map((skill, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-4 rounded-full bg-accent-red/5 blur-2xl group-hover:bg-accent-red/20 transition-all duration-700"></div>
                
                <svg className="w-full h-full -rotate-90 relative z-10">
                  <circle 
                    cx="50%" cy="50%" r="42%" 
                    className="fill-none stroke-white/[0.05] stroke-[4]"
                  />
                  <motion.circle 
                    cx="50%" cy="50%" r="42%" 
                    className="fill-none stroke-accent-red stroke-[4]"
                    style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 8px rgba(214, 52, 71, 0.4))' }}
                    initial={{ strokeDasharray: "251 251", strokeDashoffset: 251 }}
                    whileInView={{ strokeDashoffset: 251 - (251 * skill.pct) / 100 }}
                    transition={{ duration: 2.5, ease: "circOut", delay: 0.2 }}
                  />
                </svg>
                <div className="absolute text-2xl md:text-3xl font-black tracking-tight text-white group-hover:scale-110 transition-transform duration-500">
                  {skill.pct}<span className="text-[10px] text-accent-red font-bold ml-0.5">%</span>
                </div>
              </div>
              <span className="mt-8 text-[11px] tracking-[4px] uppercase font-black text-gray-500 group-hover:text-white transition-colors duration-500">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
