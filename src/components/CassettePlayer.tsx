import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Info } from 'lucide-react';

interface CassetteTrack {
  name: string;
  desc: string;
  notes: number[]; // Frequencies for the drone synthesizer
}

export default function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Tracks simulating lo-fi ambient stations
  const tracks: CassetteTrack[] = [
    { name: 'DEEP SPACE DRONE', desc: 'Focus wave // 55Hz & 82.4Hz', notes: [55, 82.4] },
    { name: 'CYBERPUNK CHORD', desc: 'Swell resonance // 65.4Hz & 98Hz', notes: [65.4, 98] },
    { name: 'NOCTURNAL ATELIER', desc: 'Ethereal drift // 73.4Hz & 110Hz', notes: [73.4, 110] },
  ];

  // Synthesizer Refs
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const track = tracks[currentTrackIdx];

      // Primary Low Sine Oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(track.notes[0], ctx.currentTime);
      osc1Ref.current = osc1;

      // Harmonic Tri Oscillator for warmth
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(track.notes[1], ctx.currentTime);
      osc2Ref.current = osc2;

      // Filter Node
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filterRef.current = filter;

      // LFO sweep
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, ctx.currentTime); // Very slow 16-sec cycle

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(70, ctx.currentTime); // Sweep limit

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfoRef.current = lfo;

      // Output Gain (extremely soft background atmosphere)
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.0, ctx.currentTime);
      mainGainRef.current = mainGain;

      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      // Start frequencies
      osc1.start(0);
      osc2.start(0);
      lfo.start(0);

      // Fade-in
      mainGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 2.0);
    } catch (e) {
      console.warn('Web Audio issue', e);
    }
  };

  const updateTrackFrequencies = (idx: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const track = tracks[idx];
    
    if (osc1Ref.current && osc2Ref.current) {
      // Smooth frequency glides for high-end feel
      osc1Ref.current.frequency.exponentialRampToValueAtTime(track.notes[0], ctx.currentTime + 1.2);
      osc2Ref.current.frequency.exponentialRampToValueAtTime(track.notes[1], ctx.currentTime + 1.2);
    }
  };

  const handlePlayPause = () => {
    const ctx = audioCtxRef.current;
    if (!isPlaying) {
      if (!ctx) {
        initAudio();
      } else if (ctx.state === 'suspended') {
        ctx.resume();
        mainGainRef.current?.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.0);
      }
      setIsPlaying(true);
    } else {
      if (ctx && mainGainRef.current) {
        mainGainRef.current.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.6);
        setTimeout(() => {
          ctx.suspend();
        }, 600);
      }
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % tracks.length;
    setCurrentTrackIdx(nextIdx);
    if (isPlaying) {
      updateTrackFrequencies(nextIdx);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
    setCurrentTrackIdx(prevIdx);
    if (isPlaying) {
      updateTrackFrequencies(prevIdx);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto p-6 rounded-2xl glassmorphism border border-white/5 bg-[#07111f]/30 flex flex-col items-center gap-4 shadow-xl select-none">
      
      {/* Tape Deck Title Heading */}
      <div className="w-full flex justify-between items-center text-[8px] font-mono text-[#00bfff]/60 tracking-widest uppercase pb-1.5 border-b border-white/5">
        <span>[AMPLIFIER_STAGE_01]</span>
        <div className="flex items-center gap-1 text-emerald-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-current ${isPlaying ? 'animate-ping' : ''}`} />
          <span>{isPlaying ? 'PLAYING' : 'IDLE'}</span>
        </div>
      </div>

      {/* Cassette Tape Frame */}
      <div className="relative w-full aspect-[1.6/1] bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border-2 border-white/10 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Cassette Label (Retro-Modern) */}
        <div className="w-full h-8 bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 rounded border border-white/10 p-1 flex justify-between items-center px-3">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono font-bold text-[#00bfff]">SIDE A</span>
            <span className="text-[9px] font-display font-bold text-white tracking-widest leading-none mt-0.5 truncate max-w-[140px]">
              {tracks[currentTrackIdx].name}
            </span>
          </div>
          <span className="text-[8px] font-mono text-white/40">LO-FI ATMOSPHERE</span>
        </div>

        {/* Center window with reels */}
        <div className="w-4/5 h-12 bg-black border border-white/5 rounded-lg mx-auto flex justify-between items-center px-6 relative overflow-hidden">
          
          {/* Left Reel */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg 
              className={`w-full h-full text-slate-700 transition-transform ${isPlaying ? 'animate-spin' : ''}`} 
              style={{ animationDuration: '6s' }}
              viewBox="0 0 32 32"
            >
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="16" cy="16" r="3" fill="#00bfff" />
              {/* Ticks representing spokes */}
              <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Tape running visualization (connecting transparent lines) */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-1 bg-[#00bfff]/5 flex items-center justify-between">
            <span className={`h-full bg-[#00bfff]/30 rounded-full transition-all duration-300 ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>

          {/* Right Reel */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg 
              className={`w-full h-full text-slate-700 transition-transform ${isPlaying ? 'animate-spin' : ''}`} 
              style={{ animationDuration: '6s' }}
              viewBox="0 0 32 32"
            >
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="16" cy="16" r="3" fill="#00bfff" />
              {/* Ticks representing spokes */}
              <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

        </div>

        {/* Factual Subtitle description */}
        <div className="w-full flex justify-between items-center text-[7px] font-mono text-gray-500">
          <span>Dolby System B/C // NR</span>
          <span className="text-[#00bfff] font-bold">{tracks[currentTrackIdx].desc}</span>
        </div>
      </div>

      {/* Tape Control Deck */}
      <div className="flex items-center justify-center gap-4 w-full">
        <button
          id="cassette-prev"
          onClick={prevTrack}
          className="p-2.5 rounded-lg border border-white/5 hover:border-white/10 bg-slate-900/40 text-gray-400 hover:text-white transition-all cursor-pointer"
          title="Previous Station"
        >
          <SkipBack size={14} />
        </button>

        <button
          id="cassette-play-pause"
          onClick={handlePlayPause}
          className={`p-3.5 rounded-full border transition-all duration-300 cursor-pointer ${
            isPlaying 
              ? 'bg-[#ff00a0]/15 border-[#ff00a0]/40 text-[#ff00a0] shadow-[0_0_15px_rgba(255,0,160,0.25)]' 
              : 'bg-white border-white text-black hover:bg-transparent hover:text-white glow-cyan'
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>

        <button
          id="cassette-next"
          onClick={nextTrack}
          className="p-2.5 rounded-lg border border-white/5 hover:border-white/10 bg-slate-900/40 text-gray-400 hover:text-white transition-all cursor-pointer"
          title="Next Station"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Context info banner */}
      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/3 border border-white/5 text-[9px] text-gray-400 leading-normal">
        <Info size={12} className="text-[#00bfff] flex-shrink-0 mt-0.5" />
        <p>
          Need a serene canvas? Active the cassette to stream hand-synthesized wave droning while critiquing the portfolio.
        </p>
      </div>
    </div>
  );
}
