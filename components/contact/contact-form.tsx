'use client'

import { useState } from 'react'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { validate, type FieldErrors } from '@/lib/validation'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/components/auth/auth-context'

const subjects = ['Job seeker support', 'Employer support', 'Job fair enquiry', 'Report a fake listing', 'Other']

export function ContactForm() {
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
      name: { required: true, label: 'Name' },
      email: { required: true, email: true, label: 'Email' },
      subject: { required: true, label: 'Subject' },
      message: { required: true, minLength: 10, label: 'Message' },
    })

    setErrors(result)
    if (Object.keys(result).length > 0) return

    setLoading(true)
    try {
      await api.contact.submit({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        subject: String(data.get('subject') || ''),
        message: String(data.get('message') || ''),
      })
      setSubmitted(true)
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.statusCode === 429) {
          setServerError('Too many messages sent. Please wait a few moments before trying again.')
        } else {
          setServerError(err.message)
        }
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to send message. Please verify your details and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <SuccessMessage title="Message sent successfully!">
          {"Thanks for reaching out! Your message has been saved in our system. Our support team will reply within one working day."}
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
        label="Name"
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
        as="select"
        label="Subject"
        name="subject"
        required
        options={subjects}
        className="sm:col-span-2"
        error={errors.subject}
      />
      <FormField
        as="textarea"
        label="Message"
        name="message"
        required
        className="sm:col-span-2"
        error={errors.message}
        placeholder="How can our support team assist you?"
      />
      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-primary animate-pulse sm:col-span-2">
          <svg className="size-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Sending your message to support...</span>
        </div>
      )}

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
            Sending message...
          </span>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  )
}
