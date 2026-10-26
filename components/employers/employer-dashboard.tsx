'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Users,
  PlusCircle,
  MapPin,
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCw,
  Search,
  Sparkles,
  ShieldCheck,
  Building2,
  ChevronRight,
  Download,
} from 'lucide-react'
import { useAuth } from '@/components/auth/auth-context'
import { api, ApiError } from '@/lib/api'
import { PostJobForm } from '@/components/employers/post-job-form'
import { SectionHeading } from '@/components/shared/section-heading'
import { TopEmployers } from '@/components/home/top-employers'
import { BadgeCheck, BarChart3, ShieldCheck as ShieldCheckIcon } from 'lucide-react'

interface JobItem {
  _id: string
  id?: string
  slug?: string
  title: string
  company: string
  location: string
  type: string
  category: string
  experience?: string
  salary?: string
  openings?: number
  skills?: string[]
  description?: string
  status: 'active' | 'closed' | 'draft'
  applicantsCount?: number
  applicantCount?: number
  createdAt: string
  postedDaysAgo?: number
}

interface ApplicationItem {
  _id: string
  applicant?: {
    _id: string
    name: string
    email: string
    phone?: string
  }
  job?: string | { _id: string; title: string; company: string }
  name: string
  email: string
  phone: string
  coverNote?: string
  resumeUrl?: string
  status: 'submitted' | 'in_review' | 'shortlisted' | 'rejected' | 'accepted'
  createdAt: string
  updatedAt: string
}

const employerBenefits = [
  { icon: FileText, title: 'Free job postings', description: 'Publish unlimited vacancies at no cost and reach candidates across India.' },
  { icon: Search, title: 'Candidate search', description: 'Filter lakhs of profiles by skills, education, experience and location.' },
  { icon: ShieldCheckIcon, title: 'Verified profiles', description: 'Mobile and email verified job seekers reduce no-shows and fake applications.' },
  { icon: Users, title: 'Hiring drives', description: 'Host walk-ins and job fairs, online or in person, with our events team.' },
  { icon: BarChart3, title: 'Hiring analytics', description: 'Track views, applications and shortlist rates for every job posting.' },
  { icon: BadgeCheck, title: 'Trusted badge', description: 'Verified employers get a trust badge that improves application rates.' },
]

function getResumeFullUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
  const origin = apiBase.replace(/\/api\/v1\/?$/, '')
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}

