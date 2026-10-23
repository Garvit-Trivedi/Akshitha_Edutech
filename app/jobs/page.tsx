import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { JobCard } from '@/components/jobs/job-card'
import { JobFilters } from '@/components/jobs/job-filters'
import { JobSearchBar } from '@/components/jobs/job-search-bar'
import { PageHeader } from '@/components/shared/page-header'
import { jobs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find Jobs',
  description: 'Search verified jobs across India by title, skill, company, location, sector and job type.',
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

function asArray(value: string | string[] | undefined) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

import { api } from '@/lib/api'
import type { Job } from '@/lib/data'

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const q = asString(params.q).trim().toLowerCase()
  const location = asString(params.location)
  const category = asString(params.category)
  const types = asArray(params.type)
  const sort = asString(params.sort) || 'latest'

  let results: Job[] = []

  try {
    const res = await api.jobs.list({
      q: q || undefined,
      location: location || undefined,
      category: category || undefined,
      type: types[0] || undefined,
      sort,
      limit: 50,
    })
    if (res?.data && res.data.length > 0) {
      results = res.data.map((j: any) => ({
        id: j.slug || j.id || j._id,
        title: j.title,
        company: j.company,
        location: j.location,
        type: j.type,
        category: j.category,
        experience: j.experience,
        salary: j.salary,
        postedDaysAgo: j.postedDaysAgo || 1,
        openings: j.openings || 1,
        skills: j.skills || [],
        description: j.description,
        responsibilities: j.responsibilities || [],
        requirements: j.requirements || [],
      }))
    }
  } catch {
    // Graceful fallback to static data
  }

  if (results.length === 0) {
    results = jobs
      .filter((job) => {
        const matchesQuery =
          !q ||
          [job.title, job.company, job.category, ...job.skills].some((field) => field.toLowerCase().includes(q))
        const matchesLocation = !location || job.location === location
        const matchesCategory = !category || job.category === category
        const matchesType = types.length === 0 || types.includes(job.type)
        return matchesQuery && matchesLocation && matchesCategory && matchesType
      })
      .sort((a, b) => (sort === 'openings' ? b.openings - a.openings : a.postedDaysAgo - b.postedDaysAgo))
  }

  return (
    <>
      <PageHeader
        title="Find Jobs"
        description="Search thousands of verified vacancies. Use the filters to narrow down by sector, location and job type."
      >
        <JobSearchBar defaultQuery={asString(params.q)} defaultLocation={location} />
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-6">
        <JobFilters q={asString(params.q)} location={location} category={category} types={types} sort={sort} />

        <section aria-labelledby="results-heading">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="results-heading" className="text-lg font-semibold text-foreground">
              {results.length} {results.length === 1 ? 'job' : 'jobs'} found
            </h2>
            {(q || location || category || types.length > 0) && (
              <Link href="/jobs" className="text-sm font-medium text-primary hover:underline">
                Clear all filters
              </Link>
            )}
          </div>

          {results.length > 0 ? (
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {results.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
              <SearchX className="size-10 text-muted-foreground" aria-hidden="true" />
              <p className="mt-4 font-semibold text-foreground">No jobs match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Try different keywords or remove some filters.</p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
