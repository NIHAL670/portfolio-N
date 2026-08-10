import { useState, useEffect, useMemo, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { personalInfo } from './data';
import { useMagnetic, Scramble } from './useInteractiveEffects';
import { Button } from '../ui/Button';

// 1. Sparkles effect component (Aceternity style)
function Sparkles({ density = 30, minSize = 1, maxSize = 3.5, color = '#6c63ff' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.1,
      fadeSpeed: Math.random() * 0.012 + 0.003,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        
        ctx.beginPath();
        const cx = p.x;
        const cy = p.y;
        const spikes = 4;
        const outerRadius = p.size;
        const innerRadius = p.size / 2.5;
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Update position
        p.y += p.speedY;
        p.x += p.speedX;
        
        // Pulsing opacity
        p.opacity += p.fadeSpeed * p.direction;
        if (p.opacity > 0.8) p.direction = -1;
        if (p.opacity < 0.15) p.direction = 1;

        // Reset if out of boundaries
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [density, minSize, maxSize, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// 2. Left-side ML training monitor widget (Aceternity Glowing Border + Untitled UI Details)
function MLTrainingWidget({ trigger }) {
  const [epoch, setEpoch] = useState(382);
  const [loss, setLoss] = useState(0.042);
  const [acc, setAcc] = useState(97.85);

  useEffect(() => {
    if (!trigger) return;
    const interval = setInterval(() => {
      setEpoch(prev => (prev < 500 ? prev + 1 : 380));
      setLoss(prev => Math.max(0.012, prev - (Math.random() * 0.0018)));
      setAcc(prev => Math.min(99.82, prev + (Math.random() * 0.045)));
    }, 1500);
    return () => clearInterval(interval);
  }, [trigger]);

  const bars = useMemo(() => 
    Array.from({ length: 12 }, () => 15 + Math.random() * 25), [epoch]
  );

  return (
    <div className={`hidden lg:flex flex-col absolute left-[2%] xl:left-[6%] top-[30%] w-60 border-beam-container glass p-4 rounded-2xl select-none shadow-2xl shadow-accent/5 z-20 transition-all duration-1000 ${
      trigger ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
    }`} style={{ animation: 'float 6s ease-in-out infinite' }}>
      <div className="border-beam" />
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">ML_TRAIN_MONITOR</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">EPOCH {epoch}/500</span>
      </div>
      <div className="space-y-2.5 font-mono text-xs text-slate-300 relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-muted text-[10px]">Loss Rate:</span>
          <span className="text-rose-400 font-semibold">{loss.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted text-[10px]">Accuracy:</span>
          <span className="text-emerald-400 font-semibold">{acc.toFixed(2)}%</span>
        </div>
        <div className="pt-2">
          <div className="text-[9px] text-muted mb-2 uppercase tracking-wider">Convergence Curve</div>
          <div className="h-10 flex items-end gap-1.5 bg-brand-dark/30 rounded-lg p-2 border border-white/5">
            {bars.map((height, i) => (
              <div
                key={i}
                className="w-full bg-gradient-to-t from-accent/50 to-cyan rounded-sm transition-all duration-500"
                style={{ height: `${height * 0.8}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Right-side API latency widget (Aceternity Glowing Border + Untitled UI Details)
function APIMonitorWidget({ trigger }) {
  const [requests, setRequests] = useState(14820);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    if (!trigger) return;
    const interval = setInterval(() => {
      setRequests(prev => prev + Math.floor(Math.random() * 4) + 1);
      setLatency(prev => Math.max(8, Math.min(26, prev + (Math.random() - 0.5) * 4)));
    }, 1200);
    return () => clearInterval(interval);
  }, [trigger]);

  return (
    <div className={`hidden lg:flex flex-col absolute right-[2%] xl:right-[6%] top-[34%] w-60 border-beam-container glass p-4 rounded-2xl select-none shadow-2xl shadow-cyan/5 z-20 transition-all duration-1000 ${
      trigger ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
    }`} style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1.5s' }}>
      <div className="border-beam" />
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
          <span className="text-[10px] font-mono text-cyan uppercase tracking-wider">LATENCY_DAEMON</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">RTT</span>
      </div>
      <div className="space-y-2.5 font-mono text-xs text-slate-300 relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-muted text-[10px]">POST /predict:</span>
          <span className="text-cyan font-semibold">{latency.toFixed(0)} ms</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted text-[10px]">Total Calls:</span>
          <span className="text-white font-semibold">{requests.toLocaleString()}</span>
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between text-[9px] text-muted mb-1.5 uppercase tracking-wider">
            <span>Integrity</span>
            <span className="text-emerald-400 font-semibold font-mono">99.98%</span>
          </div>
          <div className="w-full bg-brand-dark/50 border border-white/5 h-2 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-accent to-cyan rounded-full" style={{ width: '99.98%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  
  // Spotlight states
  const [spotlightCoords, setSpotlightCoords] = useState({ x: 0, y: 0 });
  const [showSpotlight, setShowSpotlight] = useState(false);

  const currentRole = personalInfo.roles[roleIndex];
  const displayText = currentRole.substring(0, charIndex);

  // Magnetic button effects
  const btn1 = useMagnetic(0.15);
  const btn2 = useMagnetic(0.15);

  // Delay hero animations until intro is done
  useEffect(() => {
    const timer = setTimeout(() => setAnimateHero(true), 3600);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!animateHero) return;

    let timeout;
    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex(prev => prev + 1), 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(prev => prev - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % personalInfo.roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole.length, roleIndex, animateHero]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowSpotlight(true);
  };

  const handleMouseLeave = () => {
    setShowSpotlight(false);
  };

  const stagger = (n) =>
    `hero-stagger hero-stagger-${n} ${animateHero ? 'animate' : ''}`;

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand aurora-bg"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 hero-grid opacity-15"></div>

      {/* Interactive mouse follow Spotlight (Aceternity style) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: showSpotlight ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightCoords.x}px ${spotlightCoords.y}px, rgba(108, 99, 255, 0.14), rgba(34, 211, 238, 0.04) 50%, transparent 100%)`
        }}
      />

      {/* Twinkling star Sparkles background (Aceternity style) */}
      <Sparkles density={35} minSize={1} maxSize={4} color="#22d3ee" />
      <Sparkles density={20} minSize={1} maxSize={3} color="#6c63ff" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 pointer-events-none">
        <div className="hero-glow-animated w-[600px] h-[600px] bg-accent/8 rounded-full blur-[100px]" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 pointer-events-none">
        <div className="hero-glow-animated w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px]" style={{ animationDelay: '3.5s' }}></div>
      </div>

      {/* Left side telemetry monitor */}
      <MLTrainingWidget trigger={animateHero} />

      {/* Right side telemetry monitor */}
      <APIMonitorWidget trigger={animateHero} />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Availability badge (Untitled UI Pill Style) */}
        <div className={stagger(1)}>
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 font-mono">
              <Scramble text={personalInfo.availability} trigger={animateHero} delay={200} />
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className={stagger(2)}>
          <p className="text-muted text-sm tracking-widest font-mono mb-4">
            <Scramble text="SYSTEM_INIT // HI_I_AM" trigger={animateHero} delay={400} />
          </p>
        </div>

        {/* Name */}
        <div className={stagger(3)}>
          <h1 className="text-5xl md:text-8xl font-black font-heading mb-6 tracking-tight gradient-text pb-2 select-none">
            <Scramble text={personalInfo.name.toUpperCase()} trigger={animateHero} delay={600} />
          </h1>
        </div>

        {/* Dynamic Typing Role */}
        <div className={stagger(4)}>
          <div className="h-8 md:h-10 mb-8 flex items-center justify-center font-mono">
            <span className="text-muted text-lg mr-2 font-light">Specializing in</span>
            <p className="text-xl md:text-2xl text-accent font-semibold">
              {displayText}<span className="animate-blink font-bold text-cyan">|</span>
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className={stagger(5)}>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {personalInfo.tagline}
          </p>
        </div>

        {/* CTA Buttons (Untitled UI style) */}
        <div className={stagger(6)}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <div 
              ref={btn1.ref} 
              onMouseMove={btn1.onMouseMove} 
              onMouseLeave={btn1.onMouseLeave} 
              style={btn1.style}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-3.5 text-sm uppercase tracking-wider font-semibold"
              >
                Explore Projects
              </Button>
            </div>
            <div 
              ref={btn2.ref} 
              onMouseMove={btn2.onMouseMove} 
              onMouseLeave={btn2.onMouseLeave} 
              style={btn2.style}
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-3.5 text-sm uppercase tracking-wider font-semibold"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center ${stagger(6)}`}>
        <a href="#about" aria-label="Scroll down" className="text-muted hover:text-white transition-colors cursor-pointer scroll-indicator">
          <FiChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}
