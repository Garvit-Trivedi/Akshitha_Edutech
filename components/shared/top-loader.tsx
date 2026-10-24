'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function TopNavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  // Complete progress on route change finish
  useEffect(() => {
    if (visible) {
      setProgress(100)
      const timer = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  // Intercept link clicks to start loading bar immediately
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      const isInternal = href && href.startsWith('/') && !href.startsWith('//') && target.target !== '_blank'
      const isModifierKey = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey

      if (isInternal && !isModifierKey) {
        // Only trigger if destination is different from current page
        const currentUrl = window.location.pathname + window.location.search
        if (href !== currentUrl) {
          setVisible(true)
          setProgress(25)

          const step1 = setTimeout(() => setProgress((p) => (p === 25 ? 55 : p)), 180)
          const step2 = setTimeout(() => setProgress((p) => (p === 55 ? 80 : p)), 450)
          const step3 = setTimeout(() => setProgress((p) => (p === 80 ? 92 : p)), 900)

          return () => {
            clearTimeout(step1)
            clearTimeout(step2)
            clearTimeout(step3)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true })
  }, [])

  if (!visible && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_12px_rgba(31,111,116,0.8)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  )
}
