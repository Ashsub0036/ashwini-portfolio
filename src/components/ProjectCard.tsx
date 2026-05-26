import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ExternalLink, Github, Eye, ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -0.5 to 0.5
    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;
    
    // Dynamic cinematic tilt angles (maximum 6 degrees for luxury control)
    setRotateX(-yc * 12);
    setRotateY(xc * 12);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Rendering beautiful stylized interactive vectors based on project type
  const renderVisualPreview = () => {
    switch (project.id) {
      case 'project-1': // Luxury Bridal Makeup
        return (
          <div className="relative w-full h-[240px] bg-gradient-to-tr from-[#0b0c10] via-[#101725] to-[#121c2c] flex items-center justify-center overflow-hidden border-b border-white/5">
            {/* Soft pinkish/champagne elegant orbital glowing lights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-pink-500/10 blur-[50px] animate-pulse" />
            <div className="absolute inset-0 opacity-15 grid-pattern" />
            
            {/* Elegant luxury editorial page mock and wireframe borders */}
            <div className="relative w-[85%] h-[80%] border border-white/10 rounded bg-[#07111f]/60 backdrop-blur-md p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[9px] font-mono tracking-widest text-[#00bfff]/80">ATELIER ESTHÉTIQUE</span>
                <span className="text-[8px] border border-pink-400/30 text-pink-400/80 px-2 py-0.5 rounded-full">BRIDE COLLECTION</span>
              </div>
              
              <div className="my-3 flex gap-3 items-center">
                <div className="w-12 h-12 rounded border border-white/20 flex-shrink-0 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center">
                  <span className="font-display text-xs text-white/50">AÉ</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="h-1.5 w-24 bg-white/25 rounded" />
                  <div className="h-1.5 w-16 bg-white/15 rounded" />
                  <div className="h-1 w-20 bg-white/10 rounded" />
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-[20px] font-display font-light text-white leading-none tracking-tight">
                  SOPHIE <span className="italic text-white/40">&amp;</span> L’AMOUR
                </div>
                <span className="text-[8px] text-gray-400 font-mono">EDITION 2026</span>
              </div>
            </div>
          </div>
        );

      case 'project-2': // CCTV Anomaly Detection System
        return (
          <div className="relative w-full h-[240px] bg-gradient-to-tr from-[#040813] via-[#051325] to-[#0a182b] flex items-center justify-center overflow-hidden border-b border-white/5">
            {/* Tactical glowing scan light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[#00bfff]/60 to-transparent animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-x-0 inset-y-0 opacity-20 grid-pattern" />
            
            {/* Tactical Target Overlay wireframes */}
            <div className="absolute w-28 h-28 border border-[#00bfff]/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
              <div className="w-20 h-20 border border-dashed border-[#00bfff]/30 rounded-full" />
            </div>

            {/* Simulated Live Camera HUD Feed & Skeleton Tracking Points */}
            <div className="relative w-[85%] h-[80%] border border-[#00bfff]/20 rounded bg-[#030712]/75 backdrop-blur-md p-3 flex flex-col justify-between font-mono">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[8px] text-red-500">LIVE // SEC_CAM_07</span>
                </div>
                <span className="text-[8px] text-gray-500">FPS: 60.0</span>
              </div>

              {/* Vector skeletal joints simulating person-tracking */}
              <div className="relative flex justify-center items-center h-24">
                <svg className="w-16 h-16 text-[#00bfff]/80" viewBox="0 0 100 100">
                  {/* Head */}
                  <circle cx="50" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  {/* Spine */}
                  <line x1="50" y1="25" x2="50" y2="55" stroke="currentColor" strokeWidth="1.5" />
                  {/* Arms */}
                  <line x1="50" y1="30" x2="30" y2="40" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="30" y1="40" x2="20" y2="25" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="30" x2="70" y2="42" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="70" y1="42" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  {/* Legs */}
                  <line x1="50" y1="55" x2="35" y2="80" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="55" x2="65" y2="80" stroke="currentColor" strokeWidth="1.5" />
                  
                  {/* Joint trackers */}
                  <circle cx="50" cy="30" r="1.5" fill="#00bfff" />
                  <circle cx="30" cy="40" r="1.5" fill="#00bfff" />
                  <circle cx="70" cy="42" r="1.5" fill="#00bfff" />
                  <circle cx="35" cy="80" r="1.5" fill="#00bfff" />
                  <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
                {/* Tactical tag */}
                <div className="absolute right-0 top-4 border border-red-500/50 bg-red-500/10 text-red-500 text-[6px] px-1 py-0.5 rounded uppercase">
                  Anomaly: Running (94%)
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] text-gray-400 border-t border-white/5 pt-1">
                <span>COORD: X=452 Y=103</span>
                <span className="text-[#00bfff]">PRED: HIGH RISK</span>
              </div>
            </div>
          </div>
        );

      case 'project-3': // Smart E-Waste Management System
        return (
          <div className="relative w-full h-[240px] bg-gradient-to-tr from-[#02050c] via-[#05141f] to-[#041a29] flex items-center justify-center overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 opacity-15 grid-pattern" />
            <div className="absolute bottom-1/4 right-1/4 w-[160px] h-[160px] rounded-full bg-cyan-500/5 blur-[40px]" />
            
            {/* Minimal Circular Sensor Dashboard visualization */}
            <div className="relative w-[85%] h-[80%] border border-white/10 rounded bg-[#010c18]/70 backdrop-blur-md p-3 flex flex-col justify-between">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[8px] font-mono tracking-widest text-[#00bfff]">TRACKER // INTELLIGENT NODE</span>
                <span className="text-[8px] text-green-400/80 font-mono">STATUS: OPTIMAL</span>
              </div>

              <div className="flex items-center gap-4 my-2">
                {/* Circular Telemetry Meter */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#00bfff" strokeWidth="2.5" strokeDasharray="72 28" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-white leading-none">72%</span>
                    <span className="text-[5px] text-gray-400 uppercase">RECYCLE</span>
                  </div>
                </div>

                {/* Tracking Node Chart */}
                <div className="flex-1 flex flex-col gap-1.5 font-mono">
                  <div className="flex justify-between text-[7px] text-gray-400">
                    <span>E-WASTE MASS</span>
                    <span className="text-white">14.2 Tons</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="flex justify-between text-[7px] text-gray-400">
                    <span>AI EFFICIENCY</span>
                    <span className="text-[#00bfff] font-bold">98.5%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 self-start text-[8px] font-mono text-[#00bfff]/80">
                <span className="px-1.5 py-0.5 border border-[#00bfff]/20 bg-[#00bfff]/5 rounded">CHATBOT MAPPED</span>
                <span className="px-1.5 py-0.5 border border-white/5 rounded text-white/50">GEO-COORD</span>
              </div>
            </div>
          </div>
        );

      case 'project-4': // Luxury Interior Design (Coming Soon)
        default:
        return (
          <div className="relative w-full h-[240px] bg-gradient-to-tr from-[#050505] via-[#0d0f14] to-[#12141a] flex items-center justify-center overflow-hidden border-b border-white/5">
            {/* Subtle glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[120px] rounded-full bg-white/5 blur-[45px] animate-pulse" />
            <div className="absolute inset-0 opacity-10 grid-pattern" />
            
            {/* Minimalist fine-line isometric wireframe blueprint */}
            <div className="relative w-[85%] h-[80%] border border-white/5 rounded bg-black/60 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono tracking-wider text-white/30">M ARCHITECTURE SELECTION</span>
                <span className="text-[8px] border border-white/20 text-white/60 px-2 py-0.5 rounded font-mono">COMING SOON</span>
              </div>

              <div className="relative flex justify-center items-center h-20">
                {/* Minimal perspective architectural sketch */}
                <svg className="w-24 h-20 text-white/15" viewBox="0 0 100 80">
                  {/* Perspective bounds */}
                  <line x1="10" y1="60" x2="40" y2="20" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="90" y1="60" x2="60" y2="20" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="40" y1="20" x2="60" y2="19" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="10" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="0.8" />
                  
                  {/* Internal wall guides */}
                  <line x1="40" y1="20" x2="40" y2="50" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="60" y1="19" x2="60" y2="49" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="40" y1="50" x2="10" y2="60" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="60" y1="49" x2="90" y2="60" stroke="currentColor" strokeWidth="0.8" />
                  
                  {/* Minimal block represent desk / lounge */}
                  <polygon points="45,40 55,39 55,45 45,46" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[12px] font-display uppercase tracking-[0.25em] text-white">L’ESPACE ATELIER</span>
                  <span className="text-[7px] text-[#00bfff] tracking-widest uppercase font-mono mt-1">EDITORIAL MOTION PREVIEW</span>
                </div>
              </div>

              <div className="flex justify-between items-end text-[7px] font-mono text-white/35">
                <span>REVEAL // Q3 2026</span>
                <span>FURNITURE ARCHIVE</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      id={project.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col rounded-xl overflow-hidden glassmorphism transition-shadow duration-500 hover:shadow-2xl hover:shadow-cyan-950/20 group cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        transform: hovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: hovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Visual Canvas Representation */}
      {renderVisualPreview()}

      {/* Narrative Section details */}
      <div className="p-6 flex flex-col justify-between flex-1 relative z-10 bg-slate-950/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-[#00bfff] uppercase">
              {project.category}
            </span>
            {project.comingSoon && (
              <span className="text-[8px] bg-white/5 px-2.5 py-0.5 rounded-full text-white/60 border border-white/10 font-mono tracking-widest uppercase">
                Concept
              </span>
            )}
          </div>

          <h3 className="font-display text-xl font-light text-white tracking-tight group-hover:text-[#00bfff] transition-colors flex items-center gap-1.5 duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 text-xs leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Badges & Interactive Buttons */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-2 py-0.5 text-slate-300 bg-slate-900/60 rounded border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 mt-1">
            <button
              id={`view-details-${project.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(project);
              }}
              className="text-[10px] font-mono uppercase tracking-widest py-1 text-white hover:text-[#00bfff] flex items-center gap-1 transition-colors select-none cursor-pointer"
            >
              <Eye size={12} />
              <span>Inspect Dossier</span>
            </button>

            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  id={`github-link-${project.id}`}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg border border-white/5 hover:border-[#00bfff]/30 bg-slate-900/20 text-gray-400 hover:text-white transition-all select-none cursor-pointer"
                  title="Source Repository"
                >
                  <Github size={13} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  id={`live-link-${project.id}`}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg border border-white/5 hover:border-[#00bfff]/30 bg-slate-900/20 text-gray-400 hover:text-white transition-all select-none cursor-pointer"
                  title="Live Atmosphere"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic ambient corner lights on card hover */}
      <span className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#00bfff]/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-[#00bfff]/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
