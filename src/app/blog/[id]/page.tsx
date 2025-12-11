import { notFound } from 'next/navigation';
import { blogPosts, BlogPost } from '@/constants/blogs';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { generateArticleSchema } from '@/lib/schema';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Image from 'next/image';
import type { Metadata } from 'next';

interface BlogPageProps {
    params: Promise<{ id: string }>;
}

async function getBlog(id: string): Promise<BlogPost | undefined> {
    return blogPosts.find((blog) => blog.id === id);
}

export async function generateStaticParams() {
    return blogPosts.map((blog) => ({
        id: blog.id,
    }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { id } = await params;
    const blog = await getBlog(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com';
    const blogUrl = `${baseUrl}/blog/${id}`;

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: blog.title,
        description: blog.description,
        alternates: {
            canonical: blogUrl,
        },
        openGraph: {
            type: 'article',
            title: blog.title,
            description: blog.description,
            url: blogUrl,
            images: [
                {
                    url: `${baseUrl}${blog.imageUrl}`,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
            publishedTime: blog.date,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.description,
            images: [`${baseUrl}${blog.imageUrl}`],
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { id } = await params;
    const blog = await getBlog(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com';
    const blogUrl = `${baseUrl}/blog/${id}`;

    if (!blog) {
        notFound();
    }

    const articleSchema = generateArticleSchema(
        blog.title,
        blog.description,
        `${baseUrl}${blog.imageUrl}`,
        blog.date,
        'Brillarix',
        'Brillarix',
        `${baseUrl}/logos/Brillarix-White-Mode.png`,
        blogUrl,
        {
            authorUrl: baseUrl,
            authorType: 'Organization',
        }
    );

    return (
        <div className="min-h-screen bg-background">
            <SchemaScript schema={articleSchema} id="article-schema" />
            <Section className="py-8 md:py-12 px-4 md:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-light-2 hover:text-gray-light-1 transition-colors mb-8 group"
                >
                    <MdArrowBack className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-dark-2">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>

                <Heading
                    variant="h1"
                    align="left"
                    className="mb-4"
                >
                    {blog.title}
                </Heading>

                <p className="text-sm text-gray-light-3 mb-6">
                    {blog.date}
                </p>

                <p className="text-lg text-gray-light-2 leading-relaxed mb-8 max-w-3xl">
                    {blog.description}
                </p>
            </Section>
        </div>
    );
}

