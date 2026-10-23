import Link from 'next/link'
import {
  Banknote,
  BookOpen,
  Factory,
  HeartPulse,
  Hotel,
  Laptop,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { jobCategories } from '@/lib/data'

const categoryIcons: Record<string, LucideIcon> = {
  'Information Technology': Laptop,
  Healthcare: HeartPulse,
  'Banking & Finance': Banknote,
  Manufacturing: Factory,
  Education: BookOpen,
  'Retail & Sales': ShoppingBag,
  Logistics: Truck,
  Hospitality: Hotel,
}

export function JobCategories() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="Browse by sector"
          title="Explore jobs by category"
          description="Discover opportunities across India's fastest-growing industries."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {jobCategories.map((category) => {
            const Icon = categoryIcons[category.name] ?? Laptop
            return (
              <li key={category.name}>
                <Link
                  href={`/jobs?category=${encodeURIComponent(category.slug)}`}
                  className="flex h-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{category.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {category.count.toLocaleString('en-IN')} jobs
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
