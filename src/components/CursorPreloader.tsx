import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Sparkles, Terminal } from 'lucide-react';

interface CursorPreloaderProps {
  onComplete: () => void;
}

export default function CursorPreloader({ onComplete }: CursorPreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  // High-end cinematic boot-up telemetry lines
  const systemLogs = [
    'INITIATING COSMIC ENGINE FOR ASHWINI S...',
    'SYNTAX VALIDATED // TYPES UNIFIED',
    'PARSING LUXURY GLOW VECTORS...',
    'CALIBRATING SYNE & GEOMETRIC ARCHITECTURES...',
    'ESTABLISHING WEB INTERACTIVE CHORDS...',
    'PORTFOLIO ENGINE LOADED SUCCESSFULLY.',
  ];

  // Counter loop simulates standard luxury atelier pre-compilation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate towards completion
      const increment = current > 80 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 7) + 5;
      current = Math.min(100, current + increment);
      setPercent(current);

      // Increment technical telemetry logs based on percentage blocks
      if (current < 20) setLogIndex(0);
      else if (current < 45) setLogIndex(1);
      else if (current < 65) setLogIndex(2);
      else if (current < 80) setLogIndex(3);
      else if (current < 95) setLogIndex(4);
      else setLogIndex(5);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 800);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Handle desktop custom cursor movement
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const cursorRing = document.getElementById('custom-cursor-ring');
    if (!cursor || !cursorRing) return;

    // Hide standard cursor elements on mobile / touchscreen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      cursorRing.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Set values with custom coordinates
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Smooth follow lag for outer ring
      cursorRing.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 240, fill: 'forwards' }
      );
    };

    const handleHoverTargets = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursor.style.backgroundColor = '#00bfff';
        cursorRing.style.width = '64px';
        cursorRing.style.height = '64px';
        cursorRing.style.borderColor = 'rgba(0,191,255,1)';
        cursorRing.style.backgroundColor = 'rgba(0,191,255,0.08)';
      } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = '#00bfff';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(0, 191, 255, 0.3)';
        cursorRing.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHoverTargets);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHoverTargets);
    };
  }, []);

  return (
    <>
      {/* Absolute global elements for high-end mouse trails */}
      <div id="custom-cursor" className="custom-cursor pointer-events-none hidden md:block" />
      <div id="custom-cursor-ring" className="custom-cursor-ring pointer-events-none hidden md:block" />

      {/* Primary Preloading Curtain overlay and lock screen */}
      <AnimatePresence>
        {visible && (
          <motion.div
            id="cinema-preloader"
            initial={{ opacity: 1 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.9, cubicBezier: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 bg-[#030712] z-[99999] flex flex-col justify-between p-8 md:p-14"
          >
            {/* Top structural branding element */}
            <div className="flex justify-between items-center select-none">
              <div className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-[#00bfff]/80 uppercase font-semibold">
                <Terminal size={12} />
                <span>ATELIER ARCHITECTURE // ASHWINI S</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">EDITION 2026.1</span>
            </div>

            {/* Middle Big Percentage block */}
            <div className="text-center space-y-3">
              <div className="font-display font-black text-7xl md:text-9xl text-white tracking-widest leading-none flex justify-center items-baseline select-none select-none">
                <span>{percent < 10 ? `0${percent}` : percent}</span>
                <span className="text-2xl md:text-4xl text-[#00bfff] font-mono">%</span>
              </div>
              
              <div className="h-[2px] w-48 bg-slate-900 mx-auto rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 to-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.7)]" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Bottom active terminal report logs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-1 md:max-w-xl font-mono text-[9px] text-[#00bfff]/75">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[#00bfff] font-bold">SYSTEM STAT: CALIBRATING</span>
                </div>
                <p className="text-white/60 uppercase">{systemLogs[logIndex]}</p>
              </div>

              <span className="text-[10px] font-mono text-gray-400 select-none">
                [SECURE PROTOCOL ACTIVE]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
