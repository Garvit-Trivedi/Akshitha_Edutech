export default function JobDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-28 rounded bg-muted/80" />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main Content Skeleton */}
        <div className="flex flex-col gap-8">
          <header className="rounded-xl border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="size-16 rounded-xl bg-muted/80" />
              <div className="flex-1 space-y-2">
                <div className="h-7 w-2/3 rounded bg-muted/80" />
                <div className="h-4 w-1/3 rounded bg-muted/60" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t pt-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 rounded bg-muted/60" />
                  <div className="h-4 w-24 rounded bg-muted/80" />
                </div>
              ))}
            </div>
          </header>

          <section className="rounded-xl border bg-card p-6 space-y-4">
            <div className="h-5 w-32 rounded bg-muted/80" />
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-muted/60" />
              <div className="h-3.5 w-11/12 rounded bg-muted/60" />
              <div className="h-3.5 w-4/5 rounded bg-muted/60" />
            </div>

            <div className="h-5 w-44 rounded bg-muted/80 pt-4" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded bg-muted/60" />
              <div className="h-3 w-2/3 rounded bg-muted/60" />
              <div className="h-3 w-4/5 rounded bg-muted/60" />
            </div>
          </section>
        </div>

        {/* Sidebar Apply Form Skeleton */}
        <aside className="rounded-xl border bg-card p-6 space-y-4">
          <div className="h-6 w-36 rounded bg-muted/80" />
          <div className="h-4 w-48 rounded bg-muted/60" />
          <div className="space-y-3 pt-3">
            <div className="h-10 w-full rounded-lg bg-muted/60" />
            <div className="h-10 w-full rounded-lg bg-muted/60" />
            <div className="h-10 w-full rounded-lg bg-muted/60" />
            <div className="h-24 w-full rounded-lg bg-muted/60" />
            <div className="h-11 w-full rounded-lg bg-primary/20" />
          </div>
        </aside>
      </div>
    </div>
  )
}
