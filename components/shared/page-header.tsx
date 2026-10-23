import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumb?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, breadcrumb, children }: PageHeaderProps) {
  return (
    <section className="border-b bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-foreground">
              {breadcrumb ?? title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
