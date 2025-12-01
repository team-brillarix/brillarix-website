import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';
import OurImpact from '@/components/OurImpact/OurImpact';
import InnovativeSolutions from '@/components/InnovativeSolutions';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <OurClients />
      <OurImpact />
      <InnovativeSolutions />
      <TechStack />
    </div>
  );
}
