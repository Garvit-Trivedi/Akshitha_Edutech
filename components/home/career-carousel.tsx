'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  { title: 'Learn skills that open doors', description: 'Practical training led by experienced teachers and mentors.', image: '/images/career-classroom.png', href: '/courses' },
  { title: 'Build your next skill', description: 'Career-ready courses designed for India’s changing workplace.', image: '/images/skills-training.png', href: '/courses' },
  { title: 'Find verified opportunities', description: 'Discover trusted jobs from employers recruiting now.', image: '/images/verified-jobs.png', href: '/jobs' },
  { title: 'Start with an internship', description: 'Gain experience through structured learning and real projects.', image: '/images/internship-opportunities.png', href: '/internships' },
  { title: 'Meet your next opportunity', description: 'Connect with employers and mentors at career fairs across India.', image: '/images/career-fair.png', href: '/job-fairs' },
]

export function CareerCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  const positionFor = (index: number) => {
    const offset = (index - active + slides.length) % slides.length
    if (offset === 0) return 'left-1/2 z-20 w-[min(68vw,52rem)] -translate-x-1/2 scale-100 opacity-100'
    if (offset === 1) return 'left-[88%] z-10 w-[min(23vw,17rem)] -translate-x-1/2 scale-90 opacity-75'
    if (offset === slides.length - 1) return 'left-[12%] z-10 w-[min(23vw,17rem)] -translate-x-1/2 scale-90 opacity-75'
    return 'left-1/2 z-0 w-[min(20vw,14rem)] -translate-x-1/2 scale-75 opacity-0'
  }

  return (
    <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
        <div className="relative flex aspect-[16/7] min-h-[260px] items-center overflow-hidden rounded-[1.5rem] bg-brand-dark/10">
          {slides.map((slide, index) => (
            <Link key={slide.title} href={slide.href} aria-label={slide.title} className={`absolute top-1/2 h-[82%] -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl transition-all duration-700 ease-out ${positionFor(index)}`}>
              <Image src={slide.image} alt={slide.title} fill sizes="(min-width: 1024px) 52rem, 68vw" className="object-cover" priority={index === 0} />
              <div className={`absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent ${index === active ? 'opacity-100' : 'opacity-70'}`} />
              <div className={`absolute inset-x-0 bottom-0 p-5 text-white transition-opacity ${index === active ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Akshitha Edutech</p>
                <h2 className="mt-2 text-xl font-extrabold leading-tight md:text-3xl">{slide.title}</h2>
                <p className="mt-2 hidden max-w-md text-sm text-white/85 md:block">{slide.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Carousel slides">
          {slides.map((slide, index) => (
            <button key={slide.title} type="button" aria-label={`Show ${slide.title}`} aria-current={index === active} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-accent' : 'w-2 bg-white/70 hover:bg-white'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
