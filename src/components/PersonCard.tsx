import StrapiImage from '@/components/StrapiImage'
import type { PersonCardBlock } from '@/types/strapi'

interface Props {
  block: PersonCardBlock
}

export default function PersonCard({ block }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
          {/* Quote mark */}
          <svg
            className="absolute top-6 left-8 h-8 w-8 text-primary/15"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>

          <blockquote className="relative z-10">
            <p className="text-lg leading-8 text-muted-foreground italic">
              {block.text}
            </p>
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            {block.image?.url && (
              <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-border">
                <StrapiImage
                  url={block.image.url}
                  alternativeText={block.image.alternativeText}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">{block.personName}</p>
              <p className="text-sm text-muted-foreground">{block.personJob}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}