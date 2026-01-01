import { notFound } from 'next/navigation';
import { impactProjects } from '@/constants/projects';
import { ImpactProject } from '@/types/project';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import type { Metadata } from 'next';

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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brillarix.com';
    const projectUrl = `${baseUrl}/projects/${id}`;

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
        alternates: {
            canonical: projectUrl,
        },
        openGraph: {
            type: 'website',
            title: project.title,
            description: project.description,
            url: projectUrl,
            images: [
                {
                    url: `${baseUrl}/logos/Twitter_Image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} - Brillarix Project`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: [`${baseUrl}/logos/Twitter_Image.png`],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brillarix.com';
    const projectUrl = `${baseUrl}/projects/${id}`;

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Section className="py-8 md:py-12 px-4 md:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-light-2 hover:text-gray-light-1 transition-colors mb-8 group"
                >
                    <MdArrowBack className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-dark-2">
                    <video
                        src={project.videoUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                    />
                </div>

                <Heading
                    variant="h1"
                    as="h1"
                    align="center"
                    subtitle={project.description}
                    subtitleClassName='text-sm sm:text-base md:text-lg text-gray-light-2 leading-relaxed max-w-3xl'
                >
                    {project.title}
                </Heading>

                <div className="bg-gray-dark-1 rounded-2xl p-6 md:p-8 border border-gray-dark-3 max-w-2xl">
                    <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-light-3">
                                {project.metrics.label}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 px-6 py-4 rounded-lg bg-gray-dark-3 text-center shrink-0">
                            <p className="text-xs text-gray-light-3">Impact</p>
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

