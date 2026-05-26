import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Milestone } from 'lucide-react';

interface TimelineItemProps {
  key?: string | number;
  period: string;
  role: string;
  location?: string;
  description: string;
  bullets: string[];
  index: number;
  highlight?: boolean;
}

function TimelineItem({ period, role, location, description, bullets, index, highlight }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
      className={`relative pl-8 md:pl-12 border-l-2 pb-12 last:pb-0 ${
        highlight ? 'border-[#00bfff]' : 'border-slate-800'
      }`}
    >
      {/* Absolute Timeline Interactive Node Indicator */}
      <div className="absolute -left-[11px] top-1.5 flex items-center justify-center">
        <span
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
            highlight
              ? 'bg-[#030712] border-[#00bfff] glow-cyan-strong scale-110'
              : 'bg-slate-950 border-slate-700'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              highlight ? 'bg-[#ff00a0] animate-pulse' : 'bg-[#00bfff]/60'
            }`}
          />
        </span>
      </div>

      {/* Narrative block info card */}
      <div className="group relative rounded-xl glassmorphism p-6 transition-all duration-300 hover:border-white/10 hover:bg-[#07111f]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div className="space-y-1">
            <h4 className="text-lg font-display font-medium text-white group-hover:text-[#00bfff] transition-colors">
              {role}
            </h4>
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                <MapPin size={11} className="text-[#00bfff]/80" />
                <span>{location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 self-start px-3 py-1 bg-slate-900/80 border border-white/5 rounded-full text-[10px] font-mono tracking-wider font-light text-cyan-400">
            <Calendar size={10} />
            <span>{period}</span>
          </div>
        </div>

        <p className="text-gray-300 text-xs leading-relaxed font-light mb-4">
          {description}
        </p>

        <ul className="space-y-2 mt-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-400 text-xs font-light">
              <span className="w-1 h-1 rounded-full bg-[#00bfff] mt-2 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Ambient background blur inside card */}
        <span className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#00bfff]/2 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const experiences = [
    {
      period: '2025 - PRESENT',
      role: 'Creative Frontend Architect / Freelance Developer',
      location: 'India • Secure Digital Atelier',
      highlight: true,
      description:
        'Currently focused on crafting premium, motion-heavy cinematic websites and modular single-page applications for creative agencies, luxury brands, and modern businesses seeking elite digital experiences.',
      bullets: [
        'Combining classical UI design standards with Framer Motion, GSAP, and reactive state management frameworks.',
        'Developing visually captivating interactive systems incorporating advanced client-side physics, custom shaders, and modular components.',
        'Refining freelance service pipelines to deliver hand-crafted, lightweight interactive ateliers that consistently outperform generic pre-built templates.',
      ],
    },
    {
      period: '2023 - 2024',
      role: 'Full-Stack Developer Intern & Academic Collaborations',
      location: 'Academic Lab / Practical Industry Environments',
      highlight: false,
      description:
        'Focused on core backend engineering frameworks, scalable RESTful API designs, and comprehensive full-stack lifecycle projects. Successfully engineered cross-border modules using Java and Spring Boot structures.',
      bullets: [
        'Built full-stack databases using MySQL, optimizing indexing strategies, schema relations, and transaction speeds.',
        'Developed end-to-end user interfaces in React, integrating them with high-throughput Spring Boot REST API architectures.',
        'Spearheaded research and implementation of skeleton-based tracking algorithms for security-focused AI integrations.',
      ],
    },
    {
      period: '2021 - 2023',
      role: 'Core Systems Explorer & UI Craftsman',
      location: 'India • Self-Directed Systems Mastery',
      highlight: false,
      description:
        'Pioneered self-taught paths into frontend design languages, object-oriented concepts, structural database modeling, and standard VCS version control systems.',
      bullets: [
        'Mastered responsive modular styling with Tailwind CSS and CSS grid systems, studying layout rhythms.',
        'Studied core Java programming, data structures, algorithm efficiency, and classical API routing principles.',
        'Designed brand identities and minimal visual interfaces using Figma, exploring user psychology and visual design systems.',
      ],
    },
  ];

  return (
    <div className="relative max-w-4xl mx-auto py-6">
      <div className="absolute top-0 left-[11px] h-full border-l-2 border-dashed border-slate-900/60 pointer-events-none z-0 hidden md:block" />
      
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <TimelineItem
            key={idx}
            index={idx}
            period={exp.period}
            role={exp.role}
            location={exp.location}
            description={exp.description}
            bullets={exp.bullets}
            highlight={exp.highlight}
          />
        ))}
      </div>
    </div>
  );
}
