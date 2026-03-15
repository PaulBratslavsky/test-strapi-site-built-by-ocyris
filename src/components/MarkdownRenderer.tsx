import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 mt-10 text-3xl font-bold tracking-tight first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 text-xl font-semibold">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-2 mt-6 text-lg font-semibold">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-5 leading-7 text-muted-foreground">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 ml-6 list-disc space-y-2 text-muted-foreground marker:text-muted-foreground/40">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 ml-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-7">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-5 border-l-4 border-primary/30 bg-muted/50 py-3 pl-6 pr-4 text-muted-foreground italic rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className="block mb-5 overflow-x-auto rounded-lg bg-slate-900 text-slate-50 p-4 text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-5 overflow-x-auto rounded-lg bg-slate-900 text-slate-50 p-5 text-sm">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-10 border-border" />,
          table: ({ children }) => (
            <div className="mb-5 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-muted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-4 py-3">{children}</td>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt || ''} className="mb-5 rounded-lg shadow-sm" />
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
