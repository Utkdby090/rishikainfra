import React, { useState } from 'react';

export default function ThermalSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-cyber-border bg-cyber-dark shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-cyber-panel border-b border-cyber-border text-xs font-mono text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          LIVE ASSET TELEMETRY: EHV TOWER 400kV
        </span>
        <span className="text-brand-accent">SENSOR: DUAL RGB + RADIOMETRIC FLIR</span>
      </div>

      {/* Viewport Container */}
      <div className="relative h-[380px] sm:h-[460px] select-none overflow-hidden">
        {/* Visual RGB Layer (Bottom) */}
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-center p-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-mono rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              HIGH-RES RGB OPTICAL (4K)
            </span>
            <p className="text-gray-400 text-sm max-w-md">
              Visible spectrum inspection captures structural deformation, cracked insulator discs, and physical hardware degradation.
            </p>
          </div>
        </div>

        {/* Thermal Infrared Layer (Top - Clipped by Slider) */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-950 via-red-900 to-amber-700 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="text-center p-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-mono rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              RADIOMETRIC THERMAL (HOTSPOT DETECTED: +39.6°C)
            </span>
            <p className="text-amber-100 text-sm max-w-md">
              Infrared thermography exposes micro-resistance spikes, dead-end joint overheating, and internal electrical anomalies before catastrophic failure.
            </p>
          </div>
        </div>

        {/* Draggable Divider Bar */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-cyber-dark flex items-center justify-center font-bold text-xs shadow-lg">
            ↔
          </div>
        </div>

        {/* Range Input for Native Dragging & Accessibility */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          aria-label="Thermal vs Visual comparison slider"
        />
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-cyber-panel/60 text-xs text-gray-400 border-t border-cyber-border">
        <span>◀ Drag left for Thermal Hotspot</span>
        <span>Drag right for 4K Optical ▶</span>
      </div>
    </div>
  );
}