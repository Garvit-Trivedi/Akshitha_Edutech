import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <SectionHeading eyebrow="Success stories" title="What our users say" align="center" />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name}>
            <figure className="flex h-full flex-col rounded-xl border bg-card p-6">
              <Quote className="size-8 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/90">{`“${t.quote}”`}</blockquote>
              <figcaption className="mt-6 border-t pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
