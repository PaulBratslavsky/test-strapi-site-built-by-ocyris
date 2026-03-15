import type { NewsletterBlock } from '@/types/strapi'

interface Props {
  block: NewsletterBlock
}

export default function Newsletter({ block }: Props) {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {block.heading}
          </h2>
          {block.text && (
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {block.text}
            </p>
          )}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              placeholder={block.placeholder}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:max-w-xs"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors sm:w-auto"
            >
              {block.label}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}