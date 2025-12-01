import { ProcessStep as ProcessStepType } from '@/types/process';
import {
    FiSearch,
    FiZap,
    FiCode,
    FiBarChart,
    FiRadio
} from 'react-icons/fi';
import { Heading } from '@/components/ui/Heading';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FiSearch,
    FiZap,
    FiCode,
    FiBarChart,
    FiRadio,
};

interface ProcessStepProps {
    step: ProcessStepType;
}

export function ProcessStep({ step }: ProcessStepProps) {
    const IconComponent = iconMap[step.icon] || FiSearch;

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 lg:gap-8 w-full">
            <div className="shrink-0 bg-gray-dark-1 self-stretch flex flex-col items-center justify-center gap-1 py-2 px-6">
                <p className="text-gray-light-3 text-xs">Time Saved</p>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-gray-light-1">
                    {step.timeSaved}
                </p>
            </div>

            <div className="shrink-0 w-16 h-16 md:w-28 md:h-28 lg:w-34 lg:h-34 rounded-3xl border border-gray-dark-8 bg-[linear-gradient(180deg,#1D1D1D_0%,#0D0D0D_100%)] flex items-center justify-center self-center">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 text-gray-light-1" />
            </div>

            <Heading
                variant="h5"
                as="h3"
                align="left"
            >
                {step.title}
            </Heading>

            <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <p className="text-sm md:text-base text-gray-light-3">
                    ({step.subtitle})
                </p>
                <p className="text-sm md:text-base text-gray-light-2 leading-relaxed">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

