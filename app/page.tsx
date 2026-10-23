import { CtaBanner } from '@/components/home/cta-banner'
import { EcosystemGrid } from '@/components/home/ecosystem-grid'
import { FeaturedJobs } from '@/components/home/featured-jobs'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { JobCategories } from '@/components/home/job-categories'
import { QuickServices } from '@/components/home/quick-services'
import { StatsStrip } from '@/components/home/stats-strip'
import { Testimonials } from '@/components/home/testimonials'
import { TopEmployers } from '@/components/home/top-employers'
import { UpcomingJobFairs } from '@/components/home/upcoming-job-fairs'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <TopEmployers />
      <QuickServices />
      <EcosystemGrid />
      <JobCategories />
      <FeaturedJobs />
      <HowItWorks />
      <UpcomingJobFairs />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
