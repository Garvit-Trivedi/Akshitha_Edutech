import Link from 'next/link'
import { Briefcase, Clock, IndianRupee, MapPin } from 'lucide-react'
import type { Job } from '@/lib/data'

export function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary font-heading text-sm font-bold text-secondary-foreground"
    >
      {initials}
    </span>
  )
}

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <CompanyInitials name={job.company} />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-semibold leading-snug text-foreground">
            <Link href={`/jobs/${job.id}`} className="after:absolute after:inset-0 group-hover:text-primary">
              {job.title}
            </Link>
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{job.company}</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {job.type}
        </span>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{job.location}</span>
        </li>
        <li className="flex items-center gap-1.5">
          <Briefcase className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{job.experience}</span>
        </li>
        <li className="col-span-2 flex items-center gap-1.5">
          <IndianRupee className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{job.salary.replace('₹', '')}</span>
        </li>
      </ul>

      <ul className="mt-4 mb-4 flex flex-wrap gap-1.5" aria-label="Skills">
        {job.skills.map((skill) => (
          <li key={skill} className="rounded-md border px-2 py-0.5 text-xs text-foreground/80">
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden="true" />
          {job.postedDaysAgo === 1 ? 'Posted 1 day ago' : `Posted ${job.postedDaysAgo} days ago`}
        </span>
        <span className="font-medium text-primary">
          {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
        </span>
      </div>
    </article>
  )
}
