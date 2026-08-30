import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Data from Rishika Infra's PDF profiles
const SECTORS = [
  { label: 'Power Grid and Utilities', href: '#power' },
  { label: 'Renewables & Solar', href: '#solar' },
  { label: 'Capital Projects & Infra', href: '#infra' },
  { label: 'Roads & Highways', href: '#roads' },
  { label: 'Telecom Towers', href: '#telecom' },
];

const SOLUTIONS = [
  { label: 'Drone Inspections', href: '#inspections' },
  { label: 'Thermal Diagnostics', href: '#thermal' },
  { label: 'Geospatial Surveys', href: '#surveys' },
  { label: '3D Mapping (BIM)', href: '#mapping' },
  { label: 'AI Traffic Management', href: '#traffic' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <header className="absolute w-full z-50 top-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="text-white font-extrabold text-2xl tracking-tighter flex items-center gap-1">
            <span className="text-brand-yellow text-3xl mb-1">↗</span> ri
          </div>
          <div className="border-l border-white/30 pl-2 ml-2">
            <span className="block text-white font-bold leading-none tracking-widest text-sm uppercase">Rishika</span>
            <span className="block text-gray-400 font-medium text-[10px] tracking-widest uppercase mt-0.5">Infra</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full gap-8 text-sm font-semibold text-white">
          
          {/* SECTORS DROPDOWN */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('sectors')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#sectors" className="hover:text-brand-yellow transition-colors cursor-pointer flex items-center h-full">
              SECTORS
            </a>
            <AnimatePresence>
              {activeMenu === 'sectors' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 w-64 bg-brand-yellow shadow-xl border-t-2 border-brand-yellowHover"
                >
                  <ul className="py-4">
                    {SECTORS.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block px-6 py-2.5 text-brand-dark hover:bg-brand-yellowHover transition-colors text-sm font-bold flex items-center gap-2 group">
                          <span className="w-4 h-4 text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* OUR SOLUTIONS DROPDOWN */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#solutions" className="hover:text-brand-yellow transition-colors cursor-pointer flex items-center h-full">
              OUR SOLUTIONS
            </a>
            <AnimatePresence>
              {activeMenu === 'solutions' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 w-64 bg-brand-yellow shadow-xl border-t-2 border-brand-yellowHover"
                >
                  <ul className="py-4">
                    {SOLUTIONS.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block px-6 py-2.5 text-brand-dark hover:bg-brand-yellowHover transition-colors text-sm font-bold flex items-center gap-2 group">
                          <span className="w-4 h-4 text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Static Links */}
          <a href="#platform" className="hover:text-brand-yellow transition-colors flex items-center h-full">PLATFORM</a>
          <a href="#about" className="hover:text-brand-yellow transition-colors flex items-center h-full">ABOUT</a>
          <a href="#contact" className="text-brand-yellow hover:text-white transition-colors flex items-center h-full">CONTACT</a>
        </nav>
      </div>
    </header>
  );
}