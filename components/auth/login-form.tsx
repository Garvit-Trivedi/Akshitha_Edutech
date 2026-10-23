'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { validate, type FieldErrors } from '@/lib/validation'
import { useAuth } from './auth-context'
import { ApiError } from '@/lib/api'

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
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
      email: { required: true, email: true, label: 'Email' },
      password: { required: true, label: 'Password' },
    })

    setErrors(result)
    if (Object.keys(result).length > 0) return

    setLoading(true)
    try {
      await login({
        email: String(data.get('email') || ''),
        password: String(data.get('password') || ''),
      })
      setSubmitted(true)
      setTimeout(() => {
        router.push('/jobs')
        router.refresh()
      }, 1200)
    } catch (err: any) {
      if (err instanceof ApiError) {
        setServerError(err.message)
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to sign in. Please check your credentials and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <SuccessMessage title="Signed in successfully!">
          Welcome back! Redirecting you to opportunities...
        </SuccessMessage>
        <Link
          href="/jobs"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go to Jobs
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {serverError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          {serverError}
        </div>
      )}

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        error={errors.password}
      />

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  )
}
