import { ImpactProject } from '@/constants/impact';
import { Heading } from '@/components/ui/Heading';
import { useEffect, useRef } from 'react';

export function ImpactCard({ project, isActive }: { project: ImpactProject; isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.play().catch(() => { });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isActive]);

    return (
        <div className="rounded-3xl overflow-hidden h-full flex flex-col">
            {/* Video */}
            <div className="relative w-full aspect-video">
                <video
                    ref={videoRef}
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Project Details */}
            <div className="flex justify-between gap-2 py-4 px-6">
                {/* Title and Description */}
                <Heading
                    variant="h5"
                    align="left"
                    weight="bold"
                    subtitle={project.description}
                    subtitleClassName='text-xs! mt-1!'
                >
                    {project.title}
                </Heading>

                {/* Metrics */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-gray-dark-3">
                    <span className="text-sm text-gray-light-1 flex-1">
                        {project.metrics.label}
                    </span>
                    <div className="px-4 py-2 rounded-lg bg-gray-dark-4 shrink-0">
                        <span className="font-bold text-gray-light-1">
                            {project.metrics.value}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}


