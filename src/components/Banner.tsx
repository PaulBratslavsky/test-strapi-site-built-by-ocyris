import { useState } from 'react'
import type { Banner as BannerType } from '@/types/strapi'

interface Props {
  banner: BannerType
}

export default function Banner({ banner }: Props) {
  const [dismissed, setDismissed] = useState(false)

  if (!banner.isVisible || dismissed) return null

  return (
    <div className="relative flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
      <p className="flex flex-wrap items-center justify-center gap-1.5">
        <span>{banner.description}</span>
        {banner.link && (
          <a
            href={banner.link.href}
            target={banner.link.isExternal ? '_blank' : undefined}
            rel={banner.link.isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 decoration-primary-foreground/40 hover:decoration-primary-foreground transition-colors"
          >
            {banner.link.label}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
