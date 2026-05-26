import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  key?: string;
  index: string;
  title: string;
  description: string;
  aspects: string[];
}

function ServiceCard({ index, title, description, aspects }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl glassmorphism p-6 md:p-8 overflow-hidden group border border-white/5 transition-all duration-500 hover:border-[#00bfff]/30 flex flex-col justify-between h-[340px]"
    >
      {/* Absolute Index Typography with luxurious tracking */}
      <div className="absolute top-4 right-6 text-7xl font-sans font-bold text-white/2 select-none font-mono">
        {index}
      </div>

      <div className="space-y-4 relative z-10">
        <span className="text-[9px] font-mono tracking-widest text-[#00bfff]/80 uppercase">
          SERVICE // {index}
        </span>
        
        <h3 className="text-xl md:text-2xl font-display font-light text-white tracking-tight leading-tight group-hover:text-[#00bfff] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 text-xs leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div className="space-y-3 relative z-10 border-t border-white/5 pt-4">
        <div className="flex flex-wrap gap-2">
          {aspects.map((aspect) => (
            <span
              key={aspect}
              className="text-[9px] font-mono text-gray-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/5"
            >
              {aspect}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-white/50 group-hover:text-[#00bfff] transition-colors duration-300 uppercase">
          <span>Explore Architecture</span>
          <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Interactive mouse hover coordinate glow */}
      <span className="absolute bottom-0 right-0 w-32 h-32 bg-radial from-[#00bfff]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const offerings = [
    {
      index: '01',
      title: 'Luxury Portfolio Websites',
      description:
        'Crafting bespoke personal sites and premium showcase modules designed to capture absolute brand status, styled with editorial layouts & rich spatial animations.',
      aspects: ['High-End Motion', 'Asset Art', 'Smooth Parallax'],
    },
    {
      index: '02',
      title: 'Premium Business Websites',
      description:
        'Tailoring corporate web presences with sophisticated aesthetic control, fast-loading micro-engineered codebases, and custom responsive blocks.',
      aspects: ['React Architecture', 'Brand Alignment', 'SEO Crafted'],
    },
    {
      index: '03',
      title: 'Cinematic Landing Pages',
      description:
        'Captivating audience conversions with cinematic entrances, interactive custom background systems, magnetic click targets, and optimized metrics.',
      aspects: ['Maximum Performance', 'Stroll Reveals', 'High Impact'],
    },
    {
      index: '04',
      title: 'UI/UX Frontend Development',
      description:
        'Translating complex vector layouts into pristine pixel-perfect DOM states, strictly preserving typography hierarchies, spacing integrity, and colors.',
      aspects: ['Componentization', 'Strict Layouts', 'Figma Translation'],
    },
    {
      index: '05',
      title: 'Modern React Applications',
      description:
        'Connecting responsive modular React trees with complex backend transaction layers via custom hooks, state caches, and error boundaries.',
      aspects: ['Redux / Context', 'Spring Boot Hooks', 'Clean Hydration'],
    },
    {
      index: '06',
      title: 'Interactive Motion Design',
      description:
        'Synthesizing organic spring physics, micro-transitions, staggering grids, and custom hover damping filters that respond to cursor movement fields.',
      aspects: ['Framer Motion', 'Web Audio Synthetics', 'Physics Damping'],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offerings.map((service) => (
        <ServiceCard
          key={service.index}
          index={service.index}
          title={service.title}
          description={service.description}
          aspects={service.aspects}
        />
      ))}
    </div>
  );
}
