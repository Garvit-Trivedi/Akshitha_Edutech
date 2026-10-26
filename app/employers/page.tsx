import type { Metadata } from 'next'
import { EmployerDashboard } from '@/components/employers/employer-dashboard'

export const metadata: Metadata = {
  title: 'Employer Dashboard — My Jobs & Applicants | Akshitha Edutech',
  description: 'Manage your job vacancies, review applicants, and track recruitment progress with Akshitha Edutech.',
}

export default function EmployersPage() {
  return <EmployerDashboard />
}
