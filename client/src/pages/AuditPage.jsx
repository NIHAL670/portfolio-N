import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { AuditTool } from '../components/audit/AuditTool';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';

export default function AuditPage() {
  return (
    <PageWrapper title="Free Website Audit" description="Enter your website URL and get an instant health report — completely free.">
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Get Your Free Website Audit"
            subtitle="Enter your website URL and get an instant health report — completely free. No sign-up required."
          />
          <AuditTool />
        </div>
      </section>

      <GetQuoteCTA />
    </PageWrapper>
  );
}
