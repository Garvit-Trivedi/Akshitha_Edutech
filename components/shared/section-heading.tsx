import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', action, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
