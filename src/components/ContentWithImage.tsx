import { cn } from '@/lib/cn'
import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import type { ContentWithImageBlock } from '@/types/strapi'

interface Props {
  block: ContentWithImageBlock
}

export default function ContentWithImage({ block }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        className={cn(
          'flex flex-col items-center gap-10 lg:gap-16',
          block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        {/* Image */}
        {block.image?.url && (
          <div className="flex-1 w-full">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
              <StrapiImage
                url={block.image.url}
                alternativeText={block.image.alternativeText}
                className="w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Text content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-tight">
            {block.heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {block.content}
          </p>
          {block.link && (
            <div className="mt-8">
              <StrapiLink {...block.link} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}