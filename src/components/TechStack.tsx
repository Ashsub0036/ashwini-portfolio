import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Database, Cpu, Figma, Terminal, Smartphone } from 'lucide-react';

interface TechItemProps {
  key?: string | number;
  name: string;
  category: string;
  metric: string;
  index: number;
}

function TechCard({ name, category, metric, index }: TechItemProps) {
  const [hovered, setHovered] = useState(false);

  // Helper to determine category icon representation
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Layers size={14} className="text-[#00bfff]" />;
      case 'backend':
        return <Cpu size={14} className="text-pink-400" />;
      case 'tools':
      default:
        return <Terminal size={14} className="text-gray-400" />;
    }
  };

  const getGlowColor = () => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'rgba(0, 191, 255, 0.25)';
      case 'backend':
        return 'rgba(244, 114, 182, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.04, cubicBezier: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl glassmorphism-light p-5 transition-all duration-300 border border-white/5 hover:border-white/15 flex flex-col justify-between overflow-hidden select-none hover:-translate-y-1"
      style={{
        boxShadow: hovered ? `0 10px 30px ${getGlowColor()}` : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-white/5 flex items-center justify-center">
            {getIcon()}
          </span>
          <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
            {category}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#00bfff]/80 bg-white/5 px-2 py-0.5 rounded border border-white/5">
          {metric}
        </span>
      </div>

      <div className="space-y-1 relative z-10">
        <h4 className="text-base font-display font-medium text-white tracking-tight">
          {name}
        </h4>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              category === 'frontend' ? 'bg-[#00bfff]' : category === 'backend' ? 'bg-pink-400' : 'bg-gray-400'
            }`}
            style={{ width: hovered ? '100%' : '20%' }}
          />
        </div>
      </div>

      {/* Decorative vector matrix crosshairs */}
      <span className="absolute bottom-1 right-1 select-none font-mono text-[6px] text-white/5 opacity-50">
        [SYS_T0X{index}]
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const techs = [
    { name: 'React', category: 'Frontend', metric: 'Advanced' },
    { name: 'JavaScript', category: 'Frontend', metric: 'Es8' },
    { name: 'Spring Boot', category: 'Backend', metric: 'Core v3' },
    { name: 'Java', category: 'Backend', metric: 'Jdk17' },
    { name: 'Tailwind CSS', category: 'Frontend', metric: 'v4' },
    { name: 'Framer Motion', category: 'Frontend', metric: 'Fluid' },
    { name: 'MySQL', category: 'Backend', metric: 'Relational' },
    { name: 'REST APIs', category: 'Backend', metric: 'Client-S' },
    { name: 'Git', category: 'Tools', metric: 'Vcs' },
    { name: 'Figma', category: 'Tools', metric: 'Design' },
    { name: 'Postman', category: 'Tools', metric: 'Debug' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {techs.map((tech, idx) => (
          <TechCard
            key={tech.name}
            name={tech.name}
            category={tech.category}
            metric={tech.metric}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
