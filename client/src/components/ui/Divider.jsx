export function Divider({ className = '' }) {
  return (
    <div className={`w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-16 md:my-20 ${className}`} />
  );
}
