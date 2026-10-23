import { DirectoryPage } from '@/components/portal/directory-page'
import { institutions } from '@/lib/data'

export const metadata = { title: 'Institutions | Akshitha Edutech', description: 'Find universities, colleges and verified learning partners.' }

export default function InstitutionsPage() {
  return <DirectoryPage kind="institutions" items={institutions} />
}
