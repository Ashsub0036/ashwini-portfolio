import { motion } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, Github, Sparkles, CheckCircle, Shield } from 'lucide-react';

interface ProjectDossierModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDossierModal({ project, onClose }: ProjectDossierModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-end p-0 md:p-6 text-white overflow-hidden">
      {/* Darkened backdrop overlay with glass blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Cinematic Right Drawer with luxurious animations */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
        className="relative w-full max-w-2xl h-full md:h-[95vh] rounded-none md:rounded-2xl bg-gradient-to-b from-[#07111f] to-[#030712] border-l md:border border-white/10 p-6 md:p-10 shadow-3xl overflow-y-auto flex flex-col justify-between"
      >
        {/* Absolute Indicators and close trigger */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[#00bfff]/80 uppercase">
            <Shield size={12} />
            <span>PROJECT DOSSIER // AUTHENTIC DEPLOYMENT</span>
          </div>

          <button
            id="close-dossier-button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full border border-white/5 hover:border-white/20 bg-slate-900/40 text-gray-400 hover:text-white transition-all outline-none cursor-pointer"
            title="Close Dossier"
          >
            <X size={15} />
          </button>
        </div>

        {/* Narrative Project Dossier Data */}
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#00bfff] uppercase tracking-widest">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Description and extended insights */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              01 // CORE DESCRIPTION
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {project.description}
            </p>
            {project.comingSoon ? (
              <p className="text-[#00bfff] text-xs font-mono bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-2.5 rounded-lg">
                * Note: This creative atelier concept is currently undergoing pre-layout compilation and asset production. Stay tuned for the upcoming interactive release.
              </p>
            ) : (
              <p className="text-gray-400 text-xs leading-relaxed font-light italic">
                A verified active product configured using semantic UI components, client-side optimizations, and custom layouts that respond to viewport constraints.
              </p>
            )}
          </div>

          {/* Architectural and engineering features */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              02 // KEY ARCHITECTURAL ACHIEVEMENTS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Pixel-perfect absolute layout styling mimicking luxury agencies.',
                'Interactive state orchestration with highly optimized React trees.',
                'Strict performance rendering indices aiming for standard web core vitals.',
                'Designed with robust theme constants, fine neon typography, and mobile-first logic.',
              ].map((achieve, i) => (
                <div key={i} className="flex gap-2.5 p-3 rounded-lg border border-white/5 bg-slate-900/15">
                  <CheckCircle size={14} className="text-[#00bfff] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-300 font-light font-sans">{achieve}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technological credentials stack */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              03 // TECHNOLOGICAL CREDENTIALS
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 bg-slate-900 border border-white/5 rounded text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions and external links */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3">
          {project.liveUrl && (
            <a
              id={`modal-live-${project.id}`}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-transparent hover:text-white border border-white font-mono text-center text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 select-none"
            >
              <span>Explore Active Atmosphere</span>
              <ExternalLink size={13} />
            </a>
          )}

          {project.githubUrl && (
            <a
              id={`modal-github-${project.id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-slate-900/30 text-white font-mono text-center text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 select-none"
            >
              <span>Inspect Source Files</span>
              <Github size={13} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
