import Hero from '@/components/Hero';
import OurClients from '@/components/OurClients';
import HashScrollHandler from '@/components/HashScrollHandler';
import OurImpact from '@/components/OurImpact/OurImpact';
import InnovativeSolutions from '@/components/InnovativeSolutions';
import TechStack from '@/components/TechStack';
import OurProcess from '@/components/OurProcess/OurProcess';
import TrustedByInnovators from '@/components/TrustedByInnovators/TrustedByInnovators';
import IndustryExpertise from '@/components/IndustryExpertise';
import FAQ from '@/components/FAQ/FAQ';
import ContactUs from '@/components/ContactUs';

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
