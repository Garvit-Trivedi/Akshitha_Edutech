import { DirectoryPage } from '@/components/portal/directory-page'
import { companies } from '@/lib/data'
import { api } from '@/lib/api'

export const metadata = {
  title: 'Companies | Akshitha Edutech',
  description: 'Discover verified companies and international employers.',
}

export default async function CompaniesPage() {
  let items = companies

  try {
    const res = await api.companies.list()
    if (res?.data && res.data.length > 0) {
      items = res.data.map((c: any) => ({
        name: c.name,
        type: c.type,
        industry: c.industry,
        location: c.location,
        openings: c.openings || 0,
        description: c.description,
        badge: c.isVerified ? 'Verified' : undefined,
      }))
    }
  } catch {
    // Graceful fallback to static data
  }

  return <DirectoryPage kind="companies" items={items} />
}
