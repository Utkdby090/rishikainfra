import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TAB_DATA = [
  {
    id: 'visual',
    title: 'Power Grid Inspection',
    icon: (
      <img 
        src="/images/our solutions/powerGridInspection/icons&images/powerLineDRoneInspection.png" 
        alt="Visual Inspection" 
        className="w-11 h-11 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
      />
    ),
    image: '/images/our solutions/powerGridInspection/rotationimages/dronepowergridinspection.jpg',
    heading: 'External aerial inspections',
    description: 'We utilize high-resolution RGB cameras with optical zoom to capture incredibly detailed visual data from safe standoff distances. This approach allows us to inspect conductors, jumper connections, and tower hardware fittings without requiring personnel to climb structures or work near energized equipment.',
    citation: '[cite: 1, 2]'
  },
  {
    id: 'thermal',
    title: 'Thermal Inspection',
    icon: (
      <img 
        src="/images/our solutions/powerGridInspection/icons&images/ThermalInspection.png" 
        alt="Thermal Diagnostics" 
        className="w-11 h-11 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
      />
    ),
    image: '/images/our solutions/powerGridInspection/rotationimages/ThermalInspectionDrone.png',
    heading: 'Thermography & Hotspot Detection',
    description: 'Thermal imaging enables us to detect hidden faults that are not visible to the naked eye. By deploying radiometric thermal sensors, our drones can identify thermal anomalies in dead-end joints, mid-span compression joints, and transformer equipment, allowing for rapid preventive maintenance before critical failures occur.',
    citation: '[cite: 1, 2]'
  },
  {
    id: 'substation',
    title: 'Substation Inspections',
    icon: (
      <img 
        src="/images/our solutions/powerGridInspection/icons&images/substationInspection.png" 
        alt="Substation Inspections" 
        className="w-11 h-11 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
      />
    ),
    image: '/images/our solutions/powerGridInspection/rotationimages/substationInspectionDrone.jpg',
    heading: 'Substation condition monitoring',
    description: 'Comprehensive structural inspections and equipment condition monitoring inside high-voltage substations. Our Type-Certified SURVEYXK platforms can safely navigate complex environments to deliver precise defect identification and actionable insights without requiring operational downtime.',
    citation: '[cite: 1]'
  }
];

export default function InteractiveInspectionTabs() {
  const [activeTab, setActiveTab] = useState(TAB_DATA[0].id);

  const activeData = TAB_DATA.find(tab => tab.id === activeTab) || TAB_DATA[0];

  return (
    <div className="w-full bg-[#F8F9FA] py-20 border-y border-gray-200">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* Navigation Diagram */}
        <div className="relative mb-20 max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-gray-300 z-0 border-t border-dashed border-gray-400"></div>
          
          <div className="flex justify-between relative z-10">
            {TAB_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center group w-1/4"
              >
                {/* Node Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 mb-4 shadow-sm border-4 ${
                  activeTab === tab.id 
                    ? 'bg-white border-[#FFC62F] scale-110' 
                    : 'bg-white border-transparent text-gray-400 group-hover:border-gray-300'
                }`}>
                  {tab.icon}
                </div>
                {/* Node Label */}
                <span className={`text-sm font-semibold transition-colors duration-300 text-center px-2 ${
                  activeTab === tab.id ? 'text-[#17212B]' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {tab.title}
                </span>
                {/* Active Indicator Line */}
                <div className={`h-1 w-8 mt-2 transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-[#FFC62F]' : 'bg-transparent'
                }`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Image inside Circular Mask (Left) */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-0 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-white"
              >
                <img 
                  src={activeData.image} 
                  alt={activeData.title}
                  className="w-full h-full object-cover"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#17212B]/40 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Decorative semi-circle outline */}
            <div className="absolute -inset-6 border-2 border-dashed border-gray-300 rounded-full opacity-50 pointer-events-none -z-10"></div>
          </div>

          {/* Text Content (Right) */}
          <div className="text-center lg:text-left min-h-[250px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#17212B] mb-6">
                  {activeData.heading}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {activeData.description}
                  <span className="text-xs text-gray-400 ml-1">{activeData.citation}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}