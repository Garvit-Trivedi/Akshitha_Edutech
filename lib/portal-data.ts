export const companies = [
  { name: 'Nimbus Softworks', type: 'Technology company', industry: 'Software & Product', location: 'Bengaluru, India', openings: 48, description: 'Building accessible digital products for a connected world.' },
  { name: 'Sanjeevani Health Network', type: 'Healthcare group', industry: 'Healthcare', location: 'Hyderabad, India', openings: 36, description: 'Growing a compassionate network of care professionals.' },
  { name: 'Pragati Finance Bank', type: 'Financial services', industry: 'Banking & Finance', location: 'Mumbai, India', openings: 29, description: 'Creating inclusive financial experiences across emerging markets.' },
  { name: 'Northstar Mobility', type: 'Global enterprise', industry: 'Mobility & Logistics', location: 'Singapore / Remote', openings: 22, description: 'Designing cleaner, smarter ways to move people and goods.' },
  { name: 'Kalam Media Labs', type: 'Learning company', industry: 'Education & Media', location: 'Remote / India', openings: 17, description: 'Making high-quality learning more engaging and available.' },
  { name: 'Veerabhadra Industries', type: 'Manufacturing group', industry: 'Manufacturing', location: 'Pune, India', openings: 31, description: 'Building resilient teams for the next generation of industry.' },
]

export const institutions = [
  { name: 'Akshitha Institute of Technology', type: 'Engineering college', location: 'Bengaluru, India', programs: 28, learners: '4,800+', description: 'Industry-aligned engineering education with a strong placement culture.' },
  { name: 'Global School of Business & Management', type: 'Management institute', location: 'Mumbai, India', programs: 14, learners: '2,100+', description: 'Preparing future leaders through applied learning and global exposure.' },
  { name: 'Vidya Arts & Science University', type: 'University', location: 'Jaipur, India', programs: 42, learners: '9,200+', description: 'A multidisciplinary campus connecting ideas, skills and opportunity.' },
  { name: 'SkillForge Technical Academy', type: 'Training institute', location: 'Chennai, India', programs: 19, learners: '3,600+', description: 'Practical pathways into technology, trades and modern workplaces.' },
  { name: 'Horizon Community College', type: 'Vocational institution', location: 'Nairobi, Kenya', programs: 16, learners: '1,900+', description: 'Career-ready programs for a changing global economy.' },
  { name: 'Eastern School of Data & AI', type: 'Specialist institute', location: 'Kolkata, India', programs: 11, learners: '1,200+', description: 'Focused education for data, artificial intelligence and analytics.' },
]

export const courses = [
  { title: 'Full-Stack Web Development', provider: 'SkillForge Learning', category: 'Software Engineering', level: 'Beginner to Intermediate', duration: '16 weeks', format: 'Online', learners: '2,400+', color: 'blue' },
  { title: 'Applied Data Analytics with Python', provider: 'Eastern School of Data & AI', category: 'Data Science', level: 'Intermediate', duration: '12 weeks', format: 'Hybrid', learners: '980+', color: 'teal' },
  { title: 'Cloud Foundations for Professionals', provider: 'Nimbus Academy', category: 'Cloud Computing', level: 'Beginner', duration: '8 weeks', format: 'Online', learners: '1,760+', color: 'violet' },
  { title: 'Career Communication Studio', provider: 'Akshitha Career Lab', category: 'Professional Development', level: 'All levels', duration: '4 weeks', format: 'Live online', learners: '3,100+', color: 'amber' },
  { title: 'Cybersecurity Essentials', provider: 'Global Tech Institute', category: 'Cybersecurity', level: 'Intermediate', duration: '10 weeks', format: 'Online', learners: '740+', color: 'rose' },
  { title: 'Digital Marketing for Growth Teams', provider: 'Kalam Media Labs', category: 'Digital Marketing', level: 'Beginner', duration: '6 weeks', format: 'Self-paced', learners: '1,280+', color: 'green' },
]

export const internships = [
  { id: 'intern-1', title: 'Product Design Intern', company: 'Nimbus Softworks', location: 'Bengaluru / Hybrid', duration: '6 months', stipend: '₹35,000 / month', category: 'Design' },
  { id: 'intern-2', title: 'Data Analyst Intern', company: 'Pragati Finance Bank', location: 'Mumbai / On-site', duration: '4 months', stipend: '₹28,000 / month', category: 'Data & Analytics' },
  { id: 'intern-3', title: 'Community Partnerships Intern', company: 'Kalam Media Labs', location: 'Remote worldwide', duration: '3 months', stipend: 'Paid fellowship', category: 'Partnerships' },
  { id: 'intern-4', title: 'Cloud Operations Intern', company: 'Northstar Mobility', location: 'Singapore / Remote', duration: '6 months', stipend: 'Competitive', category: 'Technology' },
]

export const events = [
  { id: 'event-1', title: 'Future Skills Hiring Week', date: '18–22 November 2026', location: 'Virtual · Global', type: 'Job fair', description: 'Meet employers, attend portfolio reviews and apply to early-career roles.' },
  { id: 'event-2', title: 'Campus to Career Summit', date: '05 December 2026', location: 'Bengaluru, India', type: 'Summit', description: 'A partnership forum for institutions, employers and placement teams.' },
  { id: 'event-3', title: 'Women in Digital Careers', date: '12 December 2026', location: 'Online', type: 'Career clinic', description: 'Mentorship circles and practical workshops for digital careers.' },
]

export const dashboardMetrics = {
  learner: [{ label: 'Profile completion', value: '78%' }, { label: 'Saved opportunities', value: '12' }, { label: 'Applications', value: '5' }, { label: 'Learning progress', value: '42%' }],
  employer: [{ label: 'Active jobs', value: '18' }, { label: 'Applications', value: '248' }, { label: 'Shortlisted', value: '36' }, { label: 'Campus partners', value: '8' }],
  institution: [{ label: 'Learners connected', value: '4,820' }, { label: 'Active employers', value: '42' }, { label: 'Placement rate', value: '86%' }, { label: 'Live programs', value: '28' }],
  provider: [{ label: 'Published courses', value: '24' }, { label: 'Active learners', value: '3,840' }, { label: 'Completion rate', value: '74%' }, { label: 'Certificates issued', value: '1,920' }],
  admin: [{ label: 'Registered users', value: '28,460' }, { label: 'Organizations', value: '1,240' }, { label: 'Open opportunities', value: '3,180' }, { label: 'Pending reviews', value: '48' }],
}

export const companyIndustries = ['All industries', 'Software & Product', 'Healthcare', 'Banking & Finance', 'Mobility & Logistics', 'Education & Media', 'Manufacturing']
export const institutionTypes = ['All institution types', 'Engineering college', 'Management institute', 'University', 'Training institute', 'Vocational institution', 'Specialist institute']
export const courseCategories = ['All categories', 'Software Engineering', 'Data Science', 'Cloud Computing', 'Professional Development', 'Cybersecurity', 'Digital Marketing']
export const portalStats = [{ label: 'Partner companies', value: '120+' }, { label: 'Institution partners', value: '68' }, { label: 'Career-ready courses', value: '240+' }, { label: 'Countries represented', value: '14' }]
export const demoNotice = 'Demonstration content for the Akshitha Edutech proposal. Connect verified platform data when the backend is ready.'
export const opportunityTypes = ['Jobs', 'Internships', 'Courses', 'Events', 'Institutions']
export const countryOptions = ['India', 'Singapore', 'United Arab Emirates', 'Kenya', 'United Kingdom', 'Remote worldwide']
export const stakeholderLabels = ['Students & professionals', 'Companies & employers', 'Colleges & institutions', 'Course providers']
export const portalNav = [{ label: 'Jobs', href: '/jobs' }, { label: 'Internships', href: '/internships' }, { label: 'Companies', href: '/companies' }, { label: 'Institutions', href: '/institutions' }, { label: 'Courses', href: '/courses' }, { label: 'Events', href: '/job-fairs' }]
