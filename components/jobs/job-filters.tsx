import { jobCategories, jobTypes, locations } from '@/lib/data'

type JobFiltersProps = {
  q: string
  location: string
  category: string
  types: string[]
  sort: string
}

const selectClass =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'

/*
  Filters are a GET form, so the URL always reflects the current search
  (shareable, bookmarkable, and works without JavaScript).
*/
export function JobFilters({ q, location, category, types, sort }: JobFiltersProps) {
  return (
    <aside aria-label="Job filters">
      <form action="/jobs" method="get" className="flex flex-col gap-6 rounded-xl border bg-card p-5 lg:sticky lg:top-28">
        <input type="hidden" name="q" value={q} />

        <div className="flex flex-col gap-2">
          <label htmlFor="filter-category" className="text-sm font-semibold text-foreground">
            Sector
          </label>
          <select id="filter-category" name="category" defaultValue={category} className={selectClass}>
            <option value="">All sectors</option>
            {jobCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="filter-location" className="text-sm font-semibold text-foreground">
            Location
          </label>
          <select id="filter-location" name="location" defaultValue={location} className={selectClass}>
            <option value="">All locations</option>
            {locations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-semibold text-foreground">Job type</legend>
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center gap-2.5 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="type"
                value={type}
                defaultChecked={types.includes(type)}
                className="size-4 rounded accent-[var(--primary)]"
              />
              {type}
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor="filter-sort" className="text-sm font-semibold text-foreground">
            Sort by
          </label>
          <select id="filter-sort" name="sort" defaultValue={sort} className={selectClass}>
            <option value="latest">Most recent</option>
            <option value="openings">Most openings</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-10 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply filters
        </button>
      </form>
    </aside>
  )
}
