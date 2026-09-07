import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RENEWABLES_DATA = [
  {
    id: 'solar',
    title: 'SOLAR',
    tagline: 'Utility-scale solar farms demand fast, full-coverage diagnostics.',
    heading: 'Full array inspections to spot panel defects',
    description: 'Manual ground checks miss defects and delay fault finding, while thermal anomalies silently erode yield. Rishika Infra\'s drone-mounted thermal and visual inspections provide rapid, full-array detection of hotspots, string failures, and panel degradation. Findings are centralized in digital twins where operators can track plant health and optimize maintenance planning.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'wind',
    title: 'WIND',
    tagline: 'Giving blades the attention they deserve.',
    heading: 'Capturing ultra-high-res visual and thermal data',
    description: 'Blades are where revenue is won or lost. Even sub-millimeter erosion can drain Annual Energy Production, while undetected cracks risk catastrophic failure. Our drone deployments replace traditional rope-access methods, capturing ultra-high-resolution visual and thermal data safely from the air to detect cracks, lightning strikes, and leading-edge erosion at scale.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function RenewablesTabs() {
  const [activeTab, setActiveTab] = useState(RENEWABLES_DATA[0].id);
  const activeData = RENEWABLES_DATA.find(tab => tab.id === activeTab) || RENEWABLES_DATA[0];

  return (
    <div className="w-full bg-[#17212B] py-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#1D2630] to-transparent z-0"></div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 relative z-10">
        
        {/* Header & Navigation */}
        <div className="text-center mb-16">
          <p className="text-[#FFC62F] font-bold text-sm tracking-[0.25em] uppercase mb-4">
            Clear Data, Clean Energy
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16">
            Powering renewables
          </h2>

          {/* Simple Curved-Style Navigation */}
          <div className="flex justify-center items-center gap-8 md:gap-24 relative max-w-2xl mx-auto">
            {/* Connecting dashed line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] border-t border-dashed border-white/20 -z-10"></div>
            
            {RENEWABLES_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex flex-col items-center transition-all duration-300 ${
                  activeTab === tab.id ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div className={`w-4 h-4 rounded-full mb-3 transition-colors duration-300 border-2 ${
                  activeTab === tab.id 
                    ? 'bg-[#FFC62F] border-[#FFC62F] shadow-[0_0_15px_rgba(255,198,47,0.5)]' 
                    : 'bg-[#17212B] border-gray-400 group-hover:border-gray-200'
                }`}></div>
                <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-[#FFC62F]' : 'text-gray-400 group-hover:text-gray-200'
                }`}>
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Card (White Box from Video) */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-0 h-full"
            >
              {/* Left Image Section */}
              <div className="lg:col-span-5 h-[300px] lg:h-auto p-4 lg:p-6">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={activeData.image} 
                    alt={activeData.heading}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Right Text Section */}
              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-[#FFC62F] font-bold text-sm tracking-widest uppercase mb-4">
                  {activeData.title}
                </p>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-[#17212B] mb-4 leading-tight">
                  {activeData.heading}
                </h3>
                <h4 className="text-[17px] font-bold text-gray-800 mb-6">
                  {activeData.tagline}
                </h4>
                <p className="text-[16px] text-gray-600 leading-relaxed">
                  {activeData.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}