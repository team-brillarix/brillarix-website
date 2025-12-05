import { notFound } from 'next/navigation';
import { blogPosts, BlogPost } from '@/constants/blogs';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Image from 'next/image';

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

export async function generateMetadata({ params }: BlogPageProps) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: blog.title,
        description: blog.description,
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
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

                {/* Blog Image */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-dark-2">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>

                {/* Blog Title */}
                <Heading
                    variant="h1"
                    align="left"
                    className="mb-4"
                >
                    {blog.title}
                </Heading>

                {/* Blog Date */}
                <p className="text-sm text-gray-light-3 mb-6">
                    {blog.date}
                </p>

                {/* Blog Description */}
                <p className="text-lg text-gray-light-2 leading-relaxed mb-8 max-w-3xl">
                    {blog.description}
                </p>
            </Section>
        </div>
    );
}

