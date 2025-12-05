import { MetadataRoute } from 'next'
import { impactProjects } from '@/constants/projects'
import { blogPosts } from '@/constants/blogs'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const projectRoutes = impactProjects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const blogRoutes = blogPosts.map((blog) => ({
        url: `${baseUrl}/blog/${blog.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...projectRoutes,
        ...blogRoutes,
    ]
}

