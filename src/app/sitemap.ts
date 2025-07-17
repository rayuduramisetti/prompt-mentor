import { MetadataRoute } from 'next'
import { promptTypes } from '@/config/promptTypes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://promptmentor.rayuduramisetti.com'
  
  // Generate sitemap entries for all prompt types
  const promptPages = promptTypes.map((promptType) => ({
    url: `${baseUrl}/prompt/${promptType.key}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/summary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...promptPages,
  ]
}