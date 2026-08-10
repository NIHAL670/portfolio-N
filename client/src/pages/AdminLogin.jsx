import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AdminLogin } from '../components/admin/AdminLogin';

export default function AdminLoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  return (
    <PageWrapper title="Admin Login">
      <AdminLogin error={error === 'unauthorized'} />
    </PageWrapper>
  );
}
