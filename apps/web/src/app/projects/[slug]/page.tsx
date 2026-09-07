import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/project-detail';
import { findProject, projects } from '@/constants/projects';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return {};

  return {
    title: `${project.name} — ${project.heroTitle}`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      url: `/projects/${project.slug}`,
      title: `${project.name} — ${project.heroTitle}`,
      description: project.tagline,
      images: [{ url: project.poster, alt: project.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — ${project.heroTitle}`,
      description: project.tagline,
      images: [project.poster],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
