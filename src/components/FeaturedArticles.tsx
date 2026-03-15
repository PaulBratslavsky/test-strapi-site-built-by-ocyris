import ArticleCard from '@/components/ArticleCard'
import type { FeaturedArticlesBlock } from '@/types/strapi'

interface Props {
  block: FeaturedArticlesBlock
}

export default function FeaturedArticles({ block }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {block.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}