import { SectionHeading } from '@/components/shared/section-heading'

const steps = [
  {
    title: 'Create your profile',
    description: 'Register free with your mobile number or email and add your education, skills and experience.',
  },
  {
    title: 'Search & apply',
    description: 'Filter jobs by location, sector and salary. Apply in one click with your saved profile.',
  },
  {
    title: 'Get guidance',
    description: 'Prepare for interviews with counsellors, resume reviews and free learning resources.',
  },
  {
    title: 'Get hired',
    description: 'Track your applications, attend interviews and receive offers directly from employers.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From registration to your first day at work"
          align="center"
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
