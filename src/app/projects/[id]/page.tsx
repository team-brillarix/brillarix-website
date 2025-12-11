import { notFound } from 'next/navigation';
import { impactProjects, ImpactProject } from '@/constants/projects';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { generateCreativeWorkSchema } from '@/lib/schema';
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com';
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com';
    const projectUrl = `${baseUrl}/projects/${id}`;

    if (!project) {
        notFound();
    }

    const projectSchema = generateCreativeWorkSchema(
        project.title,
        project.description,
        projectUrl,
        'Brillarix',
        baseUrl,
        'Brillarix',
        `${baseUrl}/logos/Brillarix-White-Mode.png`
    );

    return (
        <div className="min-h-screen bg-background">
            <SchemaScript schema={projectSchema} id="project-schema" />
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
                        className="w-full h-full object-cover"
                    />
                </div>

                <Heading
                    variant="h1"
                    align="left"
                    className="mb-4"
                >
                    {project.title}
                </Heading>

                <p className="text-lg text-gray-light-2 leading-relaxed mb-8 max-w-3xl">
                    {project.description}
                </p>

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

