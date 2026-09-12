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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

  // Add a slight dark background to the navbar when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =========================================================
          1. THE HEADER (Stays on top at z-50)
          ========================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#17212B]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <a href="/" className="flex items-center gap-4 group relative z-[60]">
            <div className="relative flex items-center justify-center w-14 h-14">
              <style>{`
                @keyframes drone-float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-4px); }
                  100% { transform: translateY(0px); }
                }
                .animate-drone-float {
                  animation: drone-float 4s ease-in-out infinite;
                }
              `}</style>
              <svg 
                viewBox="0 0 200 250" 
                className="w-full h-full animate-drone-float transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="20" y1="50" x2="180" y2="125" stroke="#2B79C2" strokeWidth="12" strokeDasharray="24 16" />
                <polygon points="110,35 50,130 90,110 102,150" fill="#FFFFFF" />
                <circle cx="98" cy="165" r="8" fill="#2B79C2" />
                <text x="58" y="217" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="900" fontStyle="italic" fill="#FFFFFF">r</text>
                <polygon points="91,178 106,178 97,217" fill="#FFFFFF" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-light tracking-[0.2em] text-white">RISHIKA</span>
                <span className="text-xl font-extrabold tracking-[0.1em] text-white">INFRA</span>
              </div>
              <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-0.5">
                Delivering Safer, Smarter, and More Efficient Inspections.
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-10">
            
            {/* OUR SOLUTIONS - Animated Dropdown */}
            <div className="relative group py-4">
              <button type="button" className="text-[13px] font tracking-widest uppercase text-white hover:text-[#FFC62F] transition-colors flex items-center gap-2">
                Our Solutions
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform duration-300 group-hover:rotate-180"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              
              <div className="absolute top-full left-0 w-72 bg-[#FFC62F] shadow-2xl rounded-b-lg overflow-hidden origin-top transform scale-y-0 opacity-0 transition-all duration-300 ease-out group-hover:scale-y-100 group-hover:opacity-100">
                <div className="py-2">
                  {SOLUTIONS.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.href} 
                      className="group/item flex items-center justify-between px-6 py-3.5 text-[#17212B] hover:bg-[#E5B22A] transition-colors"
                    >
                      <span className="font text-[13px] tracking-wide transform transition-transform duration-300 group-hover/item:translate-x-2">
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

            {/* ABOUT */}
            <a href="/about" className="text-[13px] font tracking-widest uppercase text-white hover:text-[#FFC62F] transition-colors">
              About
            </a>

            {/* CONTACT BUTTON */}
            <a href="/contact" className="ml-4 rounded-full bg-[#FFC62F] px-8 py-3 text-[13px] font tracking-widest text-[#17212B] uppercase transition-all hover:bg-[#FFD85C] hover:scale-105 hover:shadow-lg">
              Contact us
            </a>
          </nav>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <button 
            type="button"
            className="lg:hidden relative z-[60] text-white hover:text-[#FFC62F] transition-colors p-3 -mr-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>

        </div>
      </header>

      {/* =========================================================
          2. THE MOBILE OVERLAY (Slides underneath the header at z-40)
          ========================================================= */}
      <div 
        className={`fixed inset-0 bg-[#17212B] z-40 lg:hidden flex flex-col pt-28 px-6 pb-6 overflow-y-auto transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
          
          {/* Mobile Solutions Accordion */}
          <div className="flex flex-col border-b border-white/10 py-4">
            <button 
              type="button"
              onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
              className="flex items-center justify-between text-[15px] font tracking-widest uppercase text-white w-full text-left py-2"
            >
              Our Solutions
              <svg 
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180 text-[#FFC62F]' : ''}`}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${isMobileSolutionsOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              {SOLUTIONS.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[13px] text-gray-300 hover:text-[#FFC62F] pl-4 border-l-2 border-transparent hover:border-[#FFC62F] transition-all tracking-wide py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <a 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[15px] font tracking-widest uppercase text-white border-b border-white/10 py-5 hover:text-[#FFC62F] transition-colors block"
          >
            About
          </a>
        </div>

        <div className="mt-8">
          <a 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-full rounded-full bg-[#FFC62F] py-4 text-[13px] font tracking-widest text-[#17212B] uppercase hover:bg-[#FFD85C] transition-colors"
          >
            Contact us
          </a>
        </div>
      </div>
    </>
  );
}