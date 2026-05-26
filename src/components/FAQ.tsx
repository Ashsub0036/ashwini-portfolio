import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Why hire Ashwini S over a large, expensive agency?',
      answer: 'Working with me gives you direct, frictionless access to the designer and developer actually compiling your code. No bloated sales pitches, no redundant accounts management. You get premium boutique attention, pixel-perfect design alignment, and optimized modern codebases at a fraction of standard agency pricing pipelines.',
    },
    {
      question: 'What does your collaborative development workflow look like?',
      answer: "My workflow starts with a direct design brief discussion to align on the brand's aesthetic tone. Next, I design key UI blocks in Figma to establish grid proportions. Once approved, I build the production codebase from scratch using modern React or full-stack pathways, integrating customized animations and responsive controls.",
    },
    {
      question: 'How long does a typical custom website take to launch?',
      answer: 'A clean landing page or luxury portfolio takes roughly 1 to 2 weeks of dedicated production time. A larger, multi-view operational React application or full-stack e-commerce project with database components takes around 3 to 4 weeks. Every milestone details modular testing and direct code updates.',
    },
    {
      question: 'What modern tech stack pathways do you specialize in?',
      answer: 'I specialize in high-fidelity React development backed by Vite, using Tailwind CSS and Framer Motion for premium cinematic animations. For server and transactional backend services, I build secure REST APIs using Java and Spring Boot structures connected to relational MySQL databases.',
    },
    {
      question: 'Will my finished website be optimized for speed and mobile viewports?',
      answer: 'Absolutely. Every layout I compile is built mobile-first and tested rigorously on custom viewport nodes. I prioritize zero-bloat code structures, responsive vector graphics, and optimized image compression to secure near-perfect performance indexes.',
    },
  ];

  return (
    <div id="faq" className="w-full max-w-4xl mx-auto space-y-6">
      
      <div className="text-center space-y-2 mb-10">
        <span className="text-[10px] font-mono tracking-widest text-[#00bfff] uppercase block">
          // ANSWERS TO YOUR CURIOSETIES
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-light text-white tracking-tight">
          Good to Know
        </h3>
        <p className="text-gray-400 text-xs font-light max-w-md mx-auto">
          Straight questions and factual answers about commissioning custom frontend engineering and creative design.
        </p>
      </div>

      <div className="divide-y divide-white/5 border-t border-b border-white/5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-4">
              <button
                id={`faq-trigger-${idx}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left py-2.5 flex items-center justify-between gap-4 font-display font-light text-base sm:text-lg text-white hover:text-[#00bfff] transition-colors outline-none cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#00bfff]' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-xs sm:text-sm font-sans font-light leading-relaxed pl-8 pr-12 pb-4 pt-1">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
