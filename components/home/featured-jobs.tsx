import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JobCard } from '@/components/jobs/job-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { buttonVariants } from '@/components/ui/button'
import { jobs } from '@/lib/data'

export function FeaturedJobs() {
  const latest = [...jobs].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo).slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <SectionHeading
        eyebrow="Latest openings"
        title="Featured jobs"
        description="Fresh vacancies from verified employers, updated daily."
        action={
          <Link href="/jobs" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'px-4' })}>
            View all jobs
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}
