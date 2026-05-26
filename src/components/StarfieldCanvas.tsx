import { useEffect, useRef, useState } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseActive, setMouseActive] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler with buffering
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      if (!mouseActive) setMouseActive(true);
    };

    const handleMouseLeave = () => {
      setMouseActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Generate stable points for particles & orbits
    const particleCount = Math.min(65, Math.floor((width * height) / 25000));
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI,
      });
    }

    // Planetary / Orbital Rings (Futuristic Blueprint aesthetic)
    const orbits = [
      { rx: width * 0.35, ry: height * 0.45, cx: width * 0.2, cy: height * 0.3, rot: -0.1, speed: 0.0003 },
      { rx: width * 0.5, ry: height * 0.3, cx: width * 0.8, cy: height * 0.7, rot: 0.3, speed: -0.0002 },
      { rx: width * 0.25, ry: width * 0.25, cx: width * 0.5, cy: height * 0.5, rot: 0.15, speed: 0.0001 }
    ];

    let t = 0;

    const render = () => {
      t += 1;
      
      // Interpolate mouse with damping for high-end cinematic smoothness
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Subtle Space Grid Background
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Interactive Ambient Mouse Light Glowing Overlay
      if (mouseActive) {
        const radGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          320
        );
        radGrad.addColorStop(0, 'rgba(0, 191, 255, 0.06)');
        radGrad.addColorStop(1, 'rgba(7, 17, 31, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 320, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Rotating Scientific/Astrolabe Orbits
      orbits.forEach((orb) => {
        ctx.save();
        ctx.translate(orb.cx, orb.cy);
        ctx.rotate(orb.rot + t * orb.speed);
        
        // Draw the circular vector ring
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.04)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Draw structural design ticks on the ring
        ctx.fillStyle = 'rgba(0, 191, 255, 0.15)';
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
          const tx = Math.cos(angle) * orb.rx;
          const ty = Math.sin(angle) * orb.ry;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 4. Update and Draw Moving Star Particles
      particles.forEach((p) => {
        // Move particles softly
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse the alpha state
        const currentPulse = p.alpha + Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.15;
        const finalAlpha = Math.max(0.05, Math.min(0.8, currentPulse));

        // Interaction with Pointer: draw a light connector line if close
        if (mouseActive) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 160) {
            const lineAlpha = (1 - distance / 160) * 0.12;
            ctx.strokeStyle = `rgba(0, 191, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Draw individual particle
        ctx.fillStyle = `rgba(0, 191, 255, ${finalAlpha})`;
        ctx.shadowColor = 'rgba(0, 191, 255, 0.4)';
        ctx.shadowBlur = p.size > 1.5 ? 4 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for efficiency
      });

      // 5. Drawing static subtle corner crosshairs representing high-end minimal HUD UI
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.2)';
      ctx.lineWidth = 1;
      const ch = 12; // crosshair length
      const pad = 24; // offset padding
      
      // Top Left
      ctx.beginPath(); ctx.moveTo(pad, pad + ch); ctx.lineTo(pad, pad); ctx.lineTo(pad + ch, pad); ctx.stroke();
      // Top Right
      ctx.beginPath(); ctx.moveTo(width - pad, pad + ch); ctx.lineTo(width - pad, pad); ctx.lineTo(width - pad - ch, pad); ctx.stroke();
      // Bottom Left
      ctx.beginPath(); ctx.moveTo(pad, height - pad - ch); ctx.lineTo(pad, height - pad); ctx.lineTo(pad + ch, height - pad); ctx.stroke();
      // Bottom Right
      ctx.beginPath(); ctx.moveTo(width - pad, height - pad - ch); ctx.lineTo(width - pad, height - pad); ctx.lineTo(width - pad - ch, height - pad); ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
