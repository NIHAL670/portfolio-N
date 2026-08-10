import { PageWrapper } from '../components/layout/PageWrapper';
import { HeroSection } from '../components/home/HeroSection';
import { ClientLogosSection } from '../components/home/ClientLogosSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { TrustBadgesSection } from '../components/home/TrustBadgesSection';

export default function Home() {
  return (
    <PageWrapper
      title="Home"
      description="Codex crafts fast, mobile-first websites for cafes, gyms, salons, and more — designed to convert visitors into loyal customers."
      className="!pt-0"
    >
      <HeroSection />
      <ClientLogosSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <GetQuoteCTA />
      <TrustBadgesSection />
    </PageWrapper>
  );
}
