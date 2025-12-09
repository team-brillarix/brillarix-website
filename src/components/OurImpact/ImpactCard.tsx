import { ImpactProject } from '@/constants/projects';
import { Heading } from '@/components/ui/Heading';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

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
        <Link
            href={`/projects/${project.id}`}
            className="rounded-3xl overflow-hidden h-full flex flex-col transition-colors cursor-pointer border-2 border-gray-dark-3 hover:border-gray-dark-5"
        >
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 lg:gap-8 py-4 px-4 sm:px-6 bg-gray-dark-1 h-full">
                {/* Title and Description */}
                <div className="flex-1 min-w-0">
                    <Heading
                        variant="h5"
                        align="left"
                        subtitle={project.description}
                        subtitleClassName='text-xs! mt-1!'
                    >
                        {project.title}
                    </Heading>
                </div>

                {/* Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto sm:max-w-[40%]">
                    <p className="text-xs sm:text-sm text-gray-light-2">
                        {project.metrics.label}
                    </p>
                    <div className="px-3 sm:px-4 py-2 rounded-lg bg-gray-dark-3 shrink-0 text-gray-light-1 flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-1 sm:gap-0 w-fit sm:w-auto">
                        <p className="text-xs">Up to</p>
                        <p className="font-bold text-base sm:text-lg">
                            {project.metrics.value}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}


