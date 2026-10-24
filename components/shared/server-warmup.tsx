'use client'

import { useEffect } from 'react'
import { prewarmBackend } from '@/lib/api'

export function ServerWarmup() {
  useEffect(() => {
    // Non-blocking prewarm ping
    prewarmBackend()
  }, [])

  return null
}
