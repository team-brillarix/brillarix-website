import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import { techStackData } from '@/constants/techStack';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TechStack categories={techStackData} />
    </div>
  );
}
