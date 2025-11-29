import { ImpactProject } from '@/constants/impact';
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
            className="rounded-3xl overflow-hidden h-full flex flex-col hover:opacity-90 transition-opacity cursor-pointer"
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
            <div className="flex justify-between items-center gap-6 py-4 px-6 bg-gray-dark-1 h-full">
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
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-light-2">
                        {project.metrics.label}
                    </p>
                    <div className="px-4 py-2 rounded-lg bg-gray-dark-3 shrink-0 text-gray-light-1 flex flex-col items-center">
                        <p className="text-xs">Up to</p>
                        <p className="font-bold text-lg">
                            {project.metrics.value}
                        </p>
                    </div>
                </div>
            </div>

        </Link>
    );
}


