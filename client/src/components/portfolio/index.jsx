import { useState, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Achievements } from "./Achievements";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FiLayers } from "react-icons/fi";
import { CustomCursor } from "./useInteractiveEffects";

const themes = [
  { name: "Cyber Synapse", accent: "#6c63ff", accentHover: "#5a52e0", cyan: "#22d3ee" },
  { name: "Forest Matrix", accent: "#10b981", accentHover: "#059669", cyan: "#2dd4bf" },
  { name: "Electric Crimson", accent: "#f43f5e", accentHover: "#e11d48", cyan: "#ec4899" },
  { name: "Neon Gold", accent: "#f59e0b", accentHover: "#d97706", cyan: "#f97316" },
  { name: "Royal Amethyst", accent: "#8b5cf6", accentHover: "#7c3aed", cyan: "#d946ef" },
  { name: "Quantum Blue", accent: "#3b82f6", accentHover: "#2563eb", cyan: "#38bdf8" },
  { name: "Toxic Lime", accent: "#84cc16", accentHover: "#65a30d", cyan: "#eab308" },
  { name: "Red Alert", accent: "#ef4444", accentHover: "#dc2626", cyan: "#f97316" },
  { name: "Minty Breeze", accent: "#0d9488", accentHover: "#0f766e", cyan: "#a3e635" },
  { name: "Slate Silver", accent: "#94a3b8", accentHover: "#475569", cyan: "#cbd5e1" }
];

function IntroScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  const [logText, setLogText] = useState("Initializing neural weights...");
  const canvasRef = useRef(null);

  useEffect(() => {
    const logStages = [
      { delay: 400, text: "Compiling scikit-learn pipeline..." },
      { delay: 900, text: "Mapping PostgreSQL & Redis connectors..." },
      { delay: 1400, text: "Optimizing model inference graphs..." },
      { delay: 1900, text: "Calibrating probability confidence scores..." },
      { delay: 2300, text: "Ready. Launching environment..." }
    ];

    const timers = logStages.map(stage => 
      setTimeout(() => setLogText(stage.text), stage.delay)
    );

    const exitTimer = setTimeout(() => setExiting(true), 2800);
    const removeTimer = setTimeout(() => onComplete(), 3600);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  // Canvas Neural Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 15, 30, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(108, 99, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(108, 99, 255, 0.7)" : "rgba(34, 211, 238, 0.7)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = i % 2 === 0 ? "#6c63ff" : "#22d3ee";
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`intro-overlay ${exiting ? "exit" : ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="intro-name gradient-text font-heading text-6xl tracking-widest font-black select-none">
          NIHAL
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="intro-progress w-48">
            <div className="intro-progress-bar" style={{ animationDuration: "2.8s" }}></div>
          </div>
          <div className="font-mono text-xs text-cyan opacity-80 tracking-wide mt-2 h-4 text-center">
            {logText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [themeIdx, setThemeIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const activeTheme = themes[themeIdx];

  const cycleTheme = () => {
    setThemeIdx(prev => (prev + 1) % themes.length);
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2200);
    return () => clearTimeout(timer);
  }, [showToast, themeIdx]);

  return (
    <div 
      style={{
        "--color-accent": activeTheme.accent,
        "--color-accent-hover": activeTheme.accentHover,
        "--color-cyan": activeTheme.cyan,
      }}
      className="min-h-screen bg-brand selection:bg-accent/30 selection:text-white"
    >
      {/* Dynamic Creative Custom Follow Cursor */}
      {!showIntro && <CustomCursor />}

      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      {!showIntro && <Navbar />}
      
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Achievements />
        <div className="section-divider" />
        <Contact />
      </main>
      
      <Footer />

      {/* Floating Theme Toggle Switcher Button */}
      {!showIntro && (
        <button
          onClick={cycleTheme}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg shadow-accent/20 cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white/10"
          title="Cycle Accent Theme"
          aria-label="Cycle Accent Theme"
        >
          <FiLayers size={20} className="animate-spin-slow" />
        </button>
      )}

      {/* Theme Selection Toast (Untitled UI Alert Style) */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-40 bg-surface/90 backdrop-blur border border-accent/20 rounded-xl px-4 py-2.5 text-xs font-mono text-white flex items-center gap-2 shadow-2xl animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.accent }}></span>
          Theme loaded: <span className="text-cyan font-bold">{activeTheme.name}</span>
        </div>
      )}
    </div>
  );
}
