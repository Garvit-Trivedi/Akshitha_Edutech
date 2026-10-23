import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a free Akshitha Edutech Company account as a job seeker or employer.',
}

type SearchParams = Promise<{ role?: string }>

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const { role } = await searchParams
  const initialRole = role === 'employer' ? 'employer' : 'jobseeker'

  return (
    <AuthCard
      title="Create your free account"
      description="Join lakhs of job seekers and employers on Akshitha Edutech."
      footer={
        <>
          {'Already registered? '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm initialRole={initialRole} />
    </AuthCard>
  )
}
