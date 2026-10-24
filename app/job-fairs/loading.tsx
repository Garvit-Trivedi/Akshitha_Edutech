export default function JobFairsLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header Skeleton */}
      <section className="border-b bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="h-8 w-64 rounded bg-muted/80 sm:w-80" />
          <div className="mt-2 h-4 w-full max-w-lg rounded bg-muted/60" />
        </div>
      </section>

      {/* Fair Cards List */}
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 rounded-xl border bg-card p-5">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-muted/80 py-3" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1/2 rounded bg-muted/80" />
                <div className="h-4 w-16 rounded-full bg-secondary/80" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3.5 w-1/3 rounded bg-muted/60" />
                <div className="h-3.5 w-1/2 rounded bg-muted/60" />
                <div className="h-3.5 w-2/5 rounded bg-muted/60" />
              </div>
              <div className="border-t pt-3">
                <div className="h-4 w-36 rounded bg-primary/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
