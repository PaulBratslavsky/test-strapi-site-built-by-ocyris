import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import StrapiLink from '@/components/StrapiLink'
import ThemeToggle from '@/components/ThemeToggle'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { StrapiHeader } from '@/types/strapi'

interface Props {
  header: StrapiHeader
}

export default function Header({ header }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={header.logo.href as any} className="flex items-center gap-2.5 group">
          {header.logo.image?.url && (
            <img
              src={getStrapiMediaUrl(header.logo.image.url)}
              alt={header.logo.image.alternativeText ?? header.logo.label}
              className="h-8 w-auto"
            />
          )}
          <span className="text-lg font-semibold tracking-tight text-foreground">{header.logo.label}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {header.navItems.map((item) => (
            <StrapiLink key={item.id} {...item} />
          ))}
        </nav>

        {/* Desktop CTA + Theme Toggle */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <StrapiLink {...header.cta} />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {header.navItems.map((item) => (
              <StrapiLink key={item.id} {...item} />
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <StrapiLink {...header.cta} className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
