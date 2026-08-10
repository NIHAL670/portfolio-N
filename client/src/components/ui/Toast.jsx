export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const bgColor = toast.type === 'success' ? 'bg-success' : toast.type === 'error' ? 'bg-danger' : 'bg-warning';

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]`}>
        <span className="text-lg">{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : '⚠️'}</span>
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button onClick={onClose} className="text-white/70 hover:text-white ml-2 cursor-pointer" aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
}
