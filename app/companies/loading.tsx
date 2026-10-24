export default function CompaniesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-4 w-28 rounded bg-primary/20" />
      <div className="mt-3 h-8 w-72 rounded bg-muted/80" />
      <div className="mt-2 h-4 w-full max-w-xl rounded bg-muted/60" />

      {/* Search and filters bar */}
      <div className="mt-8 flex h-12 max-w-md rounded-xl border bg-card p-2" />

      {/* Company Cards Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-muted/80" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-muted/80" />
                <div className="h-3 w-1/2 rounded bg-muted/60" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-muted/60" />
              <div className="h-3 w-4/5 rounded bg-muted/60" />
            </div>
            <div className="mt-auto flex items-center justify-between border-t pt-4">
              <div className="h-3 w-24 rounded bg-muted/60" />
              <div className="h-8 w-20 rounded-md bg-secondary/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
