import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/cn'
import type { StrapiLink as StrapiLinkType } from '@/types/strapi'

type Props = StrapiLinkType & { className?: string }

export default function StrapiLink({ href, label, isExternal, isButtonLink, type, className }: Props) {
  const base = isButtonLink
    ? type === 'PRIMARY'
      ? 'inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors'
      : 'inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors'
    : 'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, className)}
      >
        {label}
      </a>
    )
  }

  return (
    <Link to={href as any} className={cn(base, className)}>
      {label}
    </Link>
  )
}
