import { getStrapiMediaUrl } from '@/lib/strapi'

interface StrapiImageProps {
  url: string
  alternativeText?: string | null
  className?: string
}

export default function StrapiImage({ url, alternativeText, className }: StrapiImageProps) {
  const src = getStrapiMediaUrl(url)
  return (
    <img
      src={src}
      alt={alternativeText ?? ''}
      className={className}
    />
  )
}
