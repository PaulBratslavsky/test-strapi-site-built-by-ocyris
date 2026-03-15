import MarkdownRenderer from '@/components/MarkdownRenderer'
import type { MarkdownBlock } from '@/types/strapi'

interface Props {
  block: MarkdownBlock
}

export default function MarkdownSection({ block }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <MarkdownRenderer content={block.content} />
    </section>
  )
}