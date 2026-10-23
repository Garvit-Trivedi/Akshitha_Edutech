'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { cn } from '@/lib/utils'
import { validate, type FieldErrors } from '@/lib/validation'
import { useAuth } from './auth-context'
import { ApiError } from '@/lib/api'

type Role = 'jobseeker' | 'employer'

export function RegisterForm({ initialRole }: { initialRole: Role }) {
  const router = useRouter()
  const { register } = useAuth()
  const [role, setRole] = useState<Role>(initialRole)
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
      name: { required: true, label: role === 'employer' ? 'Company name' : 'Full name' },
      email: { required: true, email: true, label: 'Email' },
      phone: { required: true, phone: true, label: 'Mobile number' },
      password: { required: true, minLength: 8, label: 'Password' },
    })

    if (!data.get('terms')) {
      result.terms = 'Please accept the terms to continue'
    }

    setErrors(result)
    if (Object.keys(result).length > 0) return

    setLoading(true)
    try {
      await register({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        password: String(data.get('password') || ''),
        role,
        terms: true,
      })
      setSubmitted(true)
      setTimeout(() => {
        router.push(role === 'employer' ? '/employers' : '/jobs')
        router.refresh()
      }, 1500)
    } catch (err: any) {
      if (err instanceof ApiError) {
        setServerError(err.message)
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError('Unable to create account. Please verify your details and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <SuccessMessage title="Account created successfully!">
          {role === 'employer'
            ? 'Your organization account has been established. You can now post vacancies.'
            : 'Welcome to Akshitha Edutech! Your candidate profile is ready.'}
        </SuccessMessage>
        <Link
          href={role === 'employer' ? '/employers' : '/jobs'}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Continue to {role === 'employer' ? 'Employer Hub' : 'Browse Jobs'}
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

      <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
        {(['jobseeker', 'employer'] as const).map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={role === r}
            onClick={() => setRole(r)}
            className={cn(
              'h-9 rounded-md text-sm font-medium transition-colors',
              role === r ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {r === 'jobseeker' ? 'Job Seeker' : 'Employer'}
          </button>
        ))}
      </div>
      <input type="hidden" name="role" value={role} />

      <FormField
        label={role === 'employer' ? 'Company name' : 'Full name'}
        name="name"
        required
        autoComplete={role === 'employer' ? 'organization' : 'name'}
        error={errors.name}
      />
      <FormField label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
      <FormField label="Mobile number" name="phone" type="tel" required autoComplete="tel" error={errors.phone} />
      <FormField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        hint="At least 8 characters"
        error={errors.password}
      />

      <div>
        <label className="flex items-start gap-2.5 text-sm text-foreground/85">
          <input type="checkbox" name="terms" className="mt-0.5 size-4 accent-[var(--primary)]" />
          I agree to the Terms of Use and Privacy Policy.
        </label>
        {errors.terms && <p className="mt-1 text-xs text-destructive">{errors.terms}</p>}
      </div>

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
            Creating account...
          </span>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  )
}
