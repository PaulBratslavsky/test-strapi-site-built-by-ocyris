import { Link } from '@tanstack/react-router'
import StrapiLink from '@/components/StrapiLink'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { StrapiFooter } from '@/types/strapi'

interface Props {
  footer: StrapiFooter
}

export default function Footer({ footer }: Props) {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link to={footer.logo.href as any} className="flex items-center gap-2.5 group">
            {footer.logo.image?.url && (
              <img
                src={getStrapiMediaUrl(footer.logo.image.url)}
                alt={footer.logo.image.alternativeText ?? footer.logo.label}
                className="h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            )}
            <span className="text-lg font-semibold text-foreground">{footer.logo.label}</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {footer.navItems.map((item) => (
              <StrapiLink key={item.id} {...item} />
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {footer.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <img
                  src={getStrapiMediaUrl(social.image.url)}
                  alt={social.label}
                  className="h-5 w-5 opacity-60 hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {footer.text}
          </p>
        </div>
      </div>
    </footer>
  )
}
