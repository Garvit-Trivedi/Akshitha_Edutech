import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Briefcase, Clock, IndianRupee, Layers, MapPin, Users } from 'lucide-react'
import { ApplyForm } from '@/components/jobs/apply-form'
import { CompanyInitials, JobCard } from '@/components/jobs/job-card'
import { getJobById, jobs } from '@/lib/data'

type Params = Promise<{ id: string }>

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }))
}

import { api } from '@/lib/api'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  let job = getJobById(id)
  try {
    const res = await api.jobs.get(id)
    if (res?.data?.job) job = res.data.job
  } catch {
    // fallback
  }
  if (!job) return { title: 'Job not found' }
  return { title: `${job.title} at ${job.company}`, description: job.description }
}

export default async function JobDetailPage({ params }: { params: Params }) {
  const { id } = await params
  let job = getJobById(id)
  let relatedJobs = jobs.filter((j) => job && j.category === job.category && j.id !== job.id).slice(0, 2)

  try {
    const res = await api.jobs.get(id)
    if (res?.data?.job) {
      job = {
        ...res.data.job,
        id: res.data.job.slug || res.data.job.id || res.data.job._id,
      }
      if (res.data.related && res.data.related.length > 0) {
        relatedJobs = res.data.related.map((r: any) => ({
          ...r,
          id: r.slug || r.id || r._id,
        }))
      }
    }
  } catch {
    // fallback
  }

  if (!job) notFound()

  const related = relatedJobs

  const facts = [
    { icon: MapPin, label: 'Location', value: job.location },
    { icon: Briefcase, label: 'Experience', value: job.experience },
    { icon: IndianRupee, label: 'Salary', value: job.salary },
    { icon: Layers, label: 'Job type', value: job.type },
    { icon: Users, label: 'Openings', value: String(job.openings) },
    { icon: Clock, label: 'Posted', value: `${job.postedDaysAgo} day${job.postedDaysAgo === 1 ? '' : 's'} ago` },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to all jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <article className="flex flex-col gap-8">
          <header className="rounded-xl border bg-card p-6">
            <div className="flex items-start gap-4">
              <CompanyInitials name={job.company} />
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">{job.title}</h1>
                <p className="mt-1 text-muted-foreground">
                  {job.company} · {job.category}
                </p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-2">
                  <fact.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                    <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </header>

          <section className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">About the role</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{job.description}</p>

            <h3 className="mt-6 font-semibold text-foreground">Key responsibilities</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-foreground/85">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">Requirements</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-foreground/85">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">Skills</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <li key={skill} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground">Similar jobs</h2>
              <ul className="mt-4 grid gap-5 md:grid-cols-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <JobCard job={r} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ApplyForm jobId={job.id} jobTitle={job.title} company={job.company} />
        </aside>
      </div>
    </div>
  )
}
