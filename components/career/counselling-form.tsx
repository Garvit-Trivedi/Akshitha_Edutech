'use client'

import { useState } from 'react'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { validate, type FieldErrors } from '@/lib/validation'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/components/auth/auth-context'

const topics = ['Choosing a course', 'Career switch', 'Interview preparation', 'Resume review', 'Skill development']
const slots = ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM']

export function CounsellingForm() {
  const { user } = useAuth()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const today = new Date().toISOString().split('T')[0]

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const result = validate(data, {
      name: { required: true, label: 'Full name' },
      email: { required: true, email: true, label: 'Email' },
      phone: { required: true, phone: true, label: 'Mobile number' },
      topic: { required: true, label: 'Topic' },
      date: { required: true, label: 'Preferred date' },
      slot: { required: true, label: 'Time slot' },
    })

    setErrors(result)
    if (Object.keys(result).length > 0) return

    setLoading(true)
    try {
      await api.counselling.submit({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        topic: String(data.get('topic') || ''),
        date: String(data.get('date') || ''),
        slot: String(data.get('slot') || ''),
        notes: String(data.get('notes') || ''),
      })
      setSubmitted(true)
    } catch (err: any) {
      if (err instanceof ApiError) {
        setServerError(err.message)
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to book session. Please verify your details and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <SuccessMessage title="Session requested successfully!">
          Your request has been securely registered in our system. A certified counsellor will confirm your booking via phone and email.
        </SuccessMessage>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      {serverError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive sm:col-span-2" role="alert">
          {serverError}
        </div>
      )}

      <FormField
        label="Full name"
        name="name"
        required
        autoComplete="name"
        defaultValue={user?.name || ''}
        error={errors.name}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        defaultValue={user?.email || ''}
        error={errors.email}
      />
      <FormField
        label="Mobile number"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        defaultValue={user?.phone || ''}
        error={errors.phone}
      />
      <FormField as="select" label="Topic" name="topic" required options={topics} error={errors.topic} />
      <FormField label="Preferred date" name="date" type="date" min={today} required error={errors.date} />
      <FormField as="select" label="Time slot" name="slot" required options={slots} error={errors.slot} />
      <FormField
        as="textarea"
        label="Anything we should know?"
        name="notes"
        className="sm:col-span-2"
        placeholder="Your education, current role, goals…"
      />
      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-primary animate-pulse sm:col-span-2">
          <svg className="size-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Securing your counselling slot in the system...</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60 sm:col-span-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Booking session...
          </span>
        ) : (
          'Book free session'
        )}
      </button>
    </form>
  )
}
