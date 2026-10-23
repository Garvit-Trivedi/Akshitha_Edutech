import type { Metadata } from 'next'
import Link from 'next/link'
import { JobFairCard } from '@/components/job-fairs/job-fair-card'
import { PageHeader } from '@/components/shared/page-header'
import { buttonVariants } from '@/components/ui/button'
import { jobFairs } from '@/lib/data'
import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Job Fairs',
  description: 'Find upcoming in-person and virtual job fairs and hiring drives across India.',
}

export default async function JobFairsPage() {
  let fairsList = jobFairs

  try {
    const res = await api.jobFairs.list()
    if (res?.data && res.data.length > 0) {
      fairsList = res.data.map((f: any) => ({
        id: f.slug || f.id || f._id,
        title: f.title,
        date: f.date,
        city: f.city,
        venue: f.venue,
        employers: f.employers || 0,
        vacancies: f.vacancies || 0,
        mode: f.mode || 'In-person',
      }))
    }
  } catch {
    // Graceful fallback to static data
  }

  const totalVacancies = fairsList.reduce((sum, f) => sum + f.vacancies, 0)

  return (
    <>
      <PageHeader
        title="Job Fairs & Hiring Drives"
        description={`${fairsList.length} upcoming events with ${totalVacancies.toLocaleString('en-IN')}+ vacancies. Register once and attend any event.`}
      />
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
        <ul className="flex flex-col gap-4">
          {fairsList.map((fair) => (
            <li key={fair.id}>
              <JobFairCard fair={fair} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border bg-secondary p-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-semibold text-foreground">Want to attend?</h2>
            <p className="text-sm text-muted-foreground">
              Create a free account to receive your entry pass and event reminders.
            </p>
          </div>
          <Link href="/register?role=jobseeker" className={buttonVariants({ size: 'lg', className: 'px-4' })}>
            Register for free
          </Link>
        </div>
      </div>
    </>
  )
}
