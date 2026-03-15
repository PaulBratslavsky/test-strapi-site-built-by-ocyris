import { Link } from '@tanstack/react-router'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { Article } from '@/types/strapi'

export default function ArticleCard({ article }: { article: Article }) {
  const imageUrl = article.featuredImage?.url
    ? getStrapiMediaUrl(article.featuredImage.url)
    : null

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
    >
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={article.featuredImage?.alternativeText || article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2.5 text-xs text-muted-foreground">
          {article.author && (
            <span className="font-medium text-foreground">{article.author.fullName}</span>
          )}
          {article.author && <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />}
          <span>{date}</span>
        </div>
        <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {article.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>
      </div>
    </Link>
  )
}
