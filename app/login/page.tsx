import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Akshitha Edutech Company account.',
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage applications, saved jobs and job postings."
      footer={
        <>
          {"Don't have an account? "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register free
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
