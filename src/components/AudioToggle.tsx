import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Synthesizer Node Refs
  const lfoRef = useRef<OscillatorNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);

  const initSynth = () => {
    try {
      // Create new audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Primary Low Ambient Drone (A1: 55Hz for absolute warmth)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1Ref.current = osc1;

      // 2. Harmonic Fifth Drone (E2: 82.4Hz for a spacious chord)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime);
      osc2Ref.current = osc2;

      // 3. Lowpass Filter to keep it atmospheric
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, ctx.currentTime);
      filter.Q.setValueAtTime(1.0, ctx.currentTime);
      filterRef.current = filter;

      // 4. LFO to slowly sweep the filter cutoff (creates organic breeze/swell)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow sweep: 12 seconds
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(80, ctx.currentTime); // Sweep by 80Hz

      lfoRef.current = lfo;

      // Connect LFO modulation
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // 5. Ambient volume setup (Extremely quiet to ensure high-end aesthetic)
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.0, ctx.currentTime); // start silent for fade-in
      mainGainRef.current = mainGain;

      // Connect Nodes
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      // Start Oscillators
      osc1.start(0);
      osc2.start(0);
      lfo.start(0);

      // Smooth fade-in
      mainGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3.0);
    } catch (e) {
      console.error('Web Audio API not supported inside iframe contexts', e);
    }
  };

  const handleToggle = () => {
    const ctx = audioCtxRef.current;
    
    if (!isPlaying) {
      if (!ctx) {
        initSynth();
      } else if (ctx.state === 'suspended') {
        ctx.resume();
        mainGainRef.current?.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
      }
      setIsPlaying(true);
    } else {
      if (ctx && mainGainRef.current) {
        // Fade out smoothly before suspending to prevent click noise
        mainGainRef.current.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.8);
        setTimeout(() => {
          ctx.suspend();
        }, 800);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      // Terminate AudioContext on unmount safely
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      id="ambient-audio-toggle"
      onClick={handleToggle}
      className={`group fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 outline-none select-none cursor-pointer ${
        isPlaying
          ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-400 glow-cyan shadow-lg'
          : 'bg-slate-950/80 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
      }`}
      title="Toggle Ambient Audio Hum"
    >
      {/* Moving Graphic Equalizer bars */}
      <div className="flex items-end gap-[2px] h-3 w-4">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`w-[2.5px] rounded-full bg-current transition-all ${
              isPlaying ? 'animate-bounce' : 'h-1'
            }`}
            style={{
              animationDuration: isPlaying ? `${0.5 + bar * 0.15}s` : '0s',
              height: isPlaying ? '100%' : '3px',
            }}
          />
        ))}
      </div>

      <span className="text-[10px] font-mono tracking-widest uppercase font-medium">
        {isPlaying ? 'Ambient Atelier Active' : 'Enable Space Hum'}
      </span>

      <span className="p-0.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
        {isPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
      </span>
    </button>
  );
}
