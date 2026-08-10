import { useState, useEffect, useRef } from 'react';

// 1. 3D Tilt Effect Hook
export function use3DTilt(maxTilt = 10, scale = 1.02) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = ((yc - y) / yc) * maxTilt;
    const rotateY = ((x - xc) / xc) * -maxTilt; // reversed for natural tilt
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  return { ref, style, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

// 2. Spotlight Glow Effect Hook
export function useSpotlight() {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      '--spotlight-x': `${coords.x}px`,
      '--spotlight-y': `${coords.y}px`,
      '--spotlight-opacity': opacity
    }
  };
}

// 3. Magnetic Element Hook
export function useMagnetic(strength = 0.2) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xc = rect.left + rect.width / 2;
    const yc = rect.top + rect.height / 2;
    const x = (e.clientX - xc) * strength;
    const y = (e.clientY - yc) * strength;
    setStyle({
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  return { ref, style, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

// 4. Custom Follow Cursor Component
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    addEventListeners();

    // Link hover listeners
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-pointer').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    // Run after DOM settles
    const timer = setTimeout(handleLinkHoverEvents, 2500);

    return () => {
      removeEventListeners();
      clearTimeout(timer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out mix-blend-difference hidden md:block ${
        clicked ? 'scale-75 bg-cyan' : 'bg-transparent border border-white'
      } ${linkHovered ? 'scale-150 bg-white/20 border-white' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

// 5. Text Scramble Hook
export function useTextScramble(text, delay = 0, trigger = true) {
  const [displayText, setDisplayText] = useState('');
  const chars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const frameRef = useRef(0);
  const queueRef = useRef([]);

  useEffect(() => {
    if (!trigger) return;

    let resolveTimer = setTimeout(() => {
      let frame = 0;
      const queue = [];
      
      for (let i = 0; i < text.length; i++) {
        const from = '';
        const to = text[i];
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20) + 10;
        queue.push({ from, to, start, end, char: '' });
      }

      queueRef.current = queue;

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0, n = queueRef.current.length; i < n; i++) {
          let { from, to, start, end, char } = queueRef.current[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queueRef.current[i].char = char;
            }
            output += `<span class="text-cyan font-mono">${char}</span>`;
          } else {
            output += from;
          }
        }

        setDisplayText(output);

        if (complete < queueRef.current.length) {
          frameRef.current = requestAnimationFrame(update);
          frame++;
        }
      };

      update();
    }, delay);

    return () => {
      clearTimeout(resolveTimer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, trigger]);

  return displayText;
}

// 6. Interactive Scramble Element Component
export function Scramble({ text, delay = 0, trigger = true }) {
  const scrambledHtml = useTextScramble(text, delay, trigger);
  return <span dangerouslySetInnerHTML={{ __html: scrambledHtml || text }} />;
}
