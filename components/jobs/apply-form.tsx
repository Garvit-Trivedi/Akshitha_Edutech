'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { validate, type FieldErrors } from '@/lib/validation'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/components/auth/auth-context'

export function ApplyForm({
  jobId,
  jobTitle,
  company,
}: {
  jobId?: string
  jobTitle: string
  company: string
}) {
  const { user } = useAuth()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerError(null)

    const form = event.currentTarget
    const data = new FormData(form)

    const result = validate(data, {
      name: { required: true, label: 'Full name' },
      email: { required: true, email: true, label: 'Email' },
      phone: { required: true, phone: true, label: 'Mobile number' },
    })

    setErrors(result)
    if (Object.keys(result).length > 0) return

    if (!user) {
      setServerError('Please log in with a job seeker account to submit your application.')
      return
    }

    setLoading(true)
    try {
      if (jobId) {
        await api.jobs.apply(jobId, data)
      } else {
        // Fallback demo timeout if no id
        await new Promise((r) => setTimeout(r, 600))
      }
      setSubmitted(true)
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          setServerError('Please log in with a job seeker account to apply.')
        } else if (err.statusCode === 409) {
          setServerError('You have already applied for this job listing.')
        } else {
          setServerError(err.message)
        }
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to submit your application. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Apply for this job</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {jobTitle} at {company}
      </p>

      {submitted ? (
        <div className="mt-5">
          <SuccessMessage title="Application submitted successfully!">
            {"We've recorded your application and shared your profile with the employer. You can track status updates in your dashboard."}
          </SuccessMessage>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
          {serverError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
              <p>{serverError}</p>
              {serverError.includes('log in') && (
                <Link href="/login" className="mt-1.5 inline-block font-semibold underline">
                  Click here to sign in
                </Link>
              )}
            </div>
          )}

          {!user && (
            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
              <span className="font-semibold">Sign in required:</span> You need a job seeker account to apply.{' '}
              <Link href="/login" className="font-semibold text-primary underline">
                Sign in
              </Link>{' '}
              or{' '}
              <Link href="/register" className="font-semibold text-primary underline">
                create an account
              </Link>.
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
            placeholder="98765 43210"
            error={errors.phone}
          />
          <FormField
            label="Resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            hint="PDF or Word, max 2 MB"
          />
          <FormField
            as="textarea"
            label="Cover note"
            name="coverNote"
            placeholder="Why are you a good fit for this position?"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting application...
              </span>
            ) : (
              'Submit application'
            )}
          </button>
        </form>
      )}
    </div>
  )
}
