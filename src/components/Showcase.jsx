import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  { id: 1, img: `${baseUrl}/images/showcase/1-min.jpg`, title: 'Dark Vale', categories: ['web', 'branding', 'environment'] },
  { id: 2, img: `${baseUrl}/images/showcase/2-min.jpg`, title: 'Project 2', categories: ['branding', 'environment'] },
  { id: 3, img: `${baseUrl}/images/showcase/3-min.jpg`, title: 'Project 3', categories: ['branding', 'environment'] },
  { id: 4, img: `${baseUrl}/images/showcase/4-min.jpg`, title: 'Project 4', categories: ['web', 'environment'] },
  { id: 5, img: `${baseUrl}/images/showcase/5-min.jpg`, title: 'Project 5', categories: ['environment'] },
  { id: 6, img: `${baseUrl}/images/showcase/6-min.jpg`, title: 'Project 6', categories: ['web', 'environment'] },
  { id: 7, img: `${baseUrl}/images/showcase/7-min.jpg`, title: 'Project 7', categories: ['branding', 'environment'] },
  { id: 8, img: `${baseUrl}/images/showcase/8-min.jpg`, title: 'Project 8', categories: ['web', 'environment'] },
  { id: 9, img: `${baseUrl}/images/showcase/9-min.jpg`, title: 'Project 9', categories: ['web', 'branding', 'environment'] },
];

const Showcase = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(filter));

  return (
    <section id="showcase" className="px-[5%]">
      <div className="container mx-auto">
        <h2>Detailed Showcase</h2>
        <div className="divider"></div>

        <div className="flex justify-center gap-6 mb-12 text-[10px] tracking-[4px] uppercase overflow-x-auto whitespace-nowrap scrollbar-hide">
          {['all', 'web', 'branding', 'environment'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`transition-colors hover:text-accent-red ${filter === cat ? 'text-accent-red' : 'text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-16/10 glass-panel overflow-hidden cursor-pointer hover:border-white/20"
              >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent">
                  <span className="text-sm font-bold tracking-wider">{project.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
