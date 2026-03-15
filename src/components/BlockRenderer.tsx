import type { Block } from '@/types/strapi'
import HeroSection from '@/components/HeroSection'
import SectionHeading from '@/components/SectionHeading'
import CardGrid from '@/components/CardGrid'
import ContentWithImage from '@/components/ContentWithImage'
import MarkdownSection from '@/components/MarkdownSection'
import PersonCard from '@/components/PersonCard'
import Faqs from '@/components/Faqs'
import FeaturedArticles from '@/components/FeaturedArticles'
import Newsletter from '@/components/Newsletter'

interface Props {
  blocks: Block[]
}

export default function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero':
            return <HeroSection key={block.id} hero={block} />
          case 'blocks.section-heading':
            return <SectionHeading key={block.id} block={block} />
          case 'blocks.card-grid':
            return <CardGrid key={block.id} block={block} />
          case 'blocks.content-with-image':
            return <ContentWithImage key={block.id} block={block} />
          case 'blocks.markdown':
            return <MarkdownSection key={block.id} block={block} />
          case 'blocks.person-card':
            return <PersonCard key={block.id} block={block} />
          case 'blocks.faqs':
            return <Faqs key={block.id} block={block} />
          case 'blocks.featured-articles':
            return <FeaturedArticles key={block.id} block={block} />
          case 'blocks.newsletter':
            return <Newsletter key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}