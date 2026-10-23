import type { Metadata } from 'next'
import { BadgeCheck, BarChart3, FileText, Search, ShieldCheck, Users } from 'lucide-react'
import { PostJobForm } from '@/components/employers/post-job-form'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { TopEmployers } from '@/components/home/top-employers'

export const metadata: Metadata = {
  title: 'For Employers',
  description: 'Post jobs for free, search verified candidates and run hiring drives with Akshitha Edutech Company.',
}

const benefits = [
  { icon: FileText, title: 'Free job postings', description: 'Publish unlimited vacancies at no cost and reach candidates across India.' },
  { icon: Search, title: 'Candidate search', description: 'Filter lakhs of profiles by skills, education, experience and location.' },
  { icon: ShieldCheck, title: 'Verified profiles', description: 'Mobile and email verified job seekers reduce no-shows and fake applications.' },
  { icon: Users, title: 'Hiring drives', description: 'Host walk-ins and job fairs, online or in person, with our events team.' },
  { icon: BarChart3, title: 'Hiring analytics', description: 'Track views, applications and shortlist rates for every job posting.' },
  { icon: BadgeCheck, title: 'Trusted badge', description: 'Verified employers get a trust badge that improves application rates.' },
]

export default function EmployersPage() {
  return (
    <>
      <PageHeader
        title="Hire the right talent, faster"
        description="Everything you need to source, screen and hire candidates — from a single posting to large-scale recruitment drives."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow="Why hire with us" title="Built for employers of every size" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="rounded-xl border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <b.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="post-job" className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
          <SectionHeading
            eyebrow="Get started"
            title="Post a job in minutes"
            description="Fill in the basic details and our team will review and publish your vacancy within 24 hours."
          />
          <PostJobForm />
        </div>
      </section>

      <TopEmployers />
    </>
  )
}
