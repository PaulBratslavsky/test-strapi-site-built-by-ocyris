import { createFileRoute, Link } from '@tanstack/react-router'
import { getArticles, getGlobal } from '@/lib/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/types/strapi'
import { useState } from 'react'

const PAGE_SIZE = 4

type BlogSearch = {
  page?: number
  search?: string
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    return {
      page: Number(search?.page) || 1,
      search: (search?.search as string) || undefined,
    }
  },
  loaderDeps: ({ search: { page, search } }) => ({ page, search }),
  loader: async ({ deps: { page, search } }) => {
    const [articlesRes, global] = await Promise.all([
      getArticles(),
      getGlobal(),
    ])
    return { articlesRes, global, page: page ?? 1, search }
  },
  component: BlogPage,
})

function BlogPage() {
  const { articlesRes, global, page, search } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const [searchInput, setSearchInput] = useState(search || '')

  const allArticles = articlesRes.data
  const filtered = search
    ? allArticles.filter((a: Article) =>
        a.title.toLowerCase().includes(search.toLowerCase())
      )
    : allArticles

  const total = filtered.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const articleList = filtered.slice(start, start + PAGE_SIZE)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate({
      search: {
        page: 1,
        search: searchInput || undefined,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Banner banner={global.data.banner} />
      <Header header={global.data.header} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Blog
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mx-auto mb-10 flex max-w-lg gap-2">
            <div className="relative flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Active Search Indicator */}
          {search && (
            <div className="mb-8 flex items-center justify-center gap-3 text-sm">
              <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                {search}
              </span>
              <span className="text-muted-foreground">({total} {total === 1 ? 'result' : 'results'})</span>
              <Link
                to="/blog"
                search={{ page: 1 }}
                className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
              >
                Clear
              </Link>
            </div>
          )}

          {/* Articles Grid */}
          {articleList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {articleList.map((article: Article) => (
                <ArticleCard key={article.documentId} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  {total === 0 && allArticles.length > 0 ? 'No matching articles.' : 'No articles available.'}
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-1">
              <Link
                to="/blog"
                search={{ page: page - 1, search }}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
                  page <= 1 ? 'pointer-events-none text-muted-foreground/30' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                aria-disabled={page <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  to="/blog"
                  search={{ page: p, search }}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {p}
                </Link>
              ))}

              <Link
                to="/blog"
                search={{ page: page + 1, search }}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
                  page >= totalPages ? 'pointer-events-none text-muted-foreground/30' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                aria-disabled={page >= totalPages}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </nav>
          )}
        </div>
      </main>
      <Footer footer={global.data.footer} />
    </div>
  )
}
