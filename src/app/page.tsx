import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';
import OurImpact from '@/components/OurImpact/OurImpact';
import OurProcess from '@/components/OurProcess/OurProcess';
import FAQ from '@/components/FAQ/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <OurClients />
      <OurImpact />
      <TechStack />
      <OurProcess />
      <FAQ />
    </div>
  );
}
