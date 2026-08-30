import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Array of clients matching your provided logo image
// Make sure to save the cropped logos into your public/images/clients/ folder!
const INITIAL_CLIENTS = [
  { id: 1, name: 'PowerGrid', src: '/images/clients/powergrid.png' },
  { id: 2, name: 'SpaGe', src: '/images/clients/spage.png' },
  { id: 3, name: 'KEC', src: '/images/clients/kec.png' },
  { id: 4, name: 'L&T Construction', src: '/images/clients/lt.png' },
  { id: 5, name: 'Kalpataru', src: '/images/clients/kalpataru.png' },
  { id: 6, name: 'Skipper Limited', src: '/images/clients/skipper.png' },
  { id: 7, name: 'Bajel', src: '/images/clients/bajel.png' },
];

export default function ClientCarousel() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  // Function to slide left
  const next = () => {
    setClients((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  // Function to slide right
  const prev = () => {
    setClients((prev) => {
      const newArray = [...prev];
      const last = newArray.pop();
      if (last) newArray.unshift(last);
      return newArray;
    });
  };

  // Auto-play interval (Moves every 3 seconds)
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex items-center w-full h-[120px] bg-white border-b border-gray-200 overflow-hidden">
      
      {/* Left Arrow */}
      <button 
        onClick={prev} 
        className="absolute left-0 z-20 flex h-full items-center justify-center bg-white px-4 lg:px-8 text-gray-400 hover:text-brand-dark transition-colors"
        aria-label="Previous Clients"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Sliding Logos Container */}
      <div className="flex-1 flex items-center justify-center gap-12 md:gap-20 overflow-hidden px-16">
        {clients.slice(0, 5).map((client) => (
          <motion.div 
            layout 
            key={client.id} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-16 w-32 shrink-0 items-center justify-center"
          >
            {/* 
              Displays the logo. If the image is missing from the folder, 
              it gracefully falls back to displaying the company name in text. 
            */}
            <img 
              src={client.src} 
              alt={client.name} 
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-sm font-bold text-gray-700 text-center uppercase tracking-wide">
              {client.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={next} 
        className="absolute right-0 lg:right-16 z-20 flex h-full items-center justify-center bg-white px-4 lg:px-8 text-gray-400 hover:text-brand-dark transition-colors"
        aria-label="Next Clients"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Cyberhawk-style Yellow Diagonal Stripes on the extreme right */}
      <div 
        className="hidden lg:block absolute right-0 top-0 h-full w-[4.5rem] z-30"
        style={{
          background: 'repeating-linear-gradient(-55deg, #FFC62F 0px, #FFC62F 18px, #FFFFFF 18px, #FFFFFF 28px)'
        }}
      ></div>
    </div>
  );
}