export default function JobsLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header Skeleton */}
      <section className="border-b bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="h-4 w-28 rounded bg-primary/20" />
          <div className="mt-3 h-8 w-64 rounded-md bg-muted/80 sm:w-80" />
          <div className="mt-2 h-4 w-full max-w-xl rounded bg-muted/60" />

          {/* Search bar placeholder */}
          <div className="mt-6 flex h-14 max-w-4xl rounded-2xl border bg-card p-2 shadow-sm" />
        </div>
      </section>

      {/* Main Grid: Sidebar + Cards */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-6">
        {/* Filters Sidebar Skeleton */}
        <aside className="hidden lg:block space-y-6 rounded-xl border bg-card p-5">
          <div className="h-5 w-24 rounded bg-muted/80" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="size-4 rounded bg-muted/60" />
                <div className="h-3 w-32 rounded bg-muted/60" />
              </div>
            ))}
          </div>
          <div className="h-5 w-28 rounded bg-muted/80 pt-2" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="size-4 rounded bg-muted/60" />
                <div className="h-3 w-28 rounded bg-muted/60" />
              </div>
            ))}
          </div>
        </aside>

        {/* Job Cards Skeleton */}
        <section>
          <div className="flex items-center justify-between pb-4">
            <div className="h-5 w-32 rounded bg-muted/80" />
            <div className="h-4 w-20 rounded bg-muted/60" />
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-4 rounded-xl border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="size-12 shrink-0 rounded-xl bg-muted/80" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted/80" />
                    <div className="h-3 w-1/2 rounded bg-muted/60" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="h-3 w-24 rounded bg-muted/60" />
                  <div className="h-3 w-28 rounded bg-muted/60" />
                  <div className="h-3 w-20 rounded bg-muted/60" />
                  <div className="h-3 w-24 rounded bg-muted/60" />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <div className="h-6 w-16 rounded-md bg-secondary/80" />
                  <div className="h-6 w-20 rounded-md bg-secondary/80" />
                  <div className="h-6 w-14 rounded-md bg-secondary/80" />
                </div>

                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <div className="h-3 w-20 rounded bg-muted/60" />
                  <div className="h-8 w-24 rounded-lg bg-primary/20" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
