export interface StrapiImage {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
}

export interface StrapiLink {
  id: number
  href: string
  label: string
  isExternal: boolean
  isButtonLink: boolean
  type: "PRIMARY" | "SECONDARY" | null
}

export interface HeroBlock {
  __component: "blocks.hero"
  id: number
  heading: string
  text: string
  links: StrapiLink[]
  image: StrapiImage
}

export interface SectionHeadingBlock {
  __component: "blocks.section-heading"
  id: number
  subHeading: string
  heading: string
  anchorLink: string | null
}

export interface CardItem {
  id: number
  heading: string
  text: string
}

export interface CardGridBlock {
  __component: "blocks.card-grid"
  id: number
  cards: CardItem[]
}

export interface ContentWithImageBlock {
  __component: "blocks.content-with-image"
  id: number
  reversed: boolean
  heading: string
  content: string
  link: StrapiLink | null
  image: StrapiImage
}

export interface MarkdownBlock {
  __component: "blocks.markdown"
  id: number
  content: string
}

export interface PersonCardBlock {
  __component: "blocks.person-card"
  id: number
  text: string
  personName: string
  personJob: string
  image: StrapiImage
}

export interface FaqItem {
  id: number
  heading: string
  text: string
}

export interface FaqsBlock {
  __component: "blocks.faqs"
  id: number
  faq: FaqItem[]
}

export interface FeaturedArticlesBlock {
  __component: "blocks.featured-articles"
  id: number
  articles: Article[]
}

export interface NewsletterBlock {
  __component: "blocks.newsletter"
  id: number
  heading: string
  text: string
  placeholder: string
  label: string
  formId: string | null
}

export type Block =
  | HeroBlock
  | SectionHeadingBlock
  | CardGridBlock
  | ContentWithImageBlock
  | MarkdownBlock
  | PersonCardBlock
  | FaqsBlock
  | FeaturedArticlesBlock
  | NewsletterBlock

export interface LandingPage {
  id: number
  documentId: string
  title: string
  description: string
  blocks: Block[]
}

export interface StrapiPage {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  blocks: Block[]
}

export interface Banner {
  id: number
  isVisible: boolean
  description: string
  link: StrapiLink
}

export interface HeaderLogo {
  id: number
  label: string
  href: string
  isExternal: boolean
  image: StrapiImage
}

export interface StrapiHeader {
  id: number
  logo: HeaderLogo
  navItems: StrapiLink[]
  cta: StrapiLink
}

export interface FooterSocialLink {
  id: number
  label: string
  href: string
  isExternal: boolean
  image: StrapiImage
}

export interface StrapiFooter {
  id: number
  text: string
  logo: HeaderLogo
  navItems: StrapiLink[]
  socialLinks: FooterSocialLink[]
}

export interface Global {
  id: number
  documentId: string
  banner: Banner
  header: StrapiHeader
  footer: StrapiFooter
}

export interface Author {
  id: number
  documentId: string
  fullName: string
  bio: string
  image?: StrapiImage
}

export interface ContentTag {
  id: number
  documentId: string
  title: string
  description: string
}

export interface Article {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  featuredImage: StrapiImage
  author: Author
  contentTags?: ContentTag[]
  blocks?: Block[]
  relatedArticles?: Article[]
}

export interface StrapiPagination {
  start: number
  limit: number
  total: number
}

export interface ArticlesResponse {
  data: Article[]
  meta: {
    pagination: StrapiPagination
  }
}