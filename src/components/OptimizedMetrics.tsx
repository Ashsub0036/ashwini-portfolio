import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Search, Activity, Sparkles } from 'lucide-react';

export default function OptimizedMetrics() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metrics = [
    {
      title: 'Lightning Load Speed',
      val: '0.8s',
      label: 'LOAD TIME INDEX',
      desc: 'Optimized render cycles, modular code division, and minimal third-party payload footprint ensure speed.',
      ic: <Zap size={16} className="text-amber-400" />,
    },
    {
      title: 'Mobile Accessibility',
      val: '100%',
      label: 'RESPONSIVE DOCK',
      desc: 'Tested strictly across various grid frames and touch interfaces to enforce pixel-perfect balance.',
      ic: <Activity size={16} className="text-[#00bfff]" />,
    },
    {
      title: 'On-Page Search Rank',
      val: '99',
      label: 'SEO LAUNCH INDEX',
      desc: 'Configured with absolute meta tag properties, semantic tags, schema logs, and search visibility.',
      ic: <Search size={16} className="text-emerald-400" />,
    },
    {
      title: 'Modern Security',
      val: 'A+',
      label: 'ENCRYPTION CONSTANT',
      desc: 'Engineered with clean CORS handling, safe headers, dynamic content security structures, and robust API layers.',
      ic: <ShieldCheck size={16} className="text-pink-400" />,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      
      {/* Intro label and title info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-[#00bfff]" />
            <span className="text-[10px] font-mono tracking-widest text-[#00bfff] uppercase">
              // OUTSTANDING EFFICIENCY CONSOLE
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-light text-white tracking-tight leading-tight">
            Websites Configured for Performance
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            I build lightweight web assets that don't just feel elegant but perform at the absolute top tier. Bypassing templates ensures seamless performance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start px-3 py-1.5 bg-slate-900 border border-white/5 rounded text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Core Web Vitals Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: SVG Interactive Chart */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl glassmorphism p-6 md:p-8 overflow-hidden relative group border border-white/5">
          <div className="absolute top-3 left-4 text-[7px] font-mono text-white/20">[LIVE_METRIC_PROOFS]</div>
          <div className="absolute top-3 right-4 text-[7.5px] font-mono text-emerald-400">STATUS: STABLE</div>

          <div className="space-y-1 mb-8">
            <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block">CORE SPEED INDEX ROADMAP</span>
            <h4 className="text-lg font-display font-light text-white">Dynamic Optimized Core Scaling</h4>
          </div>

          {/* Line Chart showing SEO / Core Score curve (mirroring the image files in techify) */}
          <div className="relative w-full h-44 flex items-end">
            <svg className="w-full h-full text-[#00bfff]" viewBox="0 0 400 150" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00bfff" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#00bfff" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Backgrid reference lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4,4" />

              {/* Dynamic spline curve path */}
              <path
                d="M 0 110 C 80 100, 120 70, 200 65 C 280 60, 320 25, 400 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Fill background gradient on path */}
              <path
                d="M 0 110 C 80 100, 120 70, 200 65 C 280 60, 320 25, 400 20 L 400 150 L 0 150 Z"
                fill="url(#chartGradient)"
              />

              {/* Data Node Points */}
              <circle cx="200" cy="65" r="4" fill="#00bfff" />
              <circle cx="400" cy="20" r="5" fill="#10b981" className="animate-pulse" />
              
              {/* Label tags in chart */}
              <text x="210" y="60" fill="rgba(255, 255, 255, 0.5)" fontSize="8" fontFamily="monospace">SEO INITIATED</text>
              <text x="325" y="15" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">99% CORE SCORE</text>
            </svg>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>START DEV LOGS</span>
            <span className="text-[#00bfff]">MAX RENDERING VISCOSITY ACCELERATED</span>
          </div>
        </div>

        {/* Right column: 4 Bento Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="rounded-xl glassmorphism p-5 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1 select-none cursor-default"
              style={{
                borderColor: hoveredIndex === idx ? 'rgba(0, 191, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                backgroundColor: hoveredIndex === idx ? 'rgba(7, 17, 31, 0.6)' : 'rgba(7, 17, 31, 0.4)'
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                <span className="text-[7.5px] font-mono text-gray-500 tracking-wider font-semibold uppercase">
                  {item.label}
                </span>
                <span className="p-1 rounded bg-white/5">{item.ic}</span>
              </div>

              <div className="my-3 space-y-1">
                <div className="text-3xl font-display font-black text-white leading-none">
                  {item.val}
                </div>
                <h5 className="text-xs font-display font-medium text-gray-200 mt-1">{item.title}</h5>
              </div>

              <p className="text-[9.5px] text-gray-400 font-light leading-normal font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
