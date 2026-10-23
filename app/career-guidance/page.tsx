import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { CounsellingForm } from '@/components/career/counselling-form'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { careerResources } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Career Guidance',
  description: 'Book free career counselling sessions and read guides on resumes, interviews and in-demand skills.',
}

export default function CareerGuidancePage() {
  return (
    <>
      <PageHeader
        title="Career Guidance"
        description="Expert counselling, practical guides and learning resources to help you make confident career decisions."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/counselling.png"
            alt="A career counsellor guiding a student"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Free counselling"
            title="Talk to a certified career counsellor"
            description="Get personalised advice on choosing a course, switching careers, preparing for interviews or building new skills. Sessions are free, confidential and available in English and Hindi."
          />
          <ul className="mt-6 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
            {['45-minute one-on-one session', 'Video or phone call', 'Resume review included', 'Follow-up action plan'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading eyebrow="Resources" title="Career guides & articles" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerResources.map((r) => (
              <li key={r.title}>
                <article className="flex h-full flex-col rounded-xl border bg-card p-6">
                  <span className="self-start rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {r.category}
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.excerpt}</p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {r.readTime}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="book" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
        <SectionHeading
          eyebrow="Book a session"
          title="Schedule your free counselling"
          description="Choose a topic and preferred date. A counsellor will confirm your slot by email and SMS."
        />
        <CounsellingForm />
      </section>
    </>
  )
}
