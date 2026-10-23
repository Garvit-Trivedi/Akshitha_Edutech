import type { Metadata } from 'next'
import { Eye, Handshake, Target } from 'lucide-react'
import { StatsStrip } from '@/components/home/stats-strip'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name}, our mission and the values that guide how we connect talent with opportunity.`,
}

const pillars = [
  {
    icon: Target,
    title: 'Our mission',
    description: 'To make finding meaningful work simple, transparent and free for every job seeker in India.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    description: 'A country where every person can discover, prepare for and secure a job that matches their potential.',
  },
  {
    icon: Handshake,
    title: 'Our promise',
    description: 'Verified employers, honest listings and guidance that puts candidates first — always.',
  },
]

const milestones = [
  { year: '2019', text: 'Akshitha Edutech Company founded in Hyderabad with a team of five.' },
  { year: '2021', text: 'Launched free career counselling with 100 certified counsellors.' },
  { year: '2023', text: 'Crossed 10 lakh registered job seekers and 20,000 employers.' },
  { year: '2025', text: 'Expanded to virtual job fairs reaching candidates in all 28 states.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader title={`About ${siteConfig.name}`} description={siteConfig.description} />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <ul className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-xl border bg-card p-6">
              <p.icon className="size-8 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <StatsStrip />

      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow="Our journey" title="Milestones" />
        <ol className="mt-8 border-l-2 border-primary/20">
          {milestones.map((m) => (
            <li key={m.year} className="relative pb-8 pl-6 last:pb-0">
              <span className="absolute top-1 -left-[7px] size-3 rounded-full bg-primary" aria-hidden="true" />
              <p className="font-heading font-bold text-primary">{m.year}</p>
              <p className="mt-1 text-foreground/85">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
