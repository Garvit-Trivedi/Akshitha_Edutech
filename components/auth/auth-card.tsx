export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  )
}
