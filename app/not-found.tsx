import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-heading text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you are looking for may have moved or no longer exists.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={buttonVariants({ size: 'lg', className: 'px-4' })}>
          Go home
        </Link>
        <Link href="/jobs" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'px-4' })}>
          Browse jobs
        </Link>
      </div>
    </div>
  )
}
