import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import BackgroundParticles from './components/BackgroundParticles';
import EngineShowcase from './components/EngineShowcase';
import AdminPanel from './components/AdminPanel';
import { PortfolioProvider } from './context/PortfolioContext';
import Showcase from './components/Showcase';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simple routing based on hash or search param for security
    // Access via your-site.com/#admin-access-secure
    const checkRoute = () => {
      if (window.location.hash === '#admin-access-secure') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  if (isAdmin) {
    return (
      <PortfolioProvider>
        <AdminPanel />
      </PortfolioProvider>
    );
  }

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen selection:bg-accent-red/30 bg-black text-white">
        <BackgroundParticles />
        
        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          <EngineShowcase />
          <Showcase/>
          <About />
          
          {/* Tools Scroll bar */}
          <section className="py-16 border-y border-white/5 my-10 bg-white/1 backdrop-blur-sm">
            <div className="container mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
                <img src="/images/logo-adobe.png" alt="Adobe" className="h-8 md:h-10 hover:scale-110 transition-all cursor-pointer" />
                <img src="/images/logo-discord.png" alt="Discord" className="h-8 md:h-10 hover:scale-110 transition-all cursor-pointer" />
                <img src="/images/logo-google.png" alt="Google" className="h-8 md:h-10 hover:scale-110 transition-all cursor-pointer" />
                <img src="/images/logo-puma.png" alt="Puma" className="h-8 md:h-10 hover:scale-110 transition-all cursor-pointer" />
                <img src="/images/logo-paypal.png" alt="Paypal" className="h-8 md:h-10 hover:scale-110 transition-all cursor-pointer" />
            </div>
          </section>

          <Skills />
          <Services />
          <Contact />
        </main>
        
        <footer className="py-12 text-center opacity-20 text-[9px] tracking-[8px] uppercase border-t border-white/5 bg-black">
          &copy; 2026 MR. VISCAM PRODUCTIONS. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </PortfolioProvider>
  );
}

export default App;
