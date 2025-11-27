import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <OurClients />
      <TechStack />
    </div>
  );
}
