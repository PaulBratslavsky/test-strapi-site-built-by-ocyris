import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/cn'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        'text-muted-foreground hover:text-foreground hover:bg-accent',
        className
      )}
      aria-label={`Switch to ${theme === 'clean' ? 'neobrutalism' : 'clean'} theme`}
      title={`Switch to ${theme === 'clean' ? 'neobrutalism' : 'clean'} theme`}
    >
      {theme === 'clean' ? (
        /* Lightning bolt icon for switching to brutal */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
      ) : (
        /* Sparkle icon for switching to clean */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM4.343 4.343a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.06zM13.536 13.536a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM4.343 15.657a.75.75 0 010-1.06l1.061-1.061a.75.75 0 111.06 1.06l-1.06 1.061a.75.75 0 01-1.061 0zM13.536 6.464a.75.75 0 010-1.06l1.061-1.061a.75.75 0 111.06 1.06l-1.06 1.061a.75.75 0 01-1.061 0z" />
          <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      )}
      <span className="hidden sm:inline">{theme === 'clean' ? 'Brutal' : 'Clean'}</span>
    </button>
  )
}
