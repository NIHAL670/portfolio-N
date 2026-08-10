import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <PageWrapper title="404 Not Found">
      <section className="min-h-[70vh] flex items-center justify-center bg-brand">
        <div className="text-center px-4">
          <div className="text-8xl md:text-9xl font-heading font-bold text-accent/20 mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
