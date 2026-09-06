import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const NEWS = [
  { title: "Rishika Infra completes 10,000km NHAI corridor mapping", img: "https://images.unsplash.com/photo-1545042746-ec9e5a59b359?q=80&w=600&auto=format&fit=crop" },
  { title: "The power of Radiometric Thermal Drones in Solar Inspections", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop" },
  { title: "DGCA approves new Type-Certified SURVEYXK fleet operations", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop" },
  { title: "Affordability vs Modernization in the Indian Power Grid", img: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=600&auto=format&fit=crop" }
];

export default function NewsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-24 border-t border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#17212B] mb-12">Latest news</h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button onClick={() => scroll('left')} className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#FFC62F] transition-colors">
            ←
          </button>

          {/* Cards Container */}
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2">
            {NEWS.map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="min-w-[300px] md:min-w-[350px] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden snap-start cursor-pointer group/card">
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <h3 className="font-bold text-[#17212B] leading-snug mb-4 group-hover/card:text-[#0070BA] transition-colors">{item.title}</h3>
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover/card:border-[#FFC62F] group-hover/card:bg-[#FFC62F] transition-all">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={() => scroll('right')} className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#FFC62F] rounded-full shadow-lg flex items-center justify-center text-[#17212B] hover:scale-105 transition-transform">
            →
          </button>
        </div>
      </div>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}