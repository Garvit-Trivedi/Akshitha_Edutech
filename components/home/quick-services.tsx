import Link from 'next/link'
import { ArrowRight, Building2, CalendarDays, GraduationCap, UserRound } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: UserRound,
    title: 'Job Seekers',
    description: 'Create a free profile, upload your resume and apply to verified jobs near you.',
    href: '/register?role=jobseeker',
    cta: 'Register now',
  },
  {
    icon: Building2,
    title: 'Employers',
    description: 'Post vacancies, search the candidate database and shortlist talent faster.',
    href: '/employers',
    cta: 'Start hiring',
  },
  {
    icon: GraduationCap,
    title: 'Career Guidance',
    description: 'Book one-on-one sessions with certified counsellors and explore career paths.',
    href: '/career-guidance',
    cta: 'Book a session',
  },
  {
    icon: CalendarDays,
    title: 'Job Fairs',
    description: 'Meet hundreds of recruiters in person or online at upcoming hiring events.',
    href: '/job-fairs',
    cta: 'View events',
  },
]

export function QuickServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <SectionHeading
        eyebrow="Our services"
        title="One platform for every step of your career"
        description="Whether you are looking for your first job, hiring a team, or planning a career change, we have the tools to help."
        align="center"
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title}>
            <Link
              href={service.href}
              className={cn(
                'group flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg',
                service.title === 'Career Guidance' && 'border-[rgba(111,76,190,0.2)] bg-[rgba(242,237,255,0.72)] hover:border-[rgba(111,76,190,0.48)]',
                service.title === 'Job Fairs' && 'border-[rgba(226,145,36,0.25)] bg-[rgba(255,244,224,0.78)] hover:border-[rgba(226,145,36,0.55)]',
                !['Career Guidance', 'Job Fairs'].includes(service.title) && 'border-border bg-card',
              )}
            >
              <span className={cn(
                'flex size-12 items-center justify-center rounded-xl',
                service.title === 'Career Guidance' && 'bg-[rgba(111,76,190,0.14)] text-[rgba(91,62,157,1)]',
                service.title === 'Job Fairs' && 'bg-[rgba(226,145,36,0.16)] text-[rgba(171,99,13,1)]',
                !['Career Guidance', 'Job Fairs'].includes(service.title) && 'bg-secondary text-primary',
              )}>
                <service.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {service.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
