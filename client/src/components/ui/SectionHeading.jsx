export function SectionHeading({ title, subtitle, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 md:mb-16 ${alignment} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
