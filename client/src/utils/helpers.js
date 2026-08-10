export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const truncate = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '…';
};

export const getApiImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${base}${path}`;
};
