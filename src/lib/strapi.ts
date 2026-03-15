import { createServerFn } from '@tanstack/react-start'
import type { LandingPage, Global, ArticlesResponse, Article, StrapiPage } from '@/types/strapi'

export function getStrapiMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  return `${strapiUrl}${url}`
}

async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const baseUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  const url = new URL(path, baseUrl)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
  const res = await fetch(url.toString(), { headers })
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`)
  return res.json()
}

export const getLandingPage = createServerFn({ method: 'GET' }).handler(async () => {
  return fetchStrapi<{ data: LandingPage }>('/api/landing-page?status=published')
})

export const getGlobal = createServerFn({ method: 'GET' }).handler(async () => {
  return fetchStrapi<{ data: Global }>('/api/global?status=published')
})

export const getArticles = createServerFn({ method: 'GET' }).handler(
  async () => {
    const params: Record<string, string> = {
      'status': 'published',
      'pagination[start]': '0',
      'pagination[limit]': '100',
      'sort[0]': 'publishedAt:desc',
    }
    return fetchStrapi<ArticlesResponse>('/api/articles', params)
  }
)

export const getArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((input: string) => input)
  .handler(async (ctx) => {
    const slug = ctx.data
    const params: Record<string, string> = {
      'status': 'published',
      'filters[slug][$eq]': slug,
    }
    const res = await fetchStrapi<{ data: Article[] }>('/api/articles', params)
    return { data: res.data?.[0] ?? null }
  })

export const getPages = createServerFn({ method: 'GET' }).handler(
  async () => {
    const params: Record<string, string> = {
      'status': 'published',
      'pagination[start]': '0',
      'pagination[limit]': '100',
    }
    return fetchStrapi<{ data: StrapiPage[] }>('/api/pages', params)
  }
)

export const getAboutPage = createServerFn({ method: 'GET' }).handler(
  async () => {
    const params: Record<string, string> = {
      'status': 'published',
      'filters[slug][$eq]': 'about',
    }
    const res = await fetchStrapi<{ data: StrapiPage[] }>('/api/pages', params)
    return { data: res.data?.[0] ?? null }
  }
)
