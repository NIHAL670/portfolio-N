export function Badge({ children, dot = false, dotColor = 'bg-accent', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-white/10 bg-white/5 text-slate-300 font-mono transition-all hover:bg-white/8 ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}></span>}
      {children}
    </span>
  );
}
