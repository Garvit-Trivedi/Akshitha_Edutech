import Link from 'next/link'
import { CompanyInitials } from '@/components/jobs/job-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { employers } from '@/lib/data'

export function TopEmployers() {
  const marqueeEmployers = [...employers, ...employers]

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-12 pt-0 lg:px-6">
      <div className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-64 rounded-full bg-accent/10 blur-3xl" />
      <SectionHeading
        eyebrow="Trusted by employers"
        title="Top companies hiring now"
        description="Verified organisations actively recruiting through Akshitha Edutech."
        align="center"
      />
      <div className="group relative mt-6 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/[0.04] via-card to-accent/[0.06] py-5 shadow-[0_16px_45px_-28px_oklch(0.29_0.11_250/0.45)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent" />
        <ul className="employer-marquee flex w-max items-stretch gap-4 px-4 group-hover:[animation-play-state:paused]">
          {marqueeEmployers.map((employer, index) => (
            <li key={`${employer.name}-${index}`} className="w-64 shrink-0">
              <Link
                href={`/jobs?q=${encodeURIComponent(employer.name)}`}
                className="flex h-full items-center gap-3 rounded-2xl border border-border/70 bg-background/90 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CompanyInitials name={employer.name} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{employer.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{employer.industry}</span>
                  <span className="mt-1 block text-xs font-medium text-primary">{employer.openings} open roles</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
