import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import OurClients from '@/components/OurClients';
import HashScrollHandler from '@/components/HashScrollHandler';

// Lazy load below-the-fold components
const OurImpact = dynamic(() => import('@/components/OurImpact/OurImpact'), {
  loading: () => null,
});
const InnovativeSolutions = dynamic(() => import('@/components/InnovativeSolutions'), {
  loading: () => null,
});
const TechStack = dynamic(() => import('@/components/TechStack'), {
  loading: () => null,
});
const OurProcess = dynamic(() => import('@/components/OurProcess/OurProcess'), {
  loading: () => null,
});
const TrustedByInnovators = dynamic(() => import('@/components/TrustedByInnovators/TrustedByInnovators'), {
  loading: () => null,
});
const IndustryExpertise = dynamic(() => import('@/components/IndustryExpertise'), {
  loading: () => null,
});
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'), {
  loading: () => null,
});
const ContactUs = dynamic(() => import('@/components/ContactUs'), {
  loading: () => null,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HashScrollHandler />
      <Hero />
      <OurClients />
      <OurImpact />
      <InnovativeSolutions />
      <TechStack />
      <OurProcess />
      {/* <WhyUs /> */}
      <TrustedByInnovators />
      <IndustryExpertise />
      <FAQ />
      <ContactUs />
    </div>
  );
}
