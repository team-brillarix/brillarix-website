import { notFound } from 'next/navigation';
import { impactProjects, ImpactProject } from '@/constants/projects';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

async function getProject(id: string): Promise<ImpactProject | undefined> {
    return impactProjects.find((project) => project.id === id);
}

export async function generateStaticParams() {
    return impactProjects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Section className="py-8 md:py-12 px-4 md:px-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-light-2 hover:text-gray-light-1 transition-colors mb-8 group"
                >
                    <MdArrowBack className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>

                {/* Project Video */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-dark-2">
                    <video
                        src={project.videoUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Project Title */}
                <Heading
                    variant="h1"
                    align="left"
                    className="mb-4"
                >
                    {project.title}
                </Heading>

                {/* Project Description */}
                <p className="text-lg text-gray-light-2 leading-relaxed mb-8 max-w-3xl">
                    {project.description}
                </p>

                {/* Metrics Card */}
                <div className="bg-gray-dark-1 rounded-2xl p-6 md:p-8 border border-gray-dark-3 max-w-2xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-light-3 mb-2">
                                {project.metrics.label}
                            </p>
                            <p className="text-3xl md:text-4xl font-bold text-gray-light-1">
                                {project.metrics.value}
                            </p>
                        </div>
                        <div className="px-6 py-4 rounded-lg bg-gray-dark-3 text-center shrink-0">
                            <p className="text-xs text-gray-light-3 mb-1">Impact</p>
                            <p className="text-2xl font-bold text-gray-light-1">
                                {project.metrics.value}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

