import { stats } from '@/lib/data'

export function StatsStrip() {
  return (
    <section aria-label="Platform statistics" className="border-b bg-card">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 pt-14 pb-10 md:grid-cols-4 lg:px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:border-l md:first:border-l-0">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 font-heading text-2xl font-extrabold text-primary md:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
