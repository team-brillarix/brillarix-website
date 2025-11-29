import { Section } from '@/components/ui/Section';
import { processSteps } from '@/constants/process';
import { ProcessStep } from './ProcessStep';

export default function OurProcess() {
  return (
    <Section
      title="Our Process
From Concept to Launch, Faster Than Ever"
      subtitle="A streamlined, AI-powered process that accelerates every step of your product development, ensuring faster, smarter, and more reliable results."
      className="py-16 md:py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-12">
        {processSteps.map((step) => (
          <ProcessStep key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
}

