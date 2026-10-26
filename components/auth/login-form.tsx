'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormField, SuccessMessage } from '@/components/forms/form-field'
import { validate, type FieldErrors } from '@/lib/validation'
import { useAuth } from './auth-context'
import { ApiError } from '@/lib/api'

const DEMO_CREDENTIALS = [
  {
    role: 'Candidate',
    email: 'candidate@akshithaedutech.example',
    pass: 'CandidatePass123!',
    desc: 'Jobseeker account',
  },
  {
    role: 'Employer',
    email: 'employer@nimbus.example',
    pass: 'EmployerSecurePass123!',
    desc: 'Hiring partner account',
  },
  {
    role: 'Admin',
    email: 'admin@akshithaedutech.example',
    pass: 'AdminSecurePass123!',
    desc: 'System admin account',
  },
]

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<{ message: string; is401?: boolean } | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [userRole, setUserRole] = useState<string>('jobseeker')

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    setErrors({})
    setServerError(null)
  }

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
      const user = await login({
        email: email.trim().toLowerCase(),
        password: password,
      })
      setUserRole(user?.role || 'jobseeker')
      setSubmitted(true)
      setTimeout(() => {
        if (user?.role === 'admin') {
          router.push('/admin')
        } else if (user?.role === 'employer') {
          router.push('/employers')
        } else {
          router.push('/jobs')
        }
        router.refresh()
      }, 1200)
    } catch (err: any) {
      if (err instanceof ApiError) {
        setServerError({
          message: err.message,
          is401: err.statusCode === 401,
        })
        if (err.errors) setErrors(err.errors)
      } else {
        setServerError({
          message: 'Unable to sign in. Please check your credentials and try again.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <SuccessMessage title="Signed in successfully!">
          {userRole === 'admin'
            ? 'Welcome back, Administrator! Redirecting you to the Admin Dashboard...'
            : userRole === 'employer'
            ? 'Welcome back, Employer! Redirecting you to your Employer Dashboard...'
            : 'Welcome back! Redirecting you to opportunities...'}
        </SuccessMessage>
        <Link
          href={userRole === 'admin' ? '/admin' : userRole === 'employer' ? '/employers' : '/jobs'}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {userRole === 'admin'
            ? 'Go to Admin Dashboard'
            : userRole === 'employer'
            ? 'Go to Employer Dashboard'
            : 'Go to Jobs'}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Quick Demo Credentials Autofill */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs">
        <div className="flex items-center justify-between pb-2 font-medium text-foreground">
          <span>Quick Demo Logins:</span>
          <span className="text-[11px] text-muted-foreground">Click to autofill</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_CREDENTIALS.map((demo) => (
            <button
              key={demo.role}
              type="button"
              onClick={() => handleFillDemo(demo.email, demo.pass)}
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-2 text-center transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
            >
              <span className="font-semibold text-foreground">{demo.role}</span>
              <span className="text-[10px] text-muted-foreground">{demo.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {serverError && (
          <div
            className="rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive"
            role="alert"
          >
            <p className="font-semibold">{serverError.message}</p>
            {serverError.is401 && (
              <p className="mt-1 text-xs text-destructive/90">
                Don’t have an account yet?{' '}
                <Link href="/register" className="font-semibold underline hover:text-destructive">
                  Register here
                </Link>{' '}
                or click any demo account above to test instantly.
              </p>
            )}
          </div>
        )}

        <FormField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (serverError) setServerError(null)
          }}
          error={errors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (serverError) setServerError(null)
          }}
          error={errors.password}
        />

        {loading && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-primary animate-pulse">
            <svg className="size-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Verifying credentials with authentication service...</span>
          </div>
        )}

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
    </div>
  )
}
