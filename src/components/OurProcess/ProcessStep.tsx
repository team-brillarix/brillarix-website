import { ProcessStep as ProcessStepType } from '@/constants/process';
import {
    FiSearch,
    FiZap,
    FiCode,
    FiBarChart,
    FiRadio
} from 'react-icons/fi';

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
            {/* Time Saved - Far Left */}
            <div className="shrink-0 w-16 md:w-20 lg:w-24">
                <p className="text-base md:text-lg lg:text-xl font-semibold text-gray-light-1">
                    {step.timeSaved}
                </p>
            </div>

            {/* Icon */}
            <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-xl border-2 border-gray-dark-3 bg-gray-dark-2 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 text-gray-light-1" />
                </div>
            </div>

            {/* Content - Right Side */}
            <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-light-1">
                        {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-light-3 mt-0.5">
                        ({step.subtitle})
                    </p>
                </div>
                <p className="text-sm md:text-base text-gray-light-2 leading-relaxed">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

