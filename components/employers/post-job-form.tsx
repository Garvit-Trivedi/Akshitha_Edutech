'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { jobCategories, jobTypes, locations } from '@/lib/data'
import { validate, type FieldErrors } from '@/lib/validation'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/components/auth/auth-context'

export function PostJobForm() {
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
      company: { required: true, label: 'Company name' },
      title: { required: true, label: 'Job title' },
      category: { required: true, label: 'Sector' },
      location: { required: true, label: 'Location' },
      type: { required: true, label: 'Job type' },
      email: { required: true, email: true, label: 'Contact email' },
      description: { required: true, minLength: 30, label: 'Job description' },
    })

    setErrors(result)
    if (Object.keys(result).length > 0) return

    setLoading(true)
    try {
      const payload = {
        company: String(data.get('company') || ''),
        title: String(data.get('title') || ''),
        category: String(data.get('category') || ''),
        location: String(data.get('location') || ''),
        type: String(data.get('type') || ''),
        openings: Number(data.get('openings')) || 1,
        salary: String(data.get('salary') || 'Competitive'),
        contactEmail: String(data.get('email') || ''),
        description: String(data.get('description') || ''),
        experience: '0–2 years',
        skills: [String(data.get('category') || 'General')],
      }

      await api.jobs.create(payload)
      setSubmitted(true)
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          setServerError('Please sign in to your employer account to publish jobs.')
        } else if (err.statusCode === 403) {
          setServerError('Only registered employer accounts can publish job listings.')
        } else {
          setServerError(err.message)
        }
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to publish job vacancy. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
        <SuccessMessage title="Job vacancy published successfully!">
          {"Your job vacancy has been stored in the platform database and is now live for qualified candidates across India."}
        </SuccessMessage>
        <Link
          href="/jobs"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Live Jobs Directory
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      {serverError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive sm:col-span-2" role="alert">
          <p>{serverError}</p>
          {serverError.includes('sign in') && (
            <Link href="/login" className="mt-1 font-semibold underline inline-block">
              Click here to sign in as employer
            </Link>
          )}
        </div>
      )}

      {!user && (
        <div className="rounded-lg bg-secondary/80 p-3 text-sm text-foreground/80 sm:col-span-2">
          Note: To post official vacancies, please <Link href="/login" className="font-semibold text-primary underline">login</Link> or <Link href="/register?role=employer" className="font-semibold text-primary underline">register an employer profile</Link>.
        </div>
      )}

      <FormField
        label="Company name"
        name="company"
        required
        defaultValue={user?.company?.name || user?.name || ''}
        error={errors.company}
        autoComplete="organization"
      />
      <FormField label="Job title" name="title" required error={errors.title} />
      <FormField
        as="select"
        label="Sector"
        name="category"
        required
        options={jobCategories.map((c) => c.name)}
        error={errors.category}
      />
      <FormField as="select" label="Location" name="location" required options={locations} error={errors.location} />
      <FormField as="select" label="Job type" name="type" required options={jobTypes} error={errors.type} />
      <FormField label="Number of openings" name="openings" type="number" min={1} defaultValue={1} />
      <FormField label="Salary range" name="salary" placeholder="e.g. ₹4 – 6 LPA" />
      <FormField
        label="Contact email"
        name="email"
        type="email"
        required
        defaultValue={user?.email || ''}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        as="textarea"
        label="Job description"
        name="description"
        required
        className="sm:col-span-2"
        error={errors.description}
        hint="Describe responsibilities, requirements and benefits."
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:col-span-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting vacancy...
          </span>
        ) : (
          'Submit job posting'
        )}
      </button>
    </form>
  )
}
