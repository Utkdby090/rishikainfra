import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Data from Rishika Infra's PDF profiles and requested structure
const SECTORS = [
  { label: 'Power Grid & Utilities', href: '#sectors' },
  { label: 'Renewables & Solar', href: '#sectors' },
  { label: 'Capital Projects', href: '#sectors' },
  { label: 'Highway Corridors', href: '#sectors' },
];

const SOLUTIONS = [
  { label: 'Drone Inspections', href: '#solutions' },
  { label: 'Thermal Diagnostics', href: '#solutions' },
  { label: 'Geospatial Surveys', href: '#solutions' },
  { label: '3D Modeling (BIM)', href: '#solutions' },
  { label: 'AI Traffic Mgmt', href: '#solutions' },
];

const ABOUT_LINKS = [
  { label: 'News', href: '#news' },
  { label: 'Resources', href: '#resources' },
  { label: 'ESG', href: '#esg' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <header className="absolute left-0 right-0 top-0 z-30">
      <div className="mx-auto flex h-[92px] max-w-[1440px] items-center justify-between px-6 lg:px-16">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[3px] border-[#FFC62F]">
              <div className="text-[26px] leading-none text-white">≋</div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-[22px] font-light tracking-[0.3em] text-white">RISHIKA</span>
                <span className="text-[22px] font-extrabold tracking-[0.15em] text-white">INFRA</span>
                <sup className="ml-1 text-[7px] text-[#FFC62F]">™</sup>
              </div>
              <p className="mt-0.5 text-[9px] tracking-[0.22em] text-white/75">YOUR ASSETS. OUR SOLUTIONS. BETTER DECISIONS.</p>
              <p className="mt-1 text-[7px] tracking-[0.28em] text-white/55">AERIAL INSPECTION & GEOSPATIAL INTELLIGENCE</p>
            </div>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex h-full">
          
          {/* SECTORS Dropdown */}
          <div 
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => handleMouseEnter('sectors')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#sectors" className={`text-[15px] font-semibold transition-colors ${activeMenu === 'sectors' ? 'text-[#FFC62F]' : 'text-white group-hover:text-[#FFC62F]'}`}>
              SECTORS
            </a>
            <AnimatePresence>
              {activeMenu === 'sectors' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[92px] left-0 w-64 bg-[#FFC62F] shadow-xl border-t-2 border-white/20"
                >
                  <ul className="py-2">
                    {SECTORS.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block px-6 py-3 text-[#17212B] hover:bg-[#FFD85C] transition-colors text-[14px] font-bold flex items-center gap-2 group-link">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* OUR SOLUTIONS Dropdown */}
          <div 
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#solutions" className={`text-[15px] font-semibold transition-colors ${activeMenu === 'solutions' ? 'text-[#FFC62F]' : 'text-white group-hover:text-[#FFC62F]'}`}>
              OUR SOLUTIONS
            </a>
            <AnimatePresence>
              {activeMenu === 'solutions' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[92px] left-0 w-64 bg-[#FFC62F] shadow-xl border-t-2 border-white/20"
                >
                  <ul className="py-2">
                    {SOLUTIONS.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block px-6 py-3 text-[#17212B] hover:bg-[#FFD85C] transition-colors text-[14px] font-bold flex items-center gap-2 group-link">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PLATFORM Link (Static) */}
          <a href="#platform" className="text-[15px] font-semibold text-white transition-colors hover:text-[#FFC62F]">
            PLATFORM
          </a>

          {/* ABOUT Dropdown */}
          <div 
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#about" className={`text-[15px] font-semibold transition-colors ${activeMenu === 'about' ? 'text-[#FFC62F]' : 'text-white group-hover:text-[#FFC62F]'}`}>
              ABOUT
            </a>
            <AnimatePresence>
              {activeMenu === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[92px] left-0 w-64 bg-[#FFC62F] shadow-xl border-t-2 border-white/20"
                >
                  <ul className="py-2">
                    {ABOUT_LINKS.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block px-6 py-3 text-[#17212B] hover:bg-[#FFD85C] transition-colors text-[14px] font-bold flex items-center gap-2 group-link">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTACT Button */}
          <a href="#contact" className="rounded-full bg-[#FFC62F] px-7 py-3 text-[14px] font-bold text-[#16212B] transition-all hover:bg-[#FFD85C] hover:scale-[1.03]">
            CONTACT
          </a>
        </nav>

        {/* Mobile menu */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
          aria-label="Open navigation"
        >
          <div className="space-y-1.5">
            <span className="block h-[2px] w-5 bg-white"></span>
            <span className="block h-[2px] w-5 bg-white"></span>
            <span className="block h-[2px] w-5 bg-white"></span>
          </div>
        </button>

      </div>
    </header>
  );
}