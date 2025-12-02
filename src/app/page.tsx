import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';
import OurImpact from '@/components/OurImpact/OurImpact';
import OurProcess from '@/components/OurProcess/OurProcess';
import FAQ from '@/components/FAQ/FAQ';
import InnovativeSolutions from '@/components/InnovativeSolutions';
import Blogs from '@/components/Blogs/Blogs';
import ContactUs from '@/components/ContactUs';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <OurClients />
      <OurImpact />
      <InnovativeSolutions />
      <TechStack />
      <OurProcess />
      <FAQ />
      <Blogs />
      <ContactUs />
    </div>
  );
}
