import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

const Contact = () => {
  const contactData = [
    { label: 'Discord', value: 'Join Official Discord Server', icon: <img src={`${baseUrl}images/logos/discord.svg`} className="w-4 h-4 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all font-black text-accent-red" alt="Discord" />, href: 'https://discord.gg/5ZMdBRKHUg' },
    { label: 'Github', value: '@semirasandupa', icon: <span className="text-[10px] font-black text-accent-red opacity-60 group-hover:opacity-100">[GIT]</span>, href: 'https://github.com/semirasandupa' },
    { label: 'Address', value: 'Colombo, Sri Lanka', icon: <MapPin size={18} className="text-accent-red opacity-60 group-hover:opacity-100 transition-all" />, href: null },
  ];

  return (
    <section id="contact" className="px-[5%] pb-32">
      <div className="container mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-widest text-center">Get In Touch</h2>
        <div className="divider"></div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-panel mt-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {contactData.map((item, i) => (
              <div key={i} className="p-10 group cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-[10px] uppercase tracking-[4px] text-accent-red font-bold flex items-center gap-2 mb-4">
                  {item.icon} {item.label}
                </span>
                {item.href ? (
                  <a href={item.href} className="text-sm md:text-base font-medium text-white group-hover:text-accent-red transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm md:text-base font-medium text-white italic">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
