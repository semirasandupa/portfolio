import React from 'react';
import { motion } from 'framer-motion';

const baseUrl = import.meta.env.BASE_URL;

const services = [
  { img: `${baseUrl}images/logo-puma.png`, title: 'Unity 3D', desc: "Building complex, interactive environments and game levels using Unity's powerful engine." },
  { img: `${baseUrl}images/logo-google.png`, title: 'Environment Development', desc: 'Specializing in cinematic world-building, landscape sculpting, and lighting design.' },
  { img: `${baseUrl}images/logo-paypal.png`, title: 'Blender', desc: 'High-fidelity 3D modeling, asset creation, and architectural visualization.' },
];

const Services = () => {
  return (
    <section id="services" className="px-[5%]">
      <div className="container mx-auto">
        <h2>My Services</h2>
        <div className="divider"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, i) => (
            <motion.div 
               key={i}
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ scale: 1.02 }}
               className="glass-panel p-10 hover:border-accent-red cursor-pointer group"
            >
              <img src={service.img} alt={service.title} className="h-12 mb-6 transition-all" />
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
