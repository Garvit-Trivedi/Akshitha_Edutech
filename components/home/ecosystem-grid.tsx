import Link from 'next/link'
import { ArrowUpRight, Building2, GraduationCap, Layers3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const pillars = [
  { title: 'Companies', description: 'Meet trusted local and international employers building the future.', href: '/companies', icon: Building2, stat: '1,200+ verified partners' },
  { title: 'Institutions', description: 'Find universities, colleges and skills partners for every ambition.', href: '/institutions', icon: GraduationCap, stat: '340+ learning partners' },
  { title: 'Courses', description: 'Choose flexible, job-ready learning designed around real outcomes.', href: '/courses', icon: Layers3, stat: '1,800+ courses' },
]

export function EcosystemGrid() {
  return <section className="bg-secondary/35 py-16 lg:py-20"><div className="mx-auto max-w-7xl px-4 lg:px-6"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">One connected ecosystem</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">More than a job portal</h2><p className="mt-4 text-lg leading-8 text-muted-foreground">Akshitha Edutech brings companies, institutions and learners together so every person can move from possibility to progress.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{pillars.map((pillar) => { const Icon = pillar.icon; return <Link href={pillar.href} key={pillar.title} className="group"><Card className="h-full border-border/70 transition-all group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg"><CardContent className="flex h-full flex-col p-7"><div className="flex items-center justify-between"><div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-6" aria-hidden="true" /></div><ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></div><h3 className="mt-7 text-2xl font-bold">{pillar.title}</h3><p className="mt-3 flex-1 leading-7 text-muted-foreground">{pillar.description}</p><p className="mt-6 border-t pt-4 text-sm font-semibold text-primary">{pillar.stat}</p></CardContent></Card></Link> })}</div></div></section>
}
