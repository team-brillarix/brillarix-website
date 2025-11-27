import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';
import OurImpact from '@/components/OurImpact/OurImpact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <OurClients />
      <OurImpact />
      <TechStack />
    </div>
  );
}
