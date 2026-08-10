export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg px-4.5 py-2.5 transition-all duration-200 cursor-pointer text-sm focus:outline-none focus:ring-4';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover border border-accent/10 shadow-sm shadow-accent/20 focus:ring-accent/25',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-sm focus:ring-white/10',
    outline: 'border border-white/15 text-slate-200 hover:bg-white/5 shadow-sm focus:ring-white/10',
    danger: 'bg-danger text-white border border-danger hover:bg-red-600 shadow-sm focus:ring-red-500/20',
    ghost: 'text-muted hover:text-white hover:bg-white/5 focus:ring-white/5',
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
