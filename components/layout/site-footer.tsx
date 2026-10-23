import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { footerNav, siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          <ul className="mt-6 flex flex-col gap-2.5 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.contact.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.contact.hours}
            </li>
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row lg:px-6">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Privacy Policy · Terms of Use · Accessibility Statement</p>
        </div>
      </div>
    </footer>
  )
}
