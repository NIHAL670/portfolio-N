import { useEffect } from 'react';

export function Modal({ isOpen, onClose, children, className = '' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative z-10 bg-surface rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-4xl animate-slide-up ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors z-20 w-10 h-10 flex items-center justify-center rounded-full bg-brand/80 hover:bg-brand cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
