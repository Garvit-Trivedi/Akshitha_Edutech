import { MapPin, Search } from 'lucide-react'
import { locations } from '@/lib/data'

type JobSearchBarProps = {
  defaultQuery?: string
  defaultLocation?: string
}

/*
  A plain GET form that submits to /jobs?q=...&location=...
  Works without JavaScript and is easy to extend with more fields.
*/
export function JobSearchBar({ defaultQuery = '', defaultLocation = '' }: JobSearchBarProps) {
  return (
    <form
      action="/jobs"
      method="get"
      role="search"
      className="flex flex-col gap-2 rounded-xl bg-card p-2 shadow-lg sm:flex-row sm:items-center"
    >
      <label className="flex flex-1 items-center gap-2 rounded-lg px-3">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Job title, skill or company</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Job title, skill or company"
          className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>
      <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
      <label className="flex items-center gap-2 rounded-lg px-3 sm:w-52">
        <MapPin className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Location</span>
        <select
          name="location"
          defaultValue={defaultLocation}
          className="h-11 w-full bg-transparent text-sm text-foreground outline-none"
        >
          <option value="">All locations</option>
          {locations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="h-11 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        Search Jobs
      </button>
    </form>
  )
}
