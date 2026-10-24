'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, CalendarDays, CheckCircle2, MapPin, Ticket, Users } from 'lucide-react'
import { formatDate, type jobFairs } from '@/lib/data'
import { useAuth } from '@/components/auth/auth-context'
import { api, ApiError } from '@/lib/api'

type JobFair = (typeof jobFairs)[number]

export function JobFairCard({ fair }: { fair: JobFair }) {
  const { user } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const date = new Date(fair.date)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const phone = String(formData.get('phone') || '')

    if (!name || !email || !phone) {
      setError('Please fill in all registration fields.')
      return
    }

    setLoading(true)
    try {
      const res = await api.jobFairs.register(fair.id, { name, email, phone })
      setTicketId(res.data.registration.ticketId)
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          setError('Please sign in to register for an entry pass.')
        } else if (err.statusCode === 409) {
          setError('You are already registered for this hiring fair.')
        } else {
          setError(err.message)
        }
      } else {
        setError('Registration request failed. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
      <div className="flex gap-4">
        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary py-3 text-primary-foreground">
          <span className="text-xs font-medium uppercase">
            {date.toLocaleDateString('en-IN', { month: 'short' })}
          </span>
          <span className="font-heading text-2xl font-bold leading-none">{date.getDate()}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-foreground">{fair.title}</h3>
            <span
              className={
                fair.mode === 'Virtual'
                  ? 'rounded-full bg-accent/25 px-2 py-0.5 text-xs font-medium text-accent-foreground'
                  : 'rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground'
              }
            >
              {fair.mode}
            </span>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
              <time dateTime={fair.date}>{formatDate(fair.date)}</time>
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {fair.venue}, {fair.city}
            </li>
            <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <Building2 className="size-4 shrink-0" aria-hidden="true" />
                {fair.employers} employers
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4 shrink-0" aria-hidden="true" />
                {fair.vacancies.toLocaleString('en-IN')} vacancies
              </span>
            </li>
          </ul>

          <div className="mt-4 flex items-center justify-between border-t pt-3">
            {ticketId ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="size-4" />
                <span>Pass Issued: {ticketId}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowRegister((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Ticket className="size-4" />
                {showRegister ? 'Close registration form' : 'Register for Free Entry Pass'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showRegister && !ticketId && (
        <div className="mt-2 rounded-lg border bg-muted/40 p-4">
          <h4 className="text-sm font-semibold text-foreground">Attendee Event Registration</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Generate your official digital entry ticket for this hiring drive.
          </p>

          {error && (
            <div className="mt-2 rounded border border-destructive/20 bg-destructive/10 p-2 text-xs text-destructive">
              {error}
              {error.includes('sign in') && (
                <Link href="/login" className="ml-1 font-semibold underline">
                  Sign in here
                </Link>
              )}
            </div>
          )}

          {!user && (
            <div className="mt-2 text-xs text-muted-foreground">
              Please <Link href="/login" className="font-medium text-primary underline">log in</Link> first to register for this event.
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-foreground">Your Name</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={user?.name || ''}
                className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs text-foreground focus:outline-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Email</label>
              <input
                type="email"
                name="email"
                required
                defaultValue={user?.email || ''}
                className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs text-foreground focus:outline-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Mobile</label>
              <input
                type="tel"
                name="phone"
                required
                defaultValue={user?.phone || ''}
                className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs text-foreground focus:outline-primary"
              />
            </div>
            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="size-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Issuing Ticket...
                  </span>
                ) : (
                  'Confirm & Claim Free Entry Pass'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  )
}
