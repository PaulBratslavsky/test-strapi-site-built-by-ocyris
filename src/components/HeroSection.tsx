import StrapiImage from '@/components/StrapiImage'
import StrapiLink from '@/components/StrapiLink'
import type { HeroBlock } from '@/types/strapi'

interface Props {
  hero: HeroBlock
}

export default function HeroSection({ hero }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              {hero.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground lg:max-w-none">
              {hero.text}
            </p>
            {hero.links.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {hero.links.map((link) => (
                  <StrapiLink key={link.id} {...link} />
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          {hero.image?.url && (
            <div className="flex-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-border">
                <StrapiImage
                  url={hero.image.url}
                  alternativeText={hero.image.alternativeText}
                  className="w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
