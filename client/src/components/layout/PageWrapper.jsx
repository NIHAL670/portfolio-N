import { Helmet } from 'react-helmet-async';

export function PageWrapper({ title, description, children, className = '' }) {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Codex` : 'Codex — Web Design & Development Agency'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <main className={`pt-20 ${className}`}>
        {children}
      </main>
    </>
  );
}
