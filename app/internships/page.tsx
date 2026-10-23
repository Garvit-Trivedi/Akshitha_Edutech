import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { internships } from '@/lib/portal-data'

export default function InternshipsPage() {
  return (
    <main>
      <section className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Early-career pathways</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Start with an internship that moves you forward</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">Discover practical experiences with employers and teams building the next generation of work across India and the world.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-primary-foreground/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2"><Sparkles className="size-4" aria-hidden="true" />Verified opportunities</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2"><BriefcaseBusiness className="size-4" aria-hidden="true" />Paid and fellowship roles</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-medium text-primary">{internships.length} featured pathways</p><h2 className="mt-2 text-2xl font-bold">Featured internships</h2></div>
          <Link href="/register?role=jobseeker" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Create your profile <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {internships.map((internship) => (
            <Card key={internship.id} className="group transition-shadow hover:shadow-lg">
              <CardHeader><div className="flex items-start justify-between gap-4"><div><Badge variant="secondary">{internship.category}</Badge><CardTitle className="mt-4 text-xl">{internship.title}</CardTitle><p className="mt-2 font-medium text-muted-foreground">{internship.company}</p></div><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><BriefcaseBusiness className="size-5" aria-hidden="true" /></div></div></CardHeader>
              <CardContent><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{internship.location}</span><span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" aria-hidden="true" />{internship.duration}</span></div><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="text-sm font-semibold text-primary">{internship.stipend}</span><Link href={`/register?role=jobseeker&opportunity=${internship.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">View pathway <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export const metadata = { title: 'Internships | Akshitha Edutech', description: 'Discover verified internship pathways with Akshitha Edutech.' }
