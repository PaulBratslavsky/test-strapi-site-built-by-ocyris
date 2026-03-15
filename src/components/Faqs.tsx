import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { FaqsBlock } from '@/types/strapi'

interface Props {
  block: FaqsBlock
}

export default function Faqs({ block }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="divide-y divide-border rounded-xl border border-border">
        {block.faq.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-accent/50"
              >
                <span className="text-base font-medium text-foreground">
                  {item.heading}
                </span>
                <svg
                  className={cn(
                    'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                )}
              >
                <p className="px-6 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}