import { createFileRoute } from '@tanstack/react-router'
import { getGlobal, getAboutPage } from '@/lib/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StrapiImage from '@/components/StrapiImage'
import type { Global, StrapiPage } from '@/types/strapi'

export const Route = createFileRoute('/about')({
  loader: async () => {
    const [globalRes, pageRes] = await Promise.all([
      getGlobal(),
      getAboutPage(),
    ])
    return {
      global: globalRes.data,
      page: pageRes.data,
    }
  },
  component: AboutPage,
})

function AboutPage() {
  const { global, page } = Route.useLoaderData() as {
    global: Global
    page: StrapiPage | null
  }

  if (!page) return null

  const personCard = page.blocks?.find(
    (b) => b.__component === 'blocks.person-card'
  ) as any | undefined

  return (
    <div className="flex min-h-screen flex-col">
      <Banner banner={global.banner} />
      <Header header={global.header} />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left column — page title & description */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {page.description}
              </p>
            </div>

            {/* Right column — person card from Strapi blocks */}
            {personCard && (
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                {personCard.image?.url && (
                  <div className="mb-6 flex justify-center">
                    <div className="overflow-hidden rounded-full ring-4 ring-primary/10">
                      <StrapiImage
                        url={personCard.image.url}
                        alternativeText={personCard.image.alternativeText}
                        className="h-32 w-32 object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">
                    {personCard.personName}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {personCard.personJob}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {personCard.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Render section-heading blocks */}
        {page.blocks
          ?.filter((b) => b.__component === 'blocks.section-heading')
          .map((block) => {
            const sh = block as any
            return (
              <section
                key={block.id}
                className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-center"
              >
                {sh.subHeading && (
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {sh.subHeading}
                  </p>
                )}
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {sh.heading}
                </h2>
              </section>
            )
          })}
      </main>

      <Footer footer={global.footer} />
    </div>
  )
}
