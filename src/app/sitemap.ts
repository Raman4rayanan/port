import type { MetadataRoute } from 'next'
import { featuredProjects, Project } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ramanarayanan.vercel.app' // Replace with your custom domain if you get one
  const lastModified = new Date()

  // Base routes
  const routes = [
    '',
    '/about',
    '/skills',
    '/work',
    '/innovations',
    '/milestones',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic project routes
  const projectRoutes = featuredProjects.map((project: Project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...projectRoutes]
}
