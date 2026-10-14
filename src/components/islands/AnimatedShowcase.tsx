import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  tabLabel: string;
  heading: string;
  tagline: string;
  description: string;
  image: string;
}

interface AnimatedShowcaseProps {
  subtitle: string;
  title: string;
  data: TabItem[];
}

export default function AnimatedShowcase({ subtitle, title, data }: AnimatedShowcaseProps) {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const activeData = data.find(tab => tab.id === activeTab) || data[0];
  const activeIndex = data.findIndex(tab => tab.id === activeTab);
  
  // Calculate width for the yellow connecting line
  const progressPercentage = (activeIndex / (data.length - 1)) * 100;

  return (
    <div className="w-full bg-[#17212B] py-24 relative overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FFC62F] font-bold text-sm tracking-[0.25em] uppercase mb-4">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-20">
            {title}
          </h2>

          {/* Interactive Progress Navigation */}
          <div className="relative max-w-4xl mx-auto mb-16">
            {/* Background Track Line */}
            <div className="absolute top-[11px] left-8 right-8 h-[2px] bg-gray-700 z-0"></div>
            
            {/* Animated Yellow Fill Line */}
            <div 
              className="absolute top-[11px] left-8 h-[2px] bg-[#FFC62F] z-0 transition-all duration-500 ease-out"
              style={{ width: `calc(${progressPercentage}% - 4rem)` }} // Subtract padding to align perfectly with dots
            ></div>
            
            <div className="flex justify-between relative z-10">
              {data.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="group flex flex-col items-center"
                >
                  {/* Node Dot */}
                  <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center mb-4 transition-colors duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-[#FFC62F] border-[#17212B] shadow-[0_0_15px_rgba(255,198,47,0.5)]' 
                      : 'bg-gray-700 border-[#17212B] group-hover:bg-gray-500'
                  }`}></div>
                  
                  {/* Node Label */}
                  <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                    activeTab === tab.id ? 'text-[#FFC62F]' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {tab.tabLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card (White Box from Video) */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-w-6xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-0 h-full"
            >
              {/* Left Image Section */}
              <div className="lg:col-span-5 h-[300px] lg:h-[450px] p-4 lg:p-6">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={activeData.image} 
                    alt={activeData.heading}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Right Text Section */}
              <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
                <p className="text-[#FFC62F] font-bold text-sm tracking-widest uppercase mb-4">
                  {activeData.tabLabel}
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