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
      <div className="w-full flex flex-col">
        {processSteps.map((step, index) => (
          <div key={step.id} className={index < processSteps.length - 1 ? "border-b border-gray-dark-4" : ""}>
            <ProcessStep step={step} />
          </div>
        ))}
      </div>
    </Section>
  );
}

