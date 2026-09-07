import React, { useState, useEffect } from 'react';

const SOLUTIONS = [
  { label: 'Powerline Inspection', href: '/services/powerline-inspection' },
  { label: 'Solar Thermal Inspection', href: '/services/solar-inspection' },
  { label: 'Geospatial Mapping', href: '/services/geospatial-mapping' },
  { label: 'LiDAR Engineering', href: '#' },
  { label: '3D Modeling (BIM)', href: '#' },
  { label: 'Traffic Management (AI)', href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a slight dark background to the navbar when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#17212B]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <a href="/" className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#FFC62F] transition-transform duration-500 group-hover:rotate-180">
            <div className="text-[20px] leading-none text-white">≋</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-light tracking-[0.2em] text-white">RISHIKA</span>
              <span className="text-xl font-extrabold tracking-[0.1em] text-white">INFRA</span>
            </div>
            <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-0.5">
              Your Assets. Better Decisions.
            </p>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-10">
          
          {/* OUR SOLUTIONS - Animated Dropdown */}
          <div className="relative group py-4">
            <button className="text-[13px] font-bold tracking-widest uppercase text-white hover:text-[#FFC62F] transition-colors flex items-center gap-2">
              Our Solutions
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform duration-300 group-hover:rotate-180"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            
            {/* The Dropdown Box */}
            <div className="absolute top-full left-0 w-72 bg-[#FFC62F] shadow-2xl rounded-b-lg overflow-hidden origin-top transform scale-y-0 opacity-0 transition-all duration-300 ease-out group-hover:scale-y-100 group-hover:opacity-100">
              <div className="py-2">
                {SOLUTIONS.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href} 
                    className="group/item flex items-center justify-between px-6 py-3.5 text-[#17212B] hover:bg-[#E5B22A] transition-colors"
                  >
                    <span className="font-extrabold text-[13px] tracking-wide transform transition-transform duration-300 group-hover/item:translate-x-2">
                      {item.label}
                    </span>
                    <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0 font-bold">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RISHIKA AI */}
          <a href="/#rishika-ai" className="text-[13px] font-bold tracking-widest uppercase text-white hover:text-[#FFC62F] transition-colors">
            Rishika AI
          </a>

          {/* ABOUT */}
          <a href="/about" className="text-[13px] font-bold tracking-widest uppercase text-white hover:text-[#FFC62F] transition-colors">
            About
          </a>

          {/* CONTACT BUTTON */}
          <a href="/contact" className="ml-4 rounded-full bg-[#FFC62F] px-8 py-3 text-[13px] font-bold tracking-widest text-[#17212B] uppercase transition-all hover:bg-[#FFD85C] hover:scale-105 hover:shadow-lg">
            Contact
          </a>
        </nav>

        {/* MOBILE MENU BUTTON (Hamburger) */}
        <button className="lg:hidden text-white hover:text-[#FFC62F]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

      </div>
    </header>
  );
}