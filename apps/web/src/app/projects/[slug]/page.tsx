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

  // A project still waiting on its artwork falls back to the site card, rather
  // than advertising an image URL that is not there yet.
  const shareImage = project.poster;

  return {
    title: `${project.name} — ${project.heroTitle}`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      url: `/projects/${project.slug}`,
      title: `${project.name} — ${project.heroTitle}`,
      description: project.tagline,
      ...(shareImage ? { images: [{ url: shareImage, alt: project.name }] } : {}),
    },
    twitter: {
      card: shareImage ? 'summary_large_image' : 'summary',
      title: `${project.name} — ${project.heroTitle}`,
      description: project.tagline,
      ...(shareImage ? { images: [shareImage] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
