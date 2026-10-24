'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BriefcaseBusiness, Building2, CalendarDays, Compass, GraduationCap, Landmark, LogOut, Mail, Menu, Phone, Search, ShieldCheck, UserCircle, UsersRound, X } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { buttonVariants } from '@/components/ui/button'
import { mainNav, megaMenus, siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth/auth-context'

export function SiteHeader() {
  const { user, loading: authLoading, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(false)
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 24)
      setScrollingDown(currentScrollY > lastScrollY.current && currentScrollY > 24)
      lastScrollY.current = currentScrollY
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const showMenu = (menuKey: string) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current)
    setActiveMenu(menuKey)
  }
  const hideMenuSoon = () => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current)
    closeMenuTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const socialLinks = [
    { label: 'Facebook', short: 'f', href: 'https://www.facebook.com/' },
    { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', short: '▶', href: 'https://www.youtube.com/' },
  ]
  const navIcons = {
    'Find Jobs': BriefcaseBusiness,
    Companies: Building2,
    Institutions: Landmark,
    Courses: GraduationCap,
    Employers: UsersRound,
    'Career Guidance': Compass,
    'Job Fairs': CalendarDays,
  }

  return (
    <header className="sticky top-0 z-40 bg-transparent py-3 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="hidden items-center justify-between rounded-2xl bg-brand-dark px-5 py-2 text-xs text-white/85 shadow-sm md:flex">
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/about" className="hidden hover:text-white md:block">About</Link>
            <Link href="/contact" className="hidden hover:text-white md:block">Contact</Link>
          </div>
          <div className="ml-auto flex items-center gap-3 lg:gap-5">
            <div className="flex items-center gap-2" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Akshitha Edutech on ${social.label}`} className="flex size-7 items-center justify-center rounded-full border border-white/60 font-semibold transition-colors hover:bg-white hover:text-brand-dark">
                  {social.short}
                </a>
              ))}
            </div>
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-1.5 font-medium hover:text-white">
              <Phone className="size-3.5" aria-hidden="true" />
              Toll-free {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="hidden items-center gap-1.5 hover:text-white xl:flex">
              <Mail className="size-3.5" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className={cn('mt-2 flex items-center justify-between gap-4 rounded-[2rem] border border-white/75 bg-white/[0.78] px-4 shadow-[0_10px_30px_rgba(20,35,75,0.1)] backdrop-blur-xl transition-all lg:px-6', scrollingDown ? 'h-[4.75rem]' : 'h-14 rounded-2xl')}>
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.menuKey && showMenu(item.menuKey)}
                onMouseLeave={() => item.menuKey && hideMenuSoon()}
                onFocus={() => item.menuKey && showMenu(item.menuKey)}
              >
                {item.menuKey ? (
                  <Link
                    href={item.href}
                    aria-expanded={activeMenu === item.menuKey}
                    aria-controls={`${item.menuKey}-menu`}
                    className={cn(
                      cn(
                        'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[rgba(234,229,255,0.8)] hover:text-[rgba(86,54,155,1)]',
                        isActive(item.href) || activeMenu === item.menuKey ? 'font-semibold text-primary' : 'text-foreground/80',
                      ),
                    )}
                  >
                    {(() => {
                      const Icon = navIcons[item.label as keyof typeof navIcons]
                      return Icon ? <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" /> : null
                    })()}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[oklch(0.94_0.12_88)] hover:text-[oklch(0.38_0.12_70)]',
                      isActive(item.href) ? 'text-primary' : 'text-foreground/80',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {activeMenu && (
          <div
            id={`${activeMenu}-menu`}
            onMouseEnter={() => showMenu(activeMenu)}
            onMouseLeave={hideMenuSoon}
            className="absolute left-1/2 top-full hidden w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 rounded-b-3xl border border-border bg-card p-6 shadow-xl lg:block"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {megaMenus[activeMenu as keyof typeof megaMenus].map((group) => (
                <section key={group.title}>
                  <h2 className="mb-3 text-base font-semibold text-foreground">{group.title}</h2>
                  <ul className="space-y-1 border-l-2 border-accent pl-4">
                    {group.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setActiveMenu(null)}
                          className="group/link block rounded-md border border-transparent px-2 py-2 text-sm text-muted-foreground transition-colors hover:border-[oklch(0.72_0.18_300)] hover:bg-[oklch(0.93_0.08_300)] hover:text-[oklch(0.35_0.13_300)] even:hover:border-[oklch(0.78_0.16_82)] even:hover:bg-[oklch(0.94_0.12_88)] even:hover:text-[oklch(0.38_0.12_70)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        )}

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/jobs" aria-label="Search jobs" className="inline-flex size-10 items-center justify-center rounded-full text-foreground/75 transition-colors hover:bg-secondary hover:text-primary">
            <Search className="size-5" aria-hidden="true" />
          </Link>
          {authLoading ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-muted/60" />
          ) : user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <ShieldCheck className="size-3.5" />
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs">
                <UserCircle className="size-4 text-primary" />
                <span className="font-semibold text-foreground max-w-[120px] truncate">{user.name}</span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary capitalize">{user.role}</span>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                title="Log out"
                className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="size-4" />
                <span className="sr-only">Sign out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({
                size: 'lg',
                className: 'bg-accent px-5 text-accent-foreground hover:bg-accent/90',
              })}
            >
              Login / Register
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted',
                    isActive(item.href) && 'bg-secondary text-primary',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              {user ? (
                <div className="flex flex-col gap-2 rounded-lg border bg-card p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{user.name}</span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary capitalize">{user.role}</span>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <ShieldCheck className="size-3.5" />
                      Open Admin Control Center
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-1.5 rounded-md border border-destructive/20 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="size-3.5" />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ size: 'lg', className: 'w-full bg-accent text-accent-foreground hover:bg-accent/90' })}
                >
                  Login / Register
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
