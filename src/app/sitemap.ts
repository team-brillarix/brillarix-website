import { MetadataRoute } from 'next'
import { impactProjects } from '@/constants/projects'
import { blogPosts } from '@/constants/blogs'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com'

function parseDate(dateString: string): Date {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return new Date();
        }
        return date;
    } catch {
        return new Date();
    }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    
    const projectRoutes = impactProjects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const blogRoutes = blogPosts.map((blog) => ({
        url: `${baseUrl}/blog/${blog.id}`,
        lastModified: parseDate(blog.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/get-quote`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...projectRoutes,
        ...blogRoutes,
    ]
}

