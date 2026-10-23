import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JobFairCard } from '@/components/job-fairs/job-fair-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { buttonVariants } from '@/components/ui/button'
import { jobFairs } from '@/lib/data'

export function UpcomingJobFairs() {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="Events"
            title="Upcoming job fairs"
            description="Meet recruiters face to face, attend on-the-spot interviews and walk out with an offer."
          />
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/job-fair.png"
              alt="Job seekers speaking with recruiters at a job fair"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-3">
          <ul className="flex flex-col gap-4">
            {jobFairs.slice(0, 3).map((fair) => (
              <li key={fair.id}>
                <JobFairCard fair={fair} />
              </li>
            ))}
          </ul>
          <Link href="/job-fairs" className={buttonVariants({ size: 'lg', className: 'self-start px-4' })}>
            See all job fairs
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
