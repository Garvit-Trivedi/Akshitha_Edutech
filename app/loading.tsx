export default function RootLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-32 w-full rounded-2xl bg-muted/60" />

      {/* Grid Content Skeleton */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-muted/80" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-muted/80" />
                <div className="h-3 w-1/2 rounded bg-muted/60" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-muted/60" />
              <div className="h-3 w-4/5 rounded bg-muted/60" />
            </div>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40">
              <div className="h-3 w-20 rounded bg-muted/60" />
              <div className="h-8 w-24 rounded-lg bg-muted/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
