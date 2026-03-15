import { createFileRoute, Link } from '@tanstack/react-router'
import { getArticleBySlug, getGlobal, getStrapiMediaUrl } from '@/lib/strapi'
import type { Article, Global } from '@/types/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import ArticleCard from '@/components/ArticleCard'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const [articleRes, globalRes] = await Promise.all([
      getArticleBySlug({ data: params.slug }),
      getGlobal(),
    ])
    return {
      article: articleRes.data as Article | null,
      global: globalRes.data as Global,
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { article, global } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { banner, header, footer } = global

  const blogNavLabel =
    header?.navItems?.find(
      (item) => item.href === '/blog' || item.href?.endsWith('/blog')
    )?.label ?? 'Blog'

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        {banner?.isVisible && <Banner banner={banner} />}
        <Header header={header} />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="mb-6 text-muted-foreground">
              &ldquo;{slug}&rdquo; could not be found.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Back to {blogNavLabel}
            </Link>
          </div>
        </main>
        <Footer footer={footer} />
      </div>
    )
  }

  const featuredImageUrl = article.featuredImage?.url
    ? getStrapiMediaUrl(article.featuredImage.url)
    : null

  const publishDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const authorImageUrl = article.author?.image?.url
    ? getStrapiMediaUrl(article.author.image.url)
    : null

  const relatedArticles = article.relatedArticles ?? []

  const relatedHeading = article.author?.fullName
    ? `More from ${article.author.fullName}`
    : article.contentTags?.[0]?.title
      ? `More in ${article.contentTags[0].title}`
      : null

  return (
    <div className="flex min-h-screen flex-col">
      {banner?.isVisible && <Banner banner={banner} />}
      <Header header={header} />

      <main className="flex-1">
        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
              <img
                src={featuredImageUrl}
                alt={article.featuredImage?.alternativeText || article.title}
                className="h-[280px] w-full object-cover sm:h-[400px]"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {header?.navItems?.find((item) => item.href === '/')?.label ?? 'Home'}
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link to="/blog" className="hover:text-foreground transition-colors">
              {blogNavLabel}
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="truncate text-foreground font-medium">{article.title}</span>
          </nav>

          {/* Tags */}
          {article.contentTags && article.contentTags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {article.contentTags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          )}

          {/* Author & Date */}
          <div className="mb-10 flex items-center gap-3.5 border-b border-border pb-8">
            {authorImageUrl && (
              <img
                src={authorImageUrl}
                alt={article.author.fullName}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-border"
              />
            )}
            <div>
              {article.author && (
                <p className="text-sm font-semibold text-foreground">{article.author.fullName}</p>
              )}
              <p className="text-sm text-muted-foreground">{publishDate}</p>
            </div>
          </div>

          {/* Markdown Content */}
          {article.content && (
            <MarkdownRenderer content={article.content} />
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && relatedHeading && (
          <section className="border-t border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold tracking-tight">{relatedHeading}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <ArticleCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer footer={footer} />
    </div>
  )
}
