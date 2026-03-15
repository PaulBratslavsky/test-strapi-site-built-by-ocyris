import type { SectionHeadingBlock } from '@/types/strapi'

interface Props {
  block: SectionHeadingBlock
}

export default function SectionHeading({ block }: Props) {
  return (
    <section
      id={block.anchorLink || undefined}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center"
    >
      {block.subHeading && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          {block.subHeading}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {block.heading}
      </h2>
    </section>
  )
}