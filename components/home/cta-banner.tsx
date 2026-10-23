import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-6">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary px-6 py-10 text-primary-foreground md:flex-row md:items-center md:px-12">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold md:text-3xl">Hiring? Reach lakhs of verified candidates.</h2>
          <p className="mt-2 text-primary-foreground/80">
            Post your first job for free and start receiving applications within hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/register?role=employer"
            className={buttonVariants({
              size: 'lg',
              className: 'h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90',
            })}
          >
            Post a Job
          </Link>
          <Link
            href="/employers"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'h-11 border-white/40 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white',
            })}
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  )
}
