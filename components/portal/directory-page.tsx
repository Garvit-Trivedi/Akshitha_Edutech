'use client'

import Link from 'next/link'
import { ArrowRight, Building2, GraduationCap, MapPin, Search, Users } from 'lucide-react'
import { useMemo, useState, type ChangeEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type DirectoryItem = { name?: string; title?: string; description?: string; location?: string; type?: string; industry?: string; openings?: number; programs?: number; focus?: string; badge?: string; category?: string; level?: string; duration?: string; learners?: string; format?: string; provider?: string; accent?: string }

type Props = { kind: 'companies' | 'institutions' | 'courses'; items: readonly DirectoryItem[] }

const config = {
  companies: { eyebrow: 'Opportunity ecosystem', title: 'Discover companies shaping the future', description: 'Explore verified organizations, international employers and teams hiring for meaningful work.', icon: Building2, search: 'Search companies, industries or locations', cta: 'View open roles', href: '/jobs', stat: '1,200+ verified organizations' },
  institutions: { eyebrow: 'Learning ecosystem', title: 'Find institutions that move you forward', description: 'Compare universities, colleges and skills partners offering trusted pathways to your next chapter.', icon: GraduationCap, search: 'Search institutions, programs or locations', cta: 'Explore courses', href: '/courses', stat: '340+ learning partners' },
  courses: { eyebrow: 'Skills marketplace', title: 'Learn skills that open new doors', description: 'Build confidence with flexible courses from verified institutions and industry-led learning partners.', icon: GraduationCap, search: 'Search courses, skills or providers', cta: 'Find related jobs', href: '/jobs', stat: '1,800+ job-ready courses' },
} as const

const pageTheme = {
  companies: { hero: 'bg-[linear-gradient(135deg,rgba(255,244,214,0.98),rgba(255,231,181,0.94)_48%,rgba(255,251,239,0.98))]', accent: 'text-[rgba(164,94,12,1)]', button: 'bg-[rgba(196,116,20,1)] hover:bg-[rgba(166,91,12,1)]' },
  institutions: { hero: 'bg-[linear-gradient(135deg,rgba(239,235,255,0.98),rgba(218,208,250,0.94)_48%,rgba(250,248,255,0.98))]', accent: 'text-[rgba(91,62,157,1)]', button: 'bg-[rgba(91,62,157,1)] hover:bg-[rgba(70,43,128,1)]' },
  courses: { hero: 'bg-[linear-gradient(135deg,rgba(225,237,255,0.98),rgba(193,218,255,0.94)_48%,rgba(246,250,255,0.98))]', accent: 'text-[rgba(20,80,170,1)]', button: 'bg-[rgba(20,80,170,1)] hover:bg-[rgba(15,61,132,1)]' },
} as const

export function DirectoryPage({ kind, items }: Props) {
  const [query, setQuery] = useState('')
  const page = config[kind]
  const theme = pageTheme[kind]
  const Icon = page.icon
  const filtered = useMemo(() => items.filter((item) => Object.values(item).join(' ').toLowerCase().includes(query.toLowerCase())), [items, query])

  return <main>
    <section className={cn('border-b text-foreground', theme.hero)}>
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
        <div className="max-w-3xl">
          <p className={cn('mb-4 text-sm font-semibold uppercase tracking-[0.2em]', theme.accent)}>{page.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/70">{page.description}</p>
        </div>
        <div className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder={page.search} className="h-14 border-0 bg-background pl-12 text-foreground" aria-label={page.search} /></div>
          <Link href={page.href} className={cn('inline-flex h-14 items-center justify-center gap-2 rounded-md px-6 font-semibold text-white transition-colors', theme.button)}>{page.cta}<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-primary">{page.stat}</p><h2 className="mt-2 text-2xl font-bold">Explore the network</h2></div><p className="text-sm text-muted-foreground">Showing {filtered.length} of {items.length} results</p></div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => <Card key={item.name ?? item.title} className="group flex h-full flex-col border-border/70 shadow-sm transition-shadow hover:shadow-lg"><CardHeader><div className="mb-2 flex items-center justify-between gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></div>{(item.badge || item.format) && <Badge variant="secondary">{item.badge || item.format}</Badge>}</div><CardTitle className="text-xl">{item.name || item.title}</CardTitle><CardDescription>{item.industry || item.type || item.category}{item.provider ? ` · ${item.provider}` : ''}</CardDescription></CardHeader><CardContent className="mt-auto flex flex-col gap-4"><p className="text-sm leading-6 text-muted-foreground">{item.description || item.focus || `${item.level} learning experience designed for practical outcomes.`}</p><div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">{item.location && <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{item.location}</span>}{item.openings && <span className="inline-flex items-center gap-1.5"><Users className="size-4" aria-hidden="true" />{item.openings} open roles</span>}{item.programs && <span>{item.programs} programs</span>}{item.duration && <span>{item.duration} · {item.level}</span>}</div><div className="flex items-center justify-between border-t pt-4 text-sm font-semibold text-primary"><span>{item.learners ? `${item.learners} learners` : item.format || 'Verified profile'}</span><ArrowRight className={cn('size-4 transition-transform group-hover:translate-x-1')} aria-hidden="true" /></div></CardContent></Card>)}</div>{filtered.length === 0 && <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">No matches yet. Try a broader search.</div>}
    </section>
  </main>
}

export default DirectoryPage
