import Link from 'next/link'
import { CareerCarousel } from '@/components/home/career-carousel'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(238,233,255,1)_0%,rgba(239,245,255,1)_48%,rgba(255,241,218,1)_100%)] pb-14 pt-10 text-foreground md:pb-20 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
        <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-foreground/80 md:text-xl">
          Your next career move starts here. Search jobs from verified employers, get free career counselling, and join job fairs across India — all in one place.
        </p>
        <div className="mt-5 flex justify-center gap-3 text-sm font-semibold">
          <Link href="/jobs" className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">Find jobs</Link>
          <Link href="/career-guidance" className="rounded-full border border-primary/25 bg-white/60 px-5 py-2.5 text-primary transition-colors hover:bg-white">Get guidance</Link>
        </div>
      </div>
      <CareerCarousel />
    </section>
  )
}
