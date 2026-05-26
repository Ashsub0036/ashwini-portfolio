import React, { useState, useEffect } from 'react';

import PortfolioImg from "./assets/PortfolioImg.jpeg";
import { 
  ArrowRight, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from 'framer-motion';
import { Magnetic } from './components/Magnetic';

// Luxury editorial motion presets for high-end staggered page reveals
export const editorialContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export const editorialItem = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as const // Luxury cubic-bezier curve
    }
  }
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mousePosition, setMousePosition] = useState({
  x: 0,
  y: 0,
});
const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const { scrollY } = useScroll();

const heroY = useTransform(
  scrollY,
  [0, 500],
  [0, 150]
);
   useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

  // Synchronize system themes and client preferences
  useEffect(() => {
    const stored = localStorage.getItem('ashTheme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
    } else {
      const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(sysDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ashTheme', theme);
  }, [theme]);


  // Track page scrolls to dynamically scale navigation heights
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);

  // Smooth scroll handler with cinematic Depth-Of-Field lens refocus transition
  const handleScrollTo = (id: string) => {
    setIsBlurring(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    
    // Luxurious manual lens pull duration
    setTimeout(() => {
      setIsBlurring(false);
    }, 750);
  };

  // Cinematic scroll reveals with a physical entering blur
  const revealVariants = {
    hidden: { 
      opacity: 0.6, 
      filter: 'blur(10px)', 
      y: 35 
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Image hover tilting state
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Low intensity luxury tilt coefficients
    const rotateX = -(y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease',
    });
  };

  const handleTiltMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <div className="relative min-h-screen transition-colors duration-500 overflow-x-hidden antialiased select-none">
      {/* Floating particles */}
<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
  {[...Array(20)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-[#00c47a]/30 rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
      }}
      animate={{
        y: [0, -100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 10,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  ))}
</div>
      <div
  className="pointer-events-none fixed inset-0 z-[1]"
  style={{
    background: `radial-gradient(
      600px at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(0,196,122,0.12),
      transparent 80%
    )`,
  }}
/>
      {/* Dynamic Keyframe Injection for seamless Marquee and Beam animations */}
      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .btn-glow-hover {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .btn-glow-hover:hover {
          box-shadow: 0 10px 30px var(--accent-glow);
        }
      `}</style>



      {/* ── THEME SWITCH PANEL (FLOATING ACCESSIBILITY) ── */}
      <motion.button 
        id="themeBtn"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-8 right-8 z-[300] w-12 h-12 rounded-full border border-neutral-300 dark:border-neutral-800 bg-[var(--surface)] text-[var(--text)] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 hover:border-[#00c47a] cursor-pointer"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={18} className="text-[#00c47a]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#080808]/95 z-[190] flex flex-col items-center justify-center gap-10 backdrop-blur-xl"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-white border border-white/10 rounded-full hover:border-[#00c47a] transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {['about', 'work', 'pricing'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onClick={() => handleScrollTo(item)}
                  className="font-display text-5xl tracking-widest text-[#f0ede8] hover:text-[#00c47a] transition-colors uppercase outline-none cursor-pointer"
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => handleScrollTo('contact')}
                className="font-display text-5xl tracking-widest text-[#00c47a] hover:opacity-85 transition-opacity uppercase outline-none cursor-pointer"
              >
                Hire Me
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVIGATION ATELIER HEADER ── */}
      <nav 
        id="nav" 
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] transition-all duration-300 ${
          isScrolled ? 'py-4 px-6 md:px-12' : 'py-5 px-6 md:px-12'
        }`}
      >
        <a href="#" className="nav-logo font-display text-2xl tracking-[3px] text-[var(--text)] decoration-none select-none">
          ASH<span className="text-[#00c47a]">.</span>
        </a>
        
        {/* Desktop Anchor Links */}
        <ul className="nav-links hidden md:flex items-center gap-10 list-none">
          {['about', 'work', 'pricing'].map((item) => (
            <li key={item}>
              <button 
                onClick={() => handleScrollTo(item)}
                className="text-[11px] font-mono tracking-[2.5px] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors relative pb-1 group cursor-pointer"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00c47a] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
          <li>
            <Magnetic>
              <button 
                onClick={() => handleScrollTo('contact')}
                className="text-[11px] font-mono tracking-[2.5px] uppercase border border-[#00c47a] text-[#00c47a] hover:bg-[#00c47a] hover:text-[var(--bg)] px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Hire Me
              </button>
            </Magnetic>
          </li>
        </ul>

        {/* Mobile Hamburger toggle */}
        <button 
          id="hamburger" 
          onClick={() => setMobileMenuOpen(true)}
          className="hamburger flex md:hidden flex-col gap-1.5 p-2 cursor-pointer outline-none border border-neutral-300 dark:border-neutral-800 rounded-lg justify-center items-center h-10 w-10 text-[var(--text)]"
        >
          <span className="block w-5 h-[1.5px] bg-current" />
          <span className="block w-5 h-[1.5px] bg-current" />
          <span className="block w-5 h-[1.5px] bg-current" />
        </button>
      </nav>

      {/* ── CINEMATIC DEPTH OF FIELD CONTENT WRAPPER ── */}
      <div 
        className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isBlurring ? 'blur-[8px] scale-[0.993] opacity-80' : 'blur-none scale-100 opacity-100'
        }`}
      >

        {/* ── HERO THEATRICAL ASSEMBLY ── */}
        <section className="hero relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-16" id="home">
        <div className="hero-noise" />
        {/* Architectural vertical grid structures (User's trademark look) */}
        <div className="hero-line absolute top-0 bottom-0 width-[1px] bg-[var(--border)] pointer-events-none left-[25%] hidden md:block" />
        <div className="hero-line absolute top-0 bottom-0 width-[1px] bg-[var(--border)] pointer-events-none left-[50%] hidden md:block" />
        <div className="hero-line absolute top-0 bottom-0 width-[1px] bg-[var(--border)] pointer-events-none left-[75%] hidden md:block" />
        
        <div className="hero-glow absolute top-1/4 left-[-10%] w-[550px] height-[550px] rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
  style={{ y: heroY }}
  className="relative z-10 max-w-6xl"
>x</motion.div>
          
          {/* Status availability beacon */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="avail-pill inline-flex items-center gap-2 border border-[var(--border-md)] bg-[var(--surface)] px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[2px] uppercase text-[var(--muted)] mb-8"
          >
            <span className="avail-dot w-2 h-2 rounded-full bg-[#00c47a] animate-pulse" />
            Available for freelance projects
          </motion.div>

          {/* Master Display Heading */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="hero-title font-display text-[clamp(4.2rem,11vw,11rem)] leading-[0.85] text-[var(--text)] tracking-tight uppercase"
            >
              ASHWINI<br />
              <span className="text-transparent font-light transition-colors duration-500 [-webkit-text-stroke:1px_rgba(17,17,16,0.15)] dark:[-webkit-text-stroke:1px_rgba(240,237,232,0.15)]">
                <span className="font-serif italic text-[#00c47a] lowercase [-webkit-text-stroke:0] mr-2">builds the</span>
              </span>
              WEB.
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-sub text-[11px] font-mono tracking-[4px] uppercase text-[var(--muted)] mt-6"
          >
            Web Designer &amp; Developer · Chennai, India
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-desc max-w-lg text-[var(--muted)] text-[15px] font-light leading-relaxed mt-4 mb-8"
          >
            Premium web design &amp; development. I craft fast, beautiful websites with Next.js, React, and Tailwind — built to grow your brand.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-cta flex flex-wrap gap-4"
          >
            <Magnetic>
              <button 
                onClick={() => handleScrollTo('work')}
                className="btn-primary btn-glow-hover bg-[#00c47a] text-white px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-[1.5px] uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
              >
                View My Work <ArrowRight size={14} />
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => handleScrollTo('contact')}
                className="btn-outline border border-[var(--border-md)] text-[var(--text)] hover:border-[#00c47a] hover:bg-neutral-200 dark:hover:bg-neutral-800/40 px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-[1.5px] uppercase transition-all cursor-pointer"
              >
                Start a Project →
              </button>
            </Magnetic>
          </motion.div>

        


        {/* Scroll tracker handle absolute positioned */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={() => handleScrollTo('about')}
          className="hero-scroll absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-3 text-[10px] font-mono tracking-[3px] uppercase text-[var(--muted)] cursor-pointer hover:opacity-100 transition-opacity"
        >
          <span className="writing-mode-vertical rotate-180">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--muted)] to-transparent" />
        </motion.div>
      </section>

      {/* ── HIGH SPEED INFINITE MARQUEE TAPE ── */}
      <div className="marquee-wrap overflow-hidden bg-[#00c47a] py-3.5 border-y border-[#00c47a]/20">
        <div className="marquee-track flex w-max animate-marquee">
          {Array(4).fill([
            "WEB DESIGN", "NEXT.JS", "UI/UX", "REACT.JS", "SEO", "TAILWIND CSS", "FRAMER MOTION", "FIGMA", "MOBILE-FIRST", "FULL STACK"
          ]).flat().map((item, idx) => (
            <div key={idx} className="marquee-item font-display text-[15px] text-white tracking-[5px] uppercase px-12 flex items-center gap-10 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-[10px] opacity-70">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ME SECTOR ── */}
      <section className="about bg-[var(--surface)] py-24 px-6 md:px-12 border-t border-[var(--border)]" id="about">
        <motion.div 
          variants={editorialContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Tilt Frame */}
            <motion.div 
              variants={editorialItem}
              className="md:col-span-5 flex justify-center w-full"
            >
              <div 
                onMouseMove={handleTiltMouseMove}
                onMouseLeave={handleTiltMouseLeave}
                style={tiltStyle}
                className="about-frame w-full aspect-[3/4] bg-[var(--surface2)] border border-[var(--border)] rounded-[4px] relative overflow-hidden flex items-center justify-center select-none shadow-md group"
              >
                <img
  src={PortfolioImg}
  alt="Ashwini"
  className="w-full h-full object-contain scale-105"
/>
                <div className="about-badge absolute bottom-6 right-6 bg-[#00c47a] text-white px-4 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-[1px] uppercase flex items-center gap-1.5 shadow-md">
                  <span className="avail-dot w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Open To Work
                </div>
              </div>
            </motion.div>

            {/* Narrative Column */}
            <div className="md:col-span-7 space-y-6">
              <motion.span variants={editorialItem} className="eyebrow block text-[11px] font-mono tracking-[4px] text-[#00c47a] uppercase font-bold">
                // About Me
              </motion.span>
              
              <div className="overflow-hidden">
                <motion.h2 
                  variants={editorialItem}
                  className="sec-h font-display text-4xl md:text-6xl leading-[0.95] text-[var(--text)] tracking-tight uppercase"
                >
                  ONE MIND,<br />
                  <span className="font-serif italic text-[#00c47a] lowercase font-light">clear vision.</span>
                </motion.h2>
              </div>

              <motion.div 
                variants={editorialItem}
                className="space-y-4"
              >
                <p className="about-bio text-[16px] text-[var(--muted)] font-light leading-[1.85]">
                  I'm Ashwini — a web designer and developer from Chennai. I build <strong className="text-[#00c47a] font-medium">premium websites</strong> with beautiful design, lightning performance, and real business results.
                </p>
                <p className="about-bio text-[16px] text-[var(--muted)] font-light leading-[1.85]">
                  No big agency overhead. Just focused, intentional craft — from wireframe to live website. Clean code, bold design, and zero compromises.
                </p>
              </motion.div>

              {/* Technologies chip lists */}
              <motion.div 
                variants={editorialItem}
                className="chips flex flex-wrap gap-2 pt-2"
              >
                {["Next.js", "React", "Tailwind CSS", "Framer Motion", "Figma", "TypeScript", "Spring Boot", "MySQL", "SEO"].map((tech) => (
                  <span key={tech} className="chip border border-[var(--border-md)] hover:border-[#00c47a] hover:text-[#00c47a] px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-[0.5px] text-[var(--muted)] transition-all">
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.div 
                variants={editorialItem}
                className="pt-2"
              >
                <Magnetic>
                  <button 
                    onClick={() => handleScrollTo('contact')}
                    className="btn-primary bg-[#00c47a] text-white px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-[1.5px] uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Let's Work Together →
                  </button>
                </Magnetic>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── SERVICES UTILITY SECTOR ── */}
      <section className="services bg-[var(--bg)] py-24 px-6 md:px-12 border-t border-[var(--border)]">
        <motion.div 
          variants={editorialContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-5xl mx-auto space-y-12"
        >
          
          <motion.div variants={editorialItem} className="text-center space-y-2">
            <span className="eyebrow block text-[11px] font-mono tracking-[4px] text-[#00c47a] uppercase pb-1 font-bold">
              What I Do
            </span>
          </motion.div>

          <div className="svc-grid grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] overflow-hidden rounded-[4px] shadow-sm">
            
            <motion.div 
              variants={editorialItem}
              className="svc-card bg-[var(--surface)] hover:bg-[var(--surface2)] px-8 py-10 transition-all duration-300 border-b md:border-b-0 md:border-r border-[var(--border)] relative group"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00c47a] transition-all duration-500 group-hover:w-full" />
              <div className="svc-num font-display text-[3.2rem] text-[#00c47a] opacity-35 leading-none mb-4">
                01
              </div>
              <h3 className="svc-title text-[17px] font-bold text-[var(--text)] mb-3 tracking-tight">
                Web Design
              </h3>
              <p className="svc-desc text-[14px] text-[var(--muted)] leading-relaxed font-light">
                Pixel-perfect UI designs in Figma. Clean, modern layouts with intentional typography, color, and motion that make your brand unforgettable.
              </p>
            </motion.div>

            <motion.div 
              variants={editorialItem}
              className="svc-card bg-[var(--surface)] hover:bg-[var(--surface2)] px-8 py-10 transition-all duration-300 border-b md:border-b-0 md:border-r border-[var(--border)] relative group"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00c47a] transition-all duration-500 group-hover:w-full" />
              <div className="svc-num font-display text-[3.2rem] text-[#00c47a] opacity-35 leading-none mb-4">
                02
              </div>
              <h3 className="svc-title text-[17px] font-bold text-[var(--text)] mb-3 tracking-tight">
                Development
              </h3>
              <p className="svc-desc text-[14px] text-[var(--muted)] leading-relaxed font-light">
                High-performance sites built with React, Next.js, and Tailwind. Fast loads, responsive across all devices, production-ready code.
              </p>
            </motion.div>

            <motion.div 
              variants={editorialItem}
              className="svc-card bg-[var(--surface)] hover:bg-[var(--surface2)] px-8 py-10 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00c47a] transition-all duration-500 group-hover:w-full" />
              <div className="svc-num font-display text-[3.2rem] text-[#00c47a] opacity-35 leading-none mb-4">
                03
              </div>
              <h3 className="svc-title text-[17px] font-bold text-[var(--text)] mb-3 tracking-tight">
                SEO &amp; Launch
              </h3>
              <p className="svc-desc text-[14px] text-[var(--muted)] leading-relaxed font-light">
                On-page SEO, analytics setup, and performance optimization — so your site ranks, loads fast, and converts visitors into customers.
              </p>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* ── CINEMATIC PROJECTS SECTOR ── */}
<section
  className="projects bg-[var(--bg2)] py-24 px-6 md:px-12 border-t border-[var(--border)] font-sans"
  id="work"
>
  <motion.div
    variants={editorialContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-10% 0px' }}
    className="max-w-5xl mx-auto space-y-12"
  >

    {/* SECTION HEADER */}
    <motion.div
      variants={editorialItem}
      className="proj-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8"
    >
      <div className="space-y-3">
        <span className="eyebrow block text-[11px] font-mono tracking-[4px] text-[#00c47a] uppercase font-bold">
          Selected Work
        </span>

        <h2 className="sec-h font-display text-4xl md:text-6xl leading-[0.95] text-[var(--text)] tracking-tight uppercase">
          BUILT WITH
          <br />

          <span className="font-serif italic text-[#00c47a] lowercase font-light">
            intention.
          </span>
        </h2>
      </div>

      <Magnetic>
        <button
          onClick={() => handleScrollTo('contact')}
          className="btn-outline border border-[var(--border-md)] text-[var(--text)] hover:border-[#00c47a] hover:bg-neutral-200 dark:hover:bg-neutral-800/40 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer"
        >
          Start a Project →
        </button>
      </Magnetic>
    </motion.div>

    {/* PROJECT GRID */}
    <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

      {/* ───────────────────────────────────────── */}
      {/* PROJECT 1 — PON AGRO */}
      {/* ───────────────────────────────────────── */}
      <motion.a
        variants={editorialItem}
        className="pcard featured md:col-span-2 border border-[var(--border)] bg-[var(--surface3)] relative overflow-hidden flex flex-col transition-all duration-500 rounded-[4px] group"
        href="https://pon-agro-website.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="pcard-img relative w-full aspect-[2/1] md:aspect-[21/8] overflow-hidden bg-black">

  {/* LIVE WEBSITE PREVIEW */}
  <div className="absolute inset-0 scale-[1.15] origin-top">
    <iframe
      src="https://pon-agro-website.vercel.app/"
      className="w-full h-full pointer-events-none"
      loading="lazy"
    />
  </div>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/10" />

  {/* GREEN GLOW */}
  <div className="absolute inset-0 opacity-40 mix-blend-screen">
    <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00c47a]/20 blur-[120px] top-[-20%] left-[-10%]" />
  </div>

  {/* BADGE */}
  <div className="absolute top-6 left-6 bg-[#00c47a]/15 border border-[#00c47a]/30 text-[#00c47a] px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[2px] uppercase shadow-md">
    Real Client Project
  </div>

  {/* VISIT BUTTON */}
  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[2px] uppercase text-white/70 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
    Visit Website ↗
  </div>

  {/* HOVER ARROW */}
  <div className="absolute top-1/2 right-12 -translate-y-1/2 bg-[#00c47a] text-white w-14 h-14 rounded-full flex items-center justify-center text-xl hover:scale-110 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
    ↗
  </div>

</div>

        {/* CONTENT */}
        <div className="pcard-content p-6 md:p-8 relative">
          <p className="pcard-num font-mono text-[11px] tracking-[4px] text-[#00c47a] opacity-80 mb-2">
            01 — Business Website
          </p>

          <h3 className="pcard-title font-display text-3xl md:text-4xl text-[var(--text)] mb-3 tracking-tight">
            PON AGRO Website
          </h3>

          <p
            className={`pcard-desc text-[14px] leading-relaxed mb-4 md:max-w-2xl ${
              theme === 'light'
                ? 'text-neutral-900 font-normal'
                : 'text-[var(--muted)] font-light'
            }`}
          >
            Designed and developed a complete business website for PON AGRO
            with modern UI, responsive layouts, premium branding, and
            performance-focused development tailored for a real agricultural
            business.
          </p>

          {/* STACK */}
          <div className="stack-row flex flex-wrap gap-1.5">
            <span className="stk px-3 py-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full text-[10px] text-[var(--muted)] font-mono tracking-[1px]">
              React
            </span>

            <span className="stk px-3 py-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full text-[10px] text-[var(--muted)] font-mono tracking-[1px]">
              Tailwind CSS
            </span>

            <span className="stk px-3 py-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full text-[10px] text-[var(--muted)] font-mono tracking-[1px]">
              Vite
            </span>

            <span className="stk px-3 py-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full text-[10px] text-[var(--muted)] font-mono tracking-[1px]">
              Responsive Design
            </span>
          </div>
        </div>
      </motion.a>

      {/* ───────────────────────────────────────── */}
      {/* PROJECT 2 — BRIDAL */}
      {/* ───────────────────────────────────────── */}
      <motion.a
        variants={editorialItem}
        className="pcard border border-[var(--border)] bg-[var(--surface3)] relative overflow-hidden flex flex-col transition-all duration-500 rounded-[4px] group"
        href="https://ashu-bridal-makeup.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
       <div className="pcard-img relative w-full aspect-[4/3] overflow-hidden bg-black">

  {/* LIVE WEBSITE PREVIEW */}
  <div className="absolute inset-0 scale-[1.2] origin-top">
    <iframe
      src="https://ashu-bridal-makeup.vercel.app/"
      className="w-full h-full pointer-events-none"
      loading="lazy"
    />
  </div>

  {/* CINEMATIC OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/10" />

  {/* PINK LUXURY GLOW */}
  <div className="absolute inset-0 opacity-40 mix-blend-screen">
    <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[120px] top-[-20%] right-[-10%]" />
  </div>

  {/* VISIT BUTTON */}
  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[2px] uppercase text-white/70 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
    Visit Website ↗
  </div>

  {/* HOVER ARROW */}
  <div className="absolute top-1/2 right-8 -translate-y-1/2 bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
    ↗
  </div>

</div>

        <div className="pcard-content p-6 flex-grow relative">
          <p className="pcard-num font-mono text-[11px] tracking-[4px] text-[#00c47a] opacity-80 mb-2">
            02 — Luxury UI
          </p>

          <h3 className="pcard-title font-display text-2xl md:text-3xl text-[var(--text)] mb-3 tracking-tight">
            Bridal Makeup Website
          </h3>

          <p
            className={`pcard-desc text-[13.5px] leading-relaxed mb-4 ${
              theme === 'light'
                ? 'text-neutral-900 font-normal'
                : 'text-[var(--muted)] font-light'
            }`}
          >
            Luxury bridal makeup website crafted with elegant visual
            storytelling, smooth transitions, premium branding, and cinematic
            layouts.
          </p>
        </div>
      </motion.a>

      {/* ───────────────────────────────────────── */}
      {/* PROJECT 3 — INTERIOR */}
      {/* ───────────────────────────────────────── */}
      <motion.div
        variants={editorialItem}
        className="pcard border border-[var(--border)] bg-[var(--surface3)] relative overflow-hidden flex flex-col transition-all duration-500 rounded-[4px] group"
      >
        <div className="pcard-img relative w-full aspect-[4/3] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-[#191612] via-[#221d18] to-[#2b241d]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-[2.5rem] text-[#b8924a]/20 uppercase text-center leading-tight">
              INTERIOR
              <br />
              DESIGN
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

          <div className="absolute top-6 left-6 bg-[#b8924a]/15 border border-[#b8924a]/30 text-[#b8924a] px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[2px] uppercase shadow-md">
            Coming Soon
          </div>
        </div>

        <div className="pcard-content p-6 flex-grow relative">
          <p className="pcard-num font-mono text-[11px] tracking-[4px] text-[#00c47a] opacity-80 mb-2">
            03 — Motion Design
          </p>

          <h3 className="pcard-title font-display text-2xl md:text-3xl text-[var(--text)] mb-3 tracking-tight">
            Luxury Interior Website
          </h3>

          <p
            className={`pcard-desc text-[13.5px] leading-relaxed mb-4 ${
              theme === 'light'
                ? 'text-neutral-900 font-normal'
                : 'text-[var(--muted)] font-light'
            }`}
          >
            Cinematic luxury interior website concept focused on immersive
            layouts, editorial visuals, and premium motion design.
          </p>
        </div>
      </motion.div>
    </div>
  </motion.div>
</section>

      {/* ── TRANSPARENT PRICING GRID SECTOR ── */}
      <section className="pricing bg-[var(--surface)] py-24 px-6 md:px-12 border-t border-[var(--border)]" id="pricing">
        <motion.div 
          variants={editorialContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="max-w-5xl mx-auto space-y-12"
        >
          
          <motion.div variants={editorialItem} className="space-y-2 mb-8 text-center md:text-left">
            <span className="eyebrow block text-[11px] font-mono tracking-[4px] text-[#00c47a] uppercase font-bold">
              Transparent Pricing
            </span>
            <h2 className="sec-h font-display text-4xl md:text-6xl leading-[0.95] text-[var(--text)] tracking-tight uppercase">
              FAIR COSTS,<br />
              <span className="font-serif italic text-[#00c47a] lowercase font-light">great results.</span>
            </h2>
          </motion.div>

          <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch pt-6">

            {/* ── TIER 1: LANDING ── */}
            <motion.div 
              variants={editorialItem}
              className="prc bg-[var(--bg)] border border-[var(--border)] rounded-[4px] hover:border-[#00c47a]/30 hover:-translate-y-1 p-8 flex flex-col justify-between transition-all duration-300 cursor-default group"
            >
              <div>
                <p className="prc-tier text-[10px] font-mono tracking-[3px] uppercase text-[var(--muted)] mb-3">
                  Single Payment
                </p>
                <h3 className="prc-name font-display text-4xl text-[var(--text)] mb-2 tracking-wide font-medium">
                  Landing
                </h3>
                <p className="prc-sub text-slate-500 text-[14px] font-light leading-normal leading-relaxed mb-6">
                  A fast, professional online presence — delivered quickly.
                </p>
                <div className="prc-price font-display text-6xl text-[var(--text)] tracking-tighter mb-1.5 flex items-baseline">
                  <span className="text-xl align-super mb-1 tracking-normal font-sans mr-0.5">₹</span>2,999
                </div>
                <p className="prc-note text-[11px] font-mono text-[var(--muted)] tracking-wider mb-8">
                  One-time payment
                </p>
                <ul className="prc-list list-none space-y-3.5 mb-10">
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> 1 landing page
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Contact form + auto emails
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Mobile optimized
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Basic SEO setup
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Delivered in 3–5 days
                  </li>
                </ul>
              </div>
              <Magnetic strength={0.2}>
                <button 
                  onClick={() => handleScrollTo('contact')}
                  className="prc-btn w-full block text-center py-3.5 border border-[var(--border-md)] hover:border-[#00c47a] hover:text-[#00c47a] hover:bg-[#00c47a]/5 text-[var(--muted)] text-[11px] font-mono tracking-[2px] uppercase font-bold transition-all bg-transparent rounded-none cursor-pointer"
                >
                  Get Started
                </button>
              </Magnetic>
            </motion.div>

            {/* ── TIER 2: STANDARD (POPULAR) ── */}
            <motion.div 
              variants={editorialItem}
              className="prc hot bg-[var(--surface2)] border-2 border-[#00c47a] hover:-translate-y-1 rounded-[4px] p-8 flex flex-col justify-between transition-all duration-300 relative cursor-default group shadow-md"
            >
              <div className="hot-tag absolute top-[-14px] left-1/2 -translate-x-1/2 bg-[#00c47a] text-white text-[10px] font-bold tracking-[2px] uppercase px-5 py-1 rounded-full shadow-md whitespace-nowrap">
                Most Popular
              </div>
              <div>
                <p className="prc-tier text-[10px] font-mono tracking-[3px] uppercase text-[var(--muted)] mb-3 pt-2">
                  Single Payment
                </p>
                <h3 className="prc-name font-display text-4xl text-[var(--text)] mb-2 tracking-wide font-medium">
                  Standard
                </h3>
                <p className="prc-sub text-slate-500 text-[14px] font-light leading-normal leading-relaxed mb-6">
                  The perfect package for a complete professional online presence.
                </p>
                <div className="prc-price font-display text-6xl text-[var(--text)] tracking-tighter mb-1.5 flex items-baseline">
                  <span className="text-xl align-super mb-1 tracking-normal font-sans mr-0.5">₹</span>5,999
                </div>
                <p className="prc-note text-[11px] font-mono text-[var(--muted)] tracking-wider mb-8">
                  One-time payment
                </p>
                <ul className="prc-list list-none space-y-3.5 mb-10">
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> 3–5 custom pages
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Contact form + auto emails
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Mobile optimized
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Full SEO + analytics
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Performance optimized
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Delivered in 7–10 days
                  </li>
                </ul>
              </div>
              <Magnetic strength={0.2}>
                <button 
                  onClick={() => handleScrollTo('contact')}
                  className="prc-btn w-full block text-center py-3.5 text-white border-2 border-[#00c47a] bg-[#00c47a] hover:opacity-90 text-[11px] font-mono tracking-[2px] uppercase font-bold transition-all rounded-none cursor-pointer"
                >
                  Get Started
                </button>
              </Magnetic>
            </motion.div>

            {/* ── TIER 3: CUSTOM ── */}
            <motion.div 
              variants={editorialItem}
              className="prc bg-[var(--bg)] border border-[var(--border)] rounded-[4px] hover:border-[#00c47a]/30 hover:-translate-y-1 p-8 flex flex-col justify-between transition-all duration-300 cursor-default group"
            >
              <div>
                <p className="prc-tier text-[10px] font-mono tracking-[3px] uppercase text-[var(--muted)] mb-3">
                  Custom Quote
                </p>
                <h3 className="prc-name font-display text-4xl text-[var(--text)] mb-2 tracking-wide font-medium">
                  Custom
                </h3>
                <p className="prc-sub text-slate-500 text-[14px] font-light leading-normal leading-relaxed mb-6">
                  Complex apps, e-commerce, or anything beyond standard scope.
                </p>
                <div className="prc-price font-display text-4.5xl md:text-5xl text-[var(--text)] tracking-tight mb-2 flex items-baseline tracking-[-1px] uppercase leading-none mt-2.5 select-none font-bold">
                  Let's Talk
                </div>
                <p className="prc-note text-[11px] font-mono text-[var(--muted)] tracking-wider mb-8">
                  Starting from ₹12,000
                </p>
                <ul className="prc-list list-none space-y-3.5 mb-10">
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Unlimited pages
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Full-stack development
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Admin dashboard + CMS
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light pb-2.5 border-b border-[var(--border)] flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Advanced SEO strategy
                  </li>
                  <li className="text-[14px] text-[var(--muted)] font-light flex items-center gap-2.5">
                    <span className="text-[#00c47a] font-bold">✓</span> Ongoing support
                  </li>
                </ul>
              </div>
              <Magnetic strength={0.2}>
                <button 
                  onClick={() => handleScrollTo('contact')}
                  className="prc-btn w-full block text-center py-3.5 border border-[var(--border-md)] hover:border-[#00c47a] hover:text-[#00c47a] hover:bg-[#00c47a]/5 text-[var(--muted)] text-[11px] font-mono tracking-[2px] uppercase font-bold transition-all bg-transparent rounded-none cursor-pointer"
                >
                  Request Quote
                </button>
              </Magnetic>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIAL LUXURY SECTOR ── */}
      <section className="testi bg-[var(--bg2)] py-28 px-6 md:px-12 border-t border-[var(--border)]">
        <motion.div
  variants={editorialItem}
  className="bg-[var(--surface2)] border border-[var(--border)] p-8 rounded-[4px] max-w-3xl mx-auto text-left"
>
  <div className="flex items-center gap-1 text-[#00c47a] text-lg mb-5">
    ★★★★★
  </div>

  <p className="text-[17px] leading-[1.9] text-[var(--text)] font-light italic">
    "We wanted a clean and professional website for our business and Ashwini delivered it perfectly. Communication was smooth and the final result was beyond our expectations."
  </p>

  <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
    <div>
      <h4 className="text-[15px] font-semibold text-[var(--text)]">
        PON AGRO
      </h4>

      <p className="text-[12px] tracking-[2px] uppercase text-[var(--muted)] mt-1">
        Agricultural Business Website
      </p>
    </div>

    <a
      href="https://pon-agro-website.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#00c47a] text-[#00c47a] px-5 py-2 rounded-full text-[11px] font-mono tracking-[2px] uppercase hover:bg-[#00c47a] hover:text-black transition-all"
    >
      Visit Website ↗
    </a>
  </div>
</motion.div>
      </section>

      {/* ── CONTACT IMMERSIVE CONSOLE SECTOR ── */}
      <section className="contact bg-[var(--surface)] py-28 px-6 md:px-12 border-t border-[var(--border)]" id="contact">
        <motion.div 
          variants={editorialContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="contact-inner max-w-4xl mx-auto text-center space-y-8"
        >
          
          <motion.span variants={editorialItem} className="eyebrow block text-[11px] font-mono tracking-[4px] text-[#00c47a] uppercase font-bold">
            Let's Build Something
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2 
              variants={editorialItem}
              className="contact-big font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.85] text-[var(--text)] tracking-tight uppercase"
            >
              READY<br />
              <span className="font-serif italic text-[#00c47a] lowercase font-light block mt-1.5 pb-2">to start?</span>
            </motion.h2>
          </div>

          <motion.p 
            variants={editorialItem}
            className="contact-sub text-[16px] text-[var(--muted)] font-light leading-relaxed max-w-xl mx-auto"
          >
            Got a project in mind? I reply within 12 hours.<br />Let's create something extraordinary together.
          </motion.p>

          <motion.div 
            variants={editorialItem}
            className="inline-block mt-4"
          >
            <a 
              href="mailto:ashwini.devv@gmail.com" 
              className="contact-email font-display text-2xl md:text-3xl text-[#00c47a] tracking-[1.5px] border-b border-[#00c47a]/25 pb-1 hover:border-[#00c47a] duration-300 transition-colors"
            >
              ashwini.devv@gmail.com
            </a>
          </motion.div>

          <motion.div 
            variants={editorialItem}
            className="pt-4"
          >
            <Magnetic>
              <a 
                href="mailto:ashwini.devv@gmail.com" 
                className="btn-primary btn-glow-hover bg-[#00c47a] text-white px-10 py-4 rounded-full text-xs font-mono font-bold tracking-[1.5px] uppercase hover:scale-105 active:scale-95 transition-all outline-none decoration-none inline-block shadow-md"
              >
                Start a Project ✦
              </a>
            </Magnetic>
          </motion.div>

          {/* SOCIAL MEDIA HOVER STATIONS */}
          <motion.div 
            variants={editorialItem}
            className="social-row flex justify-center gap-12 pt-12 flex-wrap"
          >
            <a 
              href="https://www.instagram.com/ashwini.devv/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link flex flex-col items-center gap-2 group decoration-none"
            >
              <div className="social-icon w-14 h-14 rounded-full border border-[var(--border-md)] hover:border-[#00c47a] hover:bg-[#00c47a]/5 bg-[var(--bg)] flex items-center justify-center text-lg text-[var(--text)] transition-all duration-300 group-hover:-translate-y-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                </svg>
              </div>
              <span className="social-name text-[10px] font-mono tracking-[2px] uppercase text-[var(--muted)]">Instagram</span>
            </a>

            <a 
              href="https://www.youtube.com/@AshwiniDevv" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link flex flex-col items-center gap-2 group decoration-none"
            >
              <div className="social-icon w-14 h-14 rounded-full border border-[var(--border-md)] hover:border-[#00c47a] hover:bg-[#00c47a]/5 bg-[var(--bg)] flex items-center justify-center text-lg text-[var(--text)] transition-all duration-300 group-hover:-translate-y-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="social-name text-[10px] font-mono tracking-[2px] uppercase text-[var(--muted)]">YouTube</span>
            </a>

            <a 
              href="mailto:ashwini.devv@gmail.com" 
              className="social-link flex flex-col items-center gap-2 group decoration-none"
            >
              <div className="social-icon w-14 h-14 rounded-full border border-[var(--border-md)] hover:border-[#00c47a] hover:bg-[#00c47a]/5 bg-[var(--bg)] flex items-center justify-center text-lg text-[var(--text)] transition-all duration-300 group-hover:-translate-y-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
              </div>
              <span className="social-name text-[10px] font-mono tracking-[2px] uppercase text-[var(--muted)]">Email</span>
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* ── FOOTER SECURE NODE ── */}
      <footer className="bg-[var(--bg)] border-t border-[var(--border)] py-8 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 select-none font-mono">
        <p className="f-logo font-display text-lg tracking-[2px] text-[var(--muted)]">
          ASH<span className="text-[#00c47a]">.</span>
        </p>
        <p className="text-[11px] text-[var(--muted)] tracking-[0.5px] text-center">
          © {new Date().getFullYear()} Ashwini — Web Design &amp; Development · Chennai, India
        </p>
        <p className="text-[11px] text-[var(--muted)] flex items-center gap-2">
          <span className="avail-dot w-2 h-2 rounded-full bg-[#00c47a] inline-block animate-pulse" />
          Available for new projects
        </p>
      </footer>

      </div>

    </div>
  );
}
