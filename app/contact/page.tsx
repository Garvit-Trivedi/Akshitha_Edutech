import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact/contact-form'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { faqs } from '@/lib/data'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Akshitha Edutech Company helpdesk for job seekers and employers.',
}

export default function ContactPage() {
  const { contact } = siteConfig
  const details = [
    { icon: Phone, label: 'Helpline', value: contact.phone, href: `tel:${contact.phone.replace(/\s|-/g, '')}` },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Office', value: contact.address },
    { icon: Clock, label: 'Hours', value: contact.hours },
  ]

  return (
    <>
      <PageHeader title="Contact Us" description="Questions about jobs, hiring or your account? Our helpdesk is here to help." />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Reach us directly</h2>
          <ul className="mt-6 flex flex-col gap-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <d.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="font-medium text-foreground hover:text-primary">
                      {d.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{d.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>

      <section id="faq" className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
          <SectionHeading eyebrow="Help" title="Frequently asked questions" align="center" />
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border bg-card p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {faq.q}
                  <span className="text-xl text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