export function EmployerDashboard() {
  const { user, loading: authLoading } = useAuth()
  const isEmployer = user && (user.role === 'employer' || user.role === 'admin')

  const [activeTab, setActiveTab] = useState<'my-jobs' | 'post-job' | 'applicants' | 'overview'>('my-jobs')
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null)
  const [applicants, setApplicants] = useState<ApplicationItem[]>([])
  const [loadingApplicants, setLoadingApplicants] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed'>('all')

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4500)
  }

  // Load jobs created by the authenticated employer
  const fetchMyJobs = useCallback(async () => {
    if (!isEmployer) return
    setLoadingJobs(true)
    try {
      const res = await api.employer.myJobs(user)
      if (res?.data) {
        setJobs(res.data)
      }
    } catch (err: any) {
      console.error('Failed to load employer jobs:', err)
      notify('Unable to fetch your jobs. Please verify your connection.', 'error')
    } finally {
      setLoadingJobs(false)
    }
  }, [isEmployer, user])

  useEffect(() => {
    if (isEmployer) {
      fetchMyJobs()
    }
  }, [isEmployer, fetchMyJobs])

  // Load applicants for a specific job
  const fetchApplicantsForJob = useCallback(async (job: JobItem) => {
    setSelectedJob(job)
    setActiveTab('applicants')
    setLoadingApplicants(true)
    try {
      const jobId = job._id || job.id || job.slug || ''
      const res = await api.employer.jobApplications(jobId)
      if (res?.data) {
        setApplicants(res.data)
      } else {
        setApplicants([])
      }
    } catch (err: any) {
      console.error('Failed to load applicants:', err)
      notify(err.message || 'Failed to load applicants for this job vacancy.', 'error')
      setApplicants([])
    } finally {
      setLoadingApplicants(false)
    }
  }, [])

  // Update applicant status
  async function handleUpdateStatus(applicationId: string, newStatus: ApplicationItem['status']) {
    setActionLoadingId(`status-${applicationId}`)
    try {
      await api.employer.updateApplicationStatus(applicationId, newStatus)
      setApplicants((prev) =>
        prev.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app))
      )
      notify(`Application status updated to ${newStatus.replace('_', ' ').toUpperCase()}`)
    } catch (err: any) {
      notify(err.message || 'Failed to update application status.', 'error')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Close job posting
  async function handleCloseJob(jobId: string) {
    if (!confirm('Are you sure you want to close this job vacancy? Candidates will no longer be able to submit applications.')) {
      return
    }
    setActionLoadingId(`close-${jobId}`)
    try {
      await api.admin.closeJob(jobId)
      notify('Job vacancy has been closed.')
      await fetchMyJobs()
      if (selectedJob && (selectedJob._id === jobId || selectedJob.id === jobId)) {
        setSelectedJob((prev) => (prev ? { ...prev, status: 'closed' } : null))
      }
    } catch (err: any) {
      notify(err.message || 'Failed to close job vacancy.', 'error')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.skills && job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && job.status === 'active') ||
        (statusFilter === 'closed' && job.status === 'closed')

      return matchesSearch && matchesStatus
    })
  }, [jobs, searchQuery, statusFilter])

  // Aggregated stats
  const totalApplicantsCount = useMemo(() => {
    return jobs.reduce((acc, job) => acc + (job.applicantsCount || job.applicantCount || 0), 0)
  }, [jobs])

  const activeJobsCount = useMemo(() => {
    return jobs.filter((j) => j.status === 'active').length
  }, [jobs])

  // -------------------------------------------------------------
  // If user is NOT an employer (Guest or Jobseeker)
  // -------------------------------------------------------------
  if (!authLoading && !isEmployer) {
    return (
      <>
        {/* Promotional Banner for Employers */}
        <section className="border-b bg-primary/5 py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row lg:px-6">
            <div className="flex items-center gap-2.5 text-xs text-foreground sm:text-sm">
              <Sparkles className="size-4 shrink-0 text-primary" />
              <span>
                <strong>Hiring Partner Account:</strong> Sign in with an employer account to access your{' '}
                <strong>My Jobs</strong> dashboard and view candidate applications.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/login"
                className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Employer Sign In
              </Link>
              <Link
                href="/register?role=employer"
                className="inline-flex h-8 items-center justify-center rounded-lg border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        {/* Public Employer Landing Header */}
        <div className="border-b bg-gradient-to-b from-card to-muted/20 py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              Akshitha Edutech Employer Portal
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hire verified talent faster
            </h1>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground">
              Everything you need to source, screen, and recruit job seekers — from single vacancies to large-scale recruitment drives.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading eyebrow="Why hire with us" title="Built for employers of every size" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employerBenefits.map((b) => (
              <li key={b.title} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <b.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Post a Job Section */}
        <section id="post-job" className="border-y bg-muted/40">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-6">
            <SectionHeading
              eyebrow="Get started"
              title="Post a job in minutes"
              description="Fill in the basic details and our team will review and publish your vacancy immediately."
            />
            <PostJobForm />
          </div>
        </section>

        <TopEmployers />
      </>
    )
  }

  // -------------------------------------------------------------
  // Authenticated Employer Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-muted/20 pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Building2 className="size-3.5" />
                Employer Hiring Workspace
              </span>
              <span className="text-xs text-muted-foreground">· Live Platform Sync</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {user?.name ? `${user.name} — Hiring Dashboard` : 'Employer Dashboard'}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your posted job listings, track live candidate applications, and evaluate talent profiles with strict employer data isolation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchMyJobs()
                if (selectedJob) fetchApplicantsForJob(selectedJob)
              }}
              disabled={loadingJobs}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-card px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
            >
              <RotateCw className={`size-3.5 ${loadingJobs ? 'animate-spin text-primary' : ''}`} />
              <span>{loadingJobs ? 'Syncing...' : 'Refresh Data'}</span>
            </button>
            <button
              onClick={() => setActiveTab('post-job')}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <PlusCircle className="size-3.5" />
              <span>Post New Vacancy</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`mt-4 flex items-center gap-2 rounded-lg p-3 text-sm font-medium ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="size-4 shrink-0 text-destructive" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Live Overview Stats Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">My Posted Jobs</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">{jobs.length}</p>
            <span className="text-[11px] text-primary">{activeJobsCount} currently active</span>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Total Applicants</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">{totalApplicantsCount}</p>
            <span className="text-[11px] text-muted-foreground">Calculated from database</span>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Openings Count</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">
              {jobs.reduce((acc, j) => acc + (j.openings || 1), 0)}
            </p>
            <span className="text-[11px] text-muted-foreground">Across all positions</span>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">Account Status</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-heading text-xl font-bold text-foreground">Verified</span>
              <ShieldCheck className="size-4 text-emerald-600" />
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">Full Posting Rights</span>
          </div>
        </div>

        {/* Existing Navigation / Tabs Bar */}
        <nav aria-label="Employer Dashboard Navigation" className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
          <button
            onClick={() => setActiveTab('my-jobs')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'my-jobs'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Briefcase className="size-3.5" />
            <span>My Jobs</span>
            <span
              className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === 'my-jobs' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-foreground'
              }`}
            >
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('post-job')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'post-job'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <PlusCircle className="size-3.5" />
            <span>Post New Job</span>
          </button>

          {/* Dynamic Applicants Tab */}
          <button
            onClick={() => {
              if (selectedJob) setActiveTab('applicants')
            }}
            disabled={!selectedJob}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              activeTab === 'applicants'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Users className="size-3.5" />
            <span>
              {selectedJob
                ? `Applicants: ${selectedJob.title.length > 22 ? `${selectedJob.title.slice(0, 22)}...` : selectedJob.title}`
                : 'Job Applicants'}
            </span>
            {selectedJob && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  activeTab === 'applicants' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >
                {applicants.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Sparkles className="size-3.5" />
            <span>Hiring Benefits & Guide</span>
          </button>
        </nav>

        {/* -----------------------------------------------------------
            TAB 1: MY JOBS SECTION
            ----------------------------------------------------------- */}
        {activeTab === 'my-jobs' && (
          <section aria-label="My Jobs Section" className="mt-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search my jobs by title, location, skill..."
                  className="h-10 w-full rounded-lg border bg-card pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Status:</span>
                {(['all', 'active', 'closed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                      statusFilter === s
                        ? 'bg-secondary text-primary font-semibold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Listing */}
            {loadingJobs ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse rounded-xl border bg-card p-5 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted/70" />
                    <div className="h-16 rounded bg-muted/40" />
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {jobs.length === 0 ? 'No job vacancies published yet' : 'No jobs matching your search'}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground max-w-md mx-auto">
                  {jobs.length === 0
                    ? 'Publish your first opening to start receiving verified candidate applications across India.'
                    : 'Try clearing your search query or changing the status filter to see other vacancies.'}
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  {jobs.length === 0 ? (
                    <button
                      onClick={() => setActiveTab('post-job')}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <PlusCircle className="size-4" />
                      Post Your First Vacancy
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('all')
                      }}
                      className="inline-flex h-9 items-center justify-center rounded-lg border bg-card px-4 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => {
                  const applicantsCount = job.applicantsCount ?? job.applicantCount ?? 0
                  return (
                    <article
                      key={job._id || job.id}
                      className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
                    >
                      <div>
                        {/* Header: Title and Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                              {job.category}
                            </span>
                            <h3 className="mt-2 text-base font-bold leading-tight text-foreground line-clamp-2">
                              {job.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-muted-foreground truncate">{job.company}</p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                              job.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>

                        {/* Metadata Details */}
                        <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <MapPin className="size-3.5 shrink-0 text-primary" />
                            <span className="truncate">{job.location}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Briefcase className="size-3.5 shrink-0 text-primary" />
                            <span>{job.type}</span>
                            {job.openings && <span>· {job.openings} vacancies</span>}
                          </li>
                          {job.salary && (
                            <li className="flex items-center gap-2">
                              <span className="font-semibold text-foreground/80">Salary:</span>
                              <span>{job.salary}</span>
                            </li>
                          )}
                        </ul>

                        {/* Skills Chips */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="rounded border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="text-[10px] text-muted-foreground self-center">
                                +{job.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-5 border-t border-border/60 pt-4">
                        {/* Number of Applicants Badge */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                              {applicantsCount}
                            </span>
                            <span className="text-xs font-semibold text-foreground">
                              {applicantsCount === 1 ? '1 Applicant' : `${applicantsCount} Applicants`}
                            </span>
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {job.postedDaysAgo === 1
                              ? 'Posted 1 day ago'
                              : job.postedDaysAgo
                              ? `Posted ${job.postedDaysAgo}d ago`
                              : 'Recent'}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fetchApplicantsForJob(job)}
                            className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                          >
                            <Users className="size-3.5" />
                            <span>View Applicants</span>
                          </button>

                          <Link
                            href={`/jobs/${job.id || job.slug || job._id}`}
                            target="_blank"
                            title="View public job posting"
                            className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <ExternalLink className="size-3.5" />
                          </Link>

                          {job.status === 'active' && (
                            <button
                              type="button"
                              onClick={() => handleCloseJob(job._id || job.id || '')}
                              disabled={actionLoadingId === `close-${job._id || job.id}`}
                              title="Close this vacancy"
                              className="inline-flex size-9 items-center justify-center rounded-lg border border-muted text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                            >
                              <XCircle className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* -----------------------------------------------------------
            TAB 2: APPLICANTS FOR SELECTED JOB
            ----------------------------------------------------------- */}
        {activeTab === 'applicants' && selectedJob && (
          <section aria-label="Job Applicants Section" className="mt-6">
            {/* Header: Back Button + Job Summary */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('my-jobs')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-2"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Back to My Jobs</span>
                  </button>
                  <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    Applicants for: {selectedJob.title}
                  </h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{selectedJob.company}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" />
                      {selectedJob.location}
                    </span>
                    <span>·</span>
                    <span>{selectedJob.type}</span>
                    <span>·</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                        selectedJob.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {selectedJob.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 px-3 py-2 text-center">
                    <span className="block font-heading text-lg font-bold text-primary">
                      {applicants.length}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">
                      Total Candidates
                    </span>
                  </div>
                  <button
                    onClick={() => fetchApplicantsForJob(selectedJob)}
                    disabled={loadingApplicants}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
                  >
                    <RotateCw className={`size-3.5 ${loadingApplicants ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Applicants List */}
            {loadingApplicants ? (
              <div className="mt-6 space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse rounded-xl border bg-card p-6 space-y-3">
                    <div className="h-5 w-1/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted/60" />
                    <div className="h-12 rounded bg-muted/30" />
                  </div>
                ))}
              </div>
            ) : applicants.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  No applicants have applied to this job yet
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Qualified candidates are actively exploring open roles across India. When a candidate submits an application with their profile and resume, it will appear here in real time.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('my-jobs')}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <ArrowLeft className="size-3.5" />
                    Return to My Jobs
                  </button>
                  <Link
                    href={`/jobs/${selectedJob.id || selectedJob.slug || selectedJob._id}`}
                    target="_blank"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border bg-card px-4 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    <ExternalLink className="size-3.5" />
                    Preview Public Listing
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {applicants.map((app, index) => {
                  const statusColors: Record<ApplicationItem['status'], string> = {
                    submitted: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
                    in_review: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
                    shortlisted: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
                    accepted: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
                    rejected: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
                  }

                  const appliedDateFormatted = app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recent'

                  return (
                    <article
                      key={app._id}
                      className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        {/* Candidate Identity */}
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-sm font-bold text-primary"
                          >
                            {app.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-foreground">{app.name}</h4>
                              <span className="text-xs text-muted-foreground">· #{index + 1}</span>
                            </div>

                            {/* Contact Details */}
                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <a
                                href={`mailto:${app.email}`}
                                className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                              >
                                <Mail className="size-3.5 text-primary" />
                                <span>{app.email}</span>
                              </a>
                              {app.phone && (
                                <a
                                  href={`tel:${app.phone}`}
                                  className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                                >
                                  <Phone className="size-3.5 text-primary" />
                                  <span>{app.phone}</span>
                                </a>
                              )}
                              <span className="inline-flex items-center gap-1 text-muted-foreground/80">
                                <Calendar className="size-3.5" />
                                <span>Applied {appliedDateFormatted}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Application Status Selector */}
                        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Status:</span>
                            <select
                              value={app.status}
                              disabled={actionLoadingId === `status-${app._id}`}
                              onChange={(e) =>
                                handleUpdateStatus(app._id, e.target.value as ApplicationItem['status'])
                              }
                              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize focus:outline-none focus:ring-1 focus:ring-primary ${
                                statusColors[app.status]
                              }`}
                            >
                              <option value="submitted">Submitted</option>
                              <option value="in_review">In Review</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                          {actionLoadingId === `status-${app._id}` && (
                            <span className="text-[10px] text-primary animate-pulse">
                              Updating status in database...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cover Letter / Note */}
                      {app.coverNote && (
                        <div className="mt-4 rounded-lg bg-muted/40 p-3 text-xs leading-relaxed text-foreground/90 border border-border/50">
                          <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider mb-1 text-muted-foreground">
                            Candidate Note / Cover Note:
                          </p>
                          <p className="whitespace-pre-wrap">{app.coverNote}</p>
                        </div>
                      )}

                      {/* Resume / CV Section */}
                      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-border/60 pt-3 text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-primary" />
                          <span className="font-medium text-foreground">Candidate Resume / CV:</span>
                          {app.resumeUrl ? (
                            <span className="text-muted-foreground">Document attached</span>
                          ) : (
                            <span className="text-muted-foreground italic">No resume file uploaded</span>
                          )}
                        </div>

                        {app.resumeUrl ? (
                          <a
                            href={getResumeFullUrl(app.resumeUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-secondary/80"
                          >
                            <Download className="size-3.5" />
                            <span>View / Download Resume</span>
                            <ExternalLink className="size-3 ml-0.5" />
                          </a>
                        ) : (
                          <span className="rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                            Profile only
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* -----------------------------------------------------------
            TAB 3: POST A JOB
            ----------------------------------------------------------- */}
        {activeTab === 'post-job' && (
          <section aria-label="Post a Job Section" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
              <div className="space-y-4">
                <SectionHeading
                  eyebrow="Publish Vacancy"
                  title="Create a new job posting"
                  description="Your vacancy will immediately be associated with your employer profile and made available to verified jobseekers across India."
                />

                <div className="rounded-xl border bg-card p-5 text-xs space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">Employer Posting Guarantee</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Only you have authorization to view applicants for this role.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Review candidate resumes in PDF or Word formats.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Track candidate evaluation statuses directly from this dashboard.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <PostJobForm
                onSuccess={() => {
                  fetchMyJobs()
                  notify('New job vacancy published! It has been added to your My Jobs list.')
                  setActiveTab('my-jobs')
                }}
                onViewMyJobs={() => setActiveTab('my-jobs')}
              />
            </div>
          </section>
        )}

        {/* -----------------------------------------------------------
            TAB 4: HIRING BENEFITS & OVERVIEW
            ----------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <section aria-label="Hiring Benefits & Overview" className="mt-6 space-y-12">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <SectionHeading eyebrow="Why hire with us" title="Built for employers of every size" />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {employerBenefits.map((b) => (
                  <li key={b.title} className="rounded-xl border bg-muted/30 p-5">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <b.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3.5 font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <TopEmployers />
          </section>
        )}
      </div>
    </div>
  )
}
