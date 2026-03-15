import { createFileRoute } from '@tanstack/react-router'
import { getLandingPage, getGlobal } from '@/lib/strapi'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/BlockRenderer'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [landingPage, global] = await Promise.all([
      getLandingPage(),
      getGlobal(),
    ])
    return { landingPage, global }
  },
  component: HomePage,
})

function HomePage() {
  const { landingPage, global } = Route.useLoaderData()

  return (
    <div className="flex min-h-screen flex-col">
      <Banner banner={global.data.banner} />
      <Header header={global.data.header} />
      <main className="flex-1">
        <BlockRenderer blocks={landingPage.data.blocks} />
      </main>
      <Footer footer={global.data.footer} />
    </div>
  )
}