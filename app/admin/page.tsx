'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  Users,
  Briefcase,
  Plus,
  Trash2,
  XCircle,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/components/auth/auth-context'
import { api } from '@/lib/api'

export default function AdminPortalPage() {
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'employers' | 'counselling' | 'contact' | 'fairs' | 'jobs'>('overview')
  const [stats, setStats] = useState<any>(null)
  const [employers, setEmployers] = useState<any[]>([])
  const [counsellingList, setCounsellingList] = useState<any[]>([])
  const [contactList, setContactList] = useState<any[]>([])
  const [fairsList, setFairsList] = useState<any[]>([])
  const [jobsList, setJobsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  // New fair form state
  const [showFairForm, setShowFairForm] = useState(false)
  const [fairForm, setFairForm] = useState({
    title: '',
    date: '',
    city: '',
    venue: '',
    employers: 10,
    vacancies: 500,
    mode: 'In-person',
    description: '',
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes, counselRes, contactRes, fairsRes, jobsRes] = await Promise.all([
        api.admin.stats().catch(() => null),
        api.admin.users('employer').catch(() => null),
        api.admin.listCounselling().catch(() => null),
        api.admin.listContact().catch(() => null),
        api.jobFairs.list().catch(() => null),
        api.jobs.list({ limit: 50 }).catch(() => null),
      ])

      if (statsRes?.data?.stats) setStats(statsRes.data.stats)
      if (usersRes?.data) setEmployers(usersRes.data)
      if (counselRes?.data) setCounsellingList(counselRes.data)
      if (contactRes?.data) setContactList(contactRes.data)
      if (fairsRes?.data) setFairsList(fairsRes.data)
      if (jobsRes?.data) setJobsList(jobsRes.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData()
    }
  }, [user, loadData])

  const notify = (msg: string) => {
    setActionMessage(msg)
    setTimeout(() => setActionMessage(null), 4000)
  }

  // Handle Employer Verification Toggle
  async function handleVerify(employerId: string, currentStatus: boolean) {
    setActionLoadingId(`verify-${employerId}`)
    try {
      await api.admin.verifyEmployer(employerId, !currentStatus)
      notify(`Employer verification updated to ${!currentStatus ? 'VERIFIED' : 'UNVERIFIED'}`)
      await loadData()
    } catch {
      notify('Failed to update employer verification status.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Counselling Status Update
  async function handleCounsellingStatus(id: string, status: string) {
    setActionLoadingId(`counsel-${id}-${status}`)
    try {
      await api.admin.updateCounselling(id, status)
      notify(`Counselling request marked as ${status}`)
      await loadData()
    } catch {
      notify('Failed to update counselling request.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Contact Status Update
  async function handleContactStatus(id: string, status: string) {
    setActionLoadingId(`contact-${id}`)
    try {
      await api.admin.updateContact(id, status)
      notify(`Inquiry marked as ${status}`)
      await loadData()
    } catch {
      notify('Failed to update contact inquiry.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Create Job Fair
  async function handleCreateFair(e: React.FormEvent) {
    e.preventDefault()
    setActionLoadingId('create-fair')
    try {
      await api.admin.createJobFair(fairForm)
      notify('New Job Fair successfully published!')
      setShowFairForm(false)
      await loadData()
    } catch {
      notify('Failed to create job fair.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Delete Fair
  async function handleDeleteFair(id: string) {
    if (!confirm('Are you sure you want to cancel and delete this job fair?')) return
    setActionLoadingId(`delete-fair-${id}`)
    try {
      await api.admin.deleteJobFair(id)
      notify('Job Fair removed.')
      await loadData()
    } catch {
      notify('Failed to delete job fair.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Close Job
  async function handleCloseJob(id: string) {
    if (!confirm('Are you sure you want to close this job vacancy?')) return
    setActionLoadingId(`close-job-${id}`)
    try {
      await api.admin.closeJob(id)
      notify('Job listing has been closed.')
      await loadData()
    } catch {
      notify('Failed to close job.')
    } finally {
      setActionLoadingId(null)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Checking administrator credentials...</p>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <ShieldAlert className="size-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Access Restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You must be logged in with the official Administrator account to access platform governance controls.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Sign In as Administrator
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                Administrator Control Center
              </span>
              <span className="text-xs text-muted-foreground">Live MongoDB Platform Data</span>
            </div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Platform Administration</h1>
            <p className="text-sm text-muted-foreground">
              Manage verified employers, career counselling requests, support messages, and job fairs.
            </p>
          </div>
          <button
            onClick={() => loadData()}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-card px-4 text-xs font-semibold text-foreground transition-all hover:bg-muted disabled:opacity-75"
          >
            {loading ? (
              <>
                <svg className="size-3.5 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Syncing live data...</span>
              </>
            ) : (
              'Refresh Platform Data'
            )}
          </button>
        </div>

        {actionMessage && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3 text-sm font-medium text-primary">
            {actionMessage}
          </div>
        )}

        {/* Stats Grid */}
        {loading && !stats ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                <div className="h-3 w-16 rounded bg-muted/70" />
                <div className="h-7 w-12 rounded bg-muted/90" />
                <div className="h-2.5 w-24 rounded bg-muted/50" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Total Users</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{stats.totalUsers}</p>
              <span className="text-[10px] text-muted-foreground">{stats.jobSeekers} seekers · {stats.employers} employers</span>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Active Jobs</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{stats.activeJobs}</p>
              <span className="text-[10px] text-primary">Open for applications</span>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Applications</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{stats.totalApplications}</p>
              <span className="text-[10px] text-muted-foreground">Submitted by candidates</span>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Verified Partners</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{stats.verifiedCompanies}</p>
              <span className="text-[10px] text-emerald-600 font-medium">Official badges active</span>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Counselling Queue</p>
              <p className="mt-1 font-heading text-2xl font-bold text-accent-foreground">{stats.pendingCounselling}</p>
              <span className="text-[10px] text-accent font-medium">Awaiting confirmation</span>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">Inquiries</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">{stats.unreadContacts}</p>
              <span className="text-[10px] text-destructive font-medium">Unread messages</span>
            </div>
          </div>
        ) : null}

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border/60 pb-3">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'employers', label: `Partner Verification (${employers.length})` },
            { id: 'counselling', label: `Counselling Requests (${counsellingList.length})` },
            { id: 'contact', label: `Contact Inquiries (${contactList.length})` },
            { id: 'fairs', label: `Job Fairs (${fairsList.length})` },
            { id: 'jobs', label: `Job Listings (${jobsList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="mt-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Platform Administration Capabilities</h2>
                <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span><strong>Employer Verification:</strong> Audit registered organizations and approve their official verification badge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span><strong>Career Counselling:</strong> View candidate bookings and assign counsellors or mark sessions as confirmed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span><strong>Event Management:</strong> Publish nationwide job fairs and recruitment drives across India.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span><strong>Job Moderation:</strong> Inspect and close fraudulent, expired, or duplicate job vacancies.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Quick Action Shortcuts</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('employers')}
                    className="flex flex-col items-start rounded-lg border p-3 text-left hover:bg-muted"
                  >
                    <Building2 className="size-5 text-primary" />
                    <span className="mt-2 text-xs font-semibold">Verify Employers</span>
                    <span className="text-[10px] text-muted-foreground">Approve new company accounts</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('fairs')
                      setShowFairForm(true)
                    }}
                    className="flex flex-col items-start rounded-lg border p-3 text-left hover:bg-muted"
                  >
                    <CalendarDays className="size-5 text-primary" />
                    <span className="mt-2 text-xs font-semibold">Post a Job Fair</span>
                    <span className="text-[10px] text-muted-foreground">Publish recruitment drive</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('counselling')}
                    className="flex flex-col items-start rounded-lg border p-3 text-left hover:bg-muted"
                  >
                    <Clock className="size-5 text-primary" />
                    <span className="mt-2 text-xs font-semibold">Counselling Queue</span>
                    <span className="text-[10px] text-muted-foreground">Confirm student requests</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="flex flex-col items-start rounded-lg border p-3 text-left hover:bg-muted"
                  >
                    <Mail className="size-5 text-primary" />
                    <span className="mt-2 text-xs font-semibold">Support Inquiries</span>
                    <span className="text-[10px] text-muted-foreground">Answer visitor questions</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EMPLOYERS VERIFICATION TAB */}
          {activeTab === 'employers' && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Employer & Organization Verification</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Grant or revoke official verification badges for hiring organizations.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Company / Employer</th>
                      <th className="px-4 py-3">Email & Contact</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {employers.map((emp) => (
                      <tr key={emp._id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground">{emp.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {emp.email} · {emp.phone}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              emp.isVerified
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {emp.isVerified ? 'Verified Partner' : 'Pending Verification'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleVerify(emp._id, emp.isVerified)}
                            disabled={actionLoadingId === `verify-${emp._id}`}
                            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-60 ${
                              emp.isVerified
                                ? 'border border-destructive/30 text-destructive hover:bg-destructive/10'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                          >
                            {actionLoadingId === `verify-${emp._id}`
                              ? 'Updating...'
                              : emp.isVerified
                              ? 'Revoke Badge'
                              : 'Grant Verified Badge'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {loading && employers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground animate-pulse">
                          Loading employer organizations...
                        </td>
                      </tr>
                    ) : employers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          No employer accounts found.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COUNSELLING TAB */}
          {activeTab === 'counselling' && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Career Counselling Bookings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review and update student and candidate appointment requests.
              </p>

              <div className="mt-4 space-y-4">
                {counsellingList.map((req) => (
                  <div key={req._id} className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{req.name}</span>
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">{req.topic}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          req.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Preferred: {req.date} at {req.slot} · Contact: {req.phone} ({req.email})
                      </p>
                      {req.notes && <p className="mt-1.5 text-xs text-foreground/80 italic">&quot;{req.notes}&quot;</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCounsellingStatus(req._id, 'confirmed')}
                        disabled={actionLoadingId === `counsel-${req._id}-confirmed`}
                        className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {actionLoadingId === `counsel-${req._id}-confirmed` ? 'Confirming...' : 'Confirm Booking'}
                      </button>
                      <button
                        onClick={() => handleCounsellingStatus(req._id, 'completed')}
                        disabled={actionLoadingId === `counsel-${req._id}-completed`}
                        className="rounded-md border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
                      >
                        {actionLoadingId === `counsel-${req._id}-completed` ? 'Updating...' : 'Completed'}
                      </button>
                    </div>
                  </div>
                ))}
                {loading && counsellingList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading counselling queue...</p>
                ) : counsellingList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No counselling requests recorded yet.</p>
                ) : null}
              </div>
            </div>
          )}

          {/* CONTACT INQUIRIES TAB */}
          {activeTab === 'contact' && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Support & Contact Inquiries</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Inquiries submitted through the public contact form.
              </p>

              <div className="mt-4 space-y-4">
                {contactList.map((msg) => (
                  <div key={msg._id} className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{msg.subject}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          msg.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-destructive/10 text-destructive'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        From: {msg.name} ({msg.email})
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{msg.message}</p>
                    </div>
                    {msg.status !== 'resolved' && (
                      <button
                        onClick={() => handleContactStatus(msg._id, 'resolved')}
                        disabled={actionLoadingId === `contact-${msg._id}`}
                        className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                      >
                        {actionLoadingId === `contact-${msg._id}` ? 'Saving...' : 'Mark as Resolved'}
                      </button>
                    )}
                  </div>
                ))}
                {loading && contactList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading support inquiries...</p>
                ) : contactList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No inquiries submitted yet.</p>
                ) : null}
              </div>
            </div>
          )}

          {/* JOB FAIRS TAB */}
          {activeTab === 'fairs' && (
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Job Fairs & Mega Drives</h2>
                  <p className="text-sm text-muted-foreground">Publish and manage recruitment drives.</p>
                </div>
                <button
                  onClick={() => setShowFairForm((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="size-4" />
                  {showFairForm ? 'Cancel' : 'Create Job Fair'}
                </button>
              </div>

              {showFairForm && (
                <form onSubmit={handleCreateFair} className="mt-6 grid gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium">Event Title</label>
                    <input
                      required
                      value={fairForm.title}
                      onChange={(e) => setFairForm({ ...fairForm, title: e.target.value })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                      placeholder="e.g. Pune Engineering Mega Fair"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Date (YYYY-MM-DD)</label>
                    <input
                      required
                      type="date"
                      value={fairForm.date}
                      onChange={(e) => setFairForm({ ...fairForm, date: e.target.value })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">City</label>
                    <input
                      required
                      value={fairForm.city}
                      onChange={(e) => setFairForm({ ...fairForm, city: e.target.value })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                      placeholder="e.g. Pune"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Venue Address</label>
                    <input
                      required
                      value={fairForm.venue}
                      onChange={(e) => setFairForm({ ...fairForm, venue: e.target.value })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                      placeholder="e.g. Auto Cluster Exhibition Hall"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Expected Employers</label>
                    <input
                      type="number"
                      value={fairForm.employers}
                      onChange={(e) => setFairForm({ ...fairForm, employers: Number(e.target.value) })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Expected Vacancies</label>
                    <input
                      type="number"
                      value={fairForm.vacancies}
                      onChange={(e) => setFairForm({ ...fairForm, vacancies: Number(e.target.value) })}
                      className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={actionLoadingId === 'create-fair'}
                      className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
                    >
                      {actionLoadingId === 'create-fair' ? 'Publishing...' : 'Publish Event to Platform'}
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 space-y-3">
                {fairsList.map((fair) => (
                  <div key={fair._id || fair.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{fair.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {fair.date} · {fair.venue}, {fair.city} · {fair.employers} employers · {fair.vacancies} vacancies
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteFair(fair._id || fair.id)}
                      disabled={actionLoadingId === `delete-fair-${fair._id || fair.id}`}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                      title="Cancel Event"
                    >
                      {actionLoadingId === `delete-fair-${fair._id || fair.id}` ? (
                        <span className="text-[10px] animate-spin">⏳</span>
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </div>
                ))}
                {loading && fairsList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading job fairs...</p>
                ) : fairsList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No upcoming job fairs found.</p>
                ) : null}
              </div>
            </div>
          )}

          {/* JOBS MODERATION TAB */}
          {activeTab === 'jobs' && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Live Job Vacancies Moderation</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Inspect and close fraudulent, expired, or non-compliant job postings.
              </p>

              <div className="mt-4 space-y-3">
                {jobsList.map((job) => (
                  <div key={job._id || job.id} className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{job.title}</span>
                        <span className="text-xs text-muted-foreground">at {job.company}</span>
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{job.type}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {job.location} · {job.category} · {job.salary} · {job.openings} openings
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${job.slug || job.id || job._id}`}
                        target="_blank"
                        className="inline-flex h-8 items-center gap-1 rounded-md border px-2.5 text-xs font-medium text-foreground hover:bg-muted"
                      >
                        View <ExternalLink className="size-3" />
                      </Link>
                      <button
                        onClick={() => handleCloseJob(job._id || job.id)}
                        disabled={actionLoadingId === `close-job-${job._id || job.id}`}
                        className="inline-flex h-8 items-center rounded-md border border-destructive/30 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-60"
                      >
                        {actionLoadingId === `close-job-${job._id || job.id}` ? 'Closing...' : 'Close Listing'}
                      </button>
                    </div>
                  </div>
                ))}
                {loading && jobsList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading jobs from database...</p>
                ) : jobsList.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No active job listings found.</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
