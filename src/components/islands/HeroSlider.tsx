import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-quality placeholder images representing Rishika's services
const SLIDES = [
  {
    id: 0,
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2500&auto=format&fit=crop',
    title: 'Advanced UAV Fleet',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2500&auto=format&fit=crop',
    title: 'Capital Projects & Infrastructure',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1518485203362-7208d20366eb?q=80&w=2500&auto=format&fit=crop',
    title: 'Solar & Renewables',
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={SLIDES[currentIndex].url}
          alt={SLIDES[currentIndex].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.4, scale: 1 }} // Kept at 0.4 opacity so the text remains readable
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
      </AnimatePresence>

      {/* Interactive Dots */}
      <div className="absolute bottom-10 right-10 flex gap-3 z-30">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx 
                ? 'bg-brand-yellow w-8' 
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}