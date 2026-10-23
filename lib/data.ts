/*
  Sample content for the Akshitha Edutech Company website.
  Replace these arrays with API calls when you connect a backend.
*/

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote'

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: JobType
  category: string
  experience: string
  salary: string
  postedDaysAgo: number
  openings: number
  skills: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const jobCategories = [
  { name: 'Information Technology', slug: 'Information Technology', count: 1240 },
  { name: 'Healthcare', slug: 'Healthcare', count: 860 },
  { name: 'Banking & Finance', slug: 'Banking & Finance', count: 715 },
  { name: 'Manufacturing', slug: 'Manufacturing', count: 640 },
  { name: 'Education', slug: 'Education', count: 530 },
  { name: 'Retail & Sales', slug: 'Retail & Sales', count: 980 },
  { name: 'Logistics', slug: 'Logistics', count: 420 },
  { name: 'Hospitality', slug: 'Hospitality', count: 375 },
] as const

export const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']

export const locations = [
  'Bengaluru',
  'Mumbai',
  'New Delhi',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Remote',
]

export const jobs: Job[] = [
  {
    id: 'frontend-developer-nimbus',
    title: 'Frontend Developer',
    company: 'Nimbus Softworks',
    location: 'Bengaluru',
    type: 'Full-time',
    category: 'Information Technology',
    experience: '2–4 years',
    salary: '₹8 – 14 LPA',
    postedDaysAgo: 1,
    openings: 3,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    description:
      'Join our product team to build fast, accessible web interfaces used by millions of customers across India.',
    responsibilities: [
      'Build reusable UI components with React and TypeScript',
      'Collaborate with designers to deliver pixel-perfect interfaces',
      'Improve performance and accessibility of existing pages',
    ],
    requirements: [
      '2+ years of experience with React',
      'Strong understanding of HTML, CSS and JavaScript',
      'Familiarity with REST APIs and Git',
    ],
  },
  {
    id: 'staff-nurse-sanjeevani',
    title: 'Staff Nurse',
    company: 'Sanjeevani Hospitals',
    location: 'Hyderabad',
    type: 'Full-time',
    category: 'Healthcare',
    experience: '1–3 years',
    salary: '₹3.6 – 5 LPA',
    postedDaysAgo: 2,
    openings: 12,
    skills: ['Patient Care', 'ICU', 'BSc Nursing'],
    description:
      'We are hiring compassionate staff nurses for our multi-speciality hospital with rotational shifts.',
    responsibilities: [
      'Provide direct patient care and monitor vitals',
      'Administer medication as prescribed',
      'Maintain accurate patient records',
    ],
    requirements: ['BSc / GNM Nursing', 'Valid nursing council registration', 'Good communication skills'],
  },
  {
    id: 'relationship-manager-pragati',
    title: 'Relationship Manager',
    company: 'Pragati Finance Bank',
    location: 'Mumbai',
    type: 'Full-time',
    category: 'Banking & Finance',
    experience: '3–6 years',
    salary: '₹6 – 10 LPA',
    postedDaysAgo: 3,
    openings: 5,
    skills: ['Sales', 'Customer Relations', 'Wealth Products'],
    description:
      'Manage a portfolio of high-value clients and grow relationships through tailored banking solutions.',
    responsibilities: [
      'Acquire and retain high net-worth clients',
      'Cross-sell banking and investment products',
      'Achieve monthly business targets',
    ],
    requirements: ['Graduate / MBA preferred', '3+ years in banking sales', 'Strong client network'],
  },
  {
    id: 'production-supervisor-veerabhadra',
    title: 'Production Supervisor',
    company: 'Veerabhadra Industries',
    location: 'Pune',
    type: 'Full-time',
    category: 'Manufacturing',
    experience: '4–8 years',
    salary: '₹5 – 8 LPA',
    postedDaysAgo: 5,
    openings: 2,
    skills: ['Lean', 'Shop Floor', 'Quality Control'],
    description:
      'Lead shop floor operations for our automotive components plant, ensuring safety, quality and output.',
    responsibilities: [
      'Supervise production teams across shifts',
      'Ensure adherence to quality and safety norms',
      'Drive continuous improvement initiatives',
    ],
    requirements: ['Diploma / BE in Mechanical', '4+ years in manufacturing', 'Knowledge of 5S and Kaizen'],
  },
  {
    id: 'mathematics-teacher-vidya',
    title: 'Mathematics Teacher (TGT)',
    company: 'Vidya Bharati Public School',
    location: 'Jaipur',
    type: 'Full-time',
    category: 'Education',
    experience: '2–5 years',
    salary: '₹3 – 4.8 LPA',
    postedDaysAgo: 4,
    openings: 1,
    skills: ['CBSE', 'Classroom Management', 'B.Ed'],
    description: 'Teach mathematics to classes 6–10 following the CBSE curriculum with engaging methods.',
    responsibilities: [
      'Plan and deliver lessons for middle and secondary classes',
      'Assess student progress and give feedback',
      'Participate in school events and parent meetings',
    ],
    requirements: ['B.Sc + B.Ed', 'CTET qualified preferred', 'Fluency in English and Hindi'],
  },
  {
    id: 'store-manager-kirana',
    title: 'Store Manager',
    company: 'Kirana Mart Retail',
    location: 'Chennai',
    type: 'Full-time',
    category: 'Retail & Sales',
    experience: '3–5 years',
    salary: '₹4 – 6 LPA',
    postedDaysAgo: 6,
    openings: 4,
    skills: ['Inventory', 'Team Leadership', 'Merchandising'],
    description: 'Run day-to-day operations of a busy supermarket store and lead a team of 20+ associates.',
    responsibilities: [
      'Manage store staff, rosters and training',
      'Oversee inventory, ordering and shrinkage',
      'Deliver an excellent customer experience',
    ],
    requirements: ['Graduate in any discipline', '3+ years in retail operations', 'Tamil language preferred'],
  },
  {
    id: 'warehouse-executive-gatishakti',
    title: 'Warehouse Executive',
    company: 'GatiShakti Logistics',
    location: 'Ahmedabad',
    type: 'Contract',
    category: 'Logistics',
    experience: '0–2 years',
    salary: '₹2.4 – 3.2 LPA',
    postedDaysAgo: 2,
    openings: 15,
    skills: ['WMS', 'MS Excel', 'Dispatch'],
    description: 'Handle inbound, outbound and stock reconciliation at our regional fulfilment centre.',
    responsibilities: [
      'Record inward and outward stock movements',
      'Coordinate with transport teams for dispatch',
      'Maintain warehouse hygiene and safety',
    ],
    requirements: ['12th pass or graduate', 'Basic computer knowledge', 'Willing to work in shifts'],
  },
  {
    id: 'front-office-executive-aranya',
    title: 'Front Office Executive',
    company: 'Aranya Hotels & Resorts',
    location: 'New Delhi',
    type: 'Full-time',
    category: 'Hospitality',
    experience: '1–3 years',
    salary: '₹2.8 – 4 LPA',
    postedDaysAgo: 7,
    openings: 3,
    skills: ['Guest Relations', 'Opera PMS', 'Communication'],
    description: 'Be the first point of contact for our guests at a premium business hotel in central Delhi.',
    responsibilities: [
      'Manage check-ins, check-outs and reservations',
      'Resolve guest queries and complaints',
      'Coordinate with housekeeping and concierge',
    ],
    requirements: ['Hotel management diploma / degree', 'Pleasant personality', 'Good spoken English'],
  },
  {
    id: 'data-analyst-intern-nimbus',
    title: 'Data Analyst Intern',
    company: 'Nimbus Softworks',
    location: 'Remote',
    type: 'Internship',
    category: 'Information Technology',
    experience: 'Fresher',
    salary: '₹15,000 / month',
    postedDaysAgo: 1,
    openings: 6,
    skills: ['SQL', 'Python', 'Power BI'],
    description: 'A 6-month paid internship working with real business data alongside our analytics team.',
    responsibilities: [
      'Clean and analyse datasets using SQL and Python',
      'Build dashboards for business teams',
      'Present insights in weekly reviews',
    ],
    requirements: ['Final year student or recent graduate', 'Basic SQL knowledge', 'Curious and analytical mindset'],
  },
  {
    id: 'content-writer-kalam',
    title: 'Content Writer (Hindi & English)',
    company: 'Kalam Media Labs',
    location: 'Remote',
    type: 'Part-time',
    category: 'Education',
    experience: '1–3 years',
    salary: '₹20,000 – 30,000 / month',
    postedDaysAgo: 3,
    openings: 2,
    skills: ['Copywriting', 'SEO', 'Hindi'],
    description: 'Write educational articles and learning material in Hindi and English for our e-learning app.',
    responsibilities: ['Write and edit 4–6 articles per week', 'Research topics thoroughly', 'Follow SEO guidelines'],
    requirements: ['Excellent written Hindi and English', 'Portfolio of published work', 'Ability to meet deadlines'],
  },
  {
    id: 'accounts-executive-pragati',
    title: 'Accounts Executive',
    company: 'Pragati Finance Bank',
    location: 'Kolkata',
    type: 'Full-time',
    category: 'Banking & Finance',
    experience: '1–3 years',
    salary: '₹3 – 4.5 LPA',
    postedDaysAgo: 8,
    openings: 2,
    skills: ['Tally', 'GST', 'Reconciliation'],
    description: 'Support the finance team with day-to-day accounting, GST filings and reconciliations.',
    responsibilities: ['Maintain ledgers and journal entries', 'Prepare GST returns', 'Assist in monthly closing'],
    requirements: ['B.Com / M.Com', 'Working knowledge of Tally ERP', 'Attention to detail'],
  },
  {
    id: 'backend-engineer-codekul',
    title: 'Backend Engineer (Node.js)',
    company: 'Codekul Technologies',
    location: 'Hyderabad',
    type: 'Full-time',
    category: 'Information Technology',
    experience: '3–6 years',
    salary: '₹12 – 20 LPA',
    postedDaysAgo: 2,
    openings: 4,
    skills: ['Node.js', 'PostgreSQL', 'AWS'],
    description: 'Design and scale APIs that power our fintech platform serving 5 million users.',
    responsibilities: ['Design REST and event-driven services', 'Own database schema and performance', 'Mentor junior engineers'],
    requirements: ['3+ years with Node.js', 'Strong SQL skills', 'Experience with cloud infrastructure'],
  },
]

export const stats = [
  { label: 'Active Vacancies', value: '2.4 Lakh+' },
  { label: 'Registered Job Seekers', value: '18 Lakh+' },
  { label: 'Verified Employers', value: '42,000+' },
  { label: 'Career Counsellors', value: '1,200+' },
]

export const employers = [
  { name: 'Nimbus Softworks', industry: 'Information Technology', openings: 48, city: 'Bengaluru' },
  { name: 'Sanjeevani Hospitals', industry: 'Healthcare', openings: 36, city: 'Hyderabad' },
  { name: 'Pragati Finance Bank', industry: 'Banking & Finance', openings: 29, city: 'Mumbai' },
  { name: 'Veerabhadra Industries', industry: 'Manufacturing', openings: 22, city: 'Pune' },
  { name: 'GatiShakti Logistics', industry: 'Logistics', openings: 54, city: 'Ahmedabad' },
  { name: 'Aranya Hotels & Resorts', industry: 'Hospitality', openings: 18, city: 'New Delhi' },
  { name: 'Kirana Mart Retail', industry: 'Retail & Sales', openings: 41, city: 'Chennai' },
  { name: 'Codekul Technologies', industry: 'Information Technology', openings: 17, city: 'Hyderabad' },
]

export const jobFairs = [
  {
    id: 'bengaluru-tech-fair',
    title: 'Bengaluru Tech Hiring Fair',
    date: '2026-10-24',
    city: 'Bengaluru',
    venue: 'Palace Grounds, Gate 4',
    employers: 85,
    vacancies: 3200,
    mode: 'In-person',
  },
  {
    id: 'healthcare-mega-drive',
    title: 'Healthcare Mega Recruitment Drive',
    date: '2026-11-02',
    city: 'Hyderabad',
    venue: 'HITEX Exhibition Centre',
    employers: 40,
    vacancies: 1500,
    mode: 'In-person',
  },
  {
    id: 'virtual-freshers-fair',
    title: 'National Virtual Freshers Fair',
    date: '2026-11-15',
    city: 'Online',
    venue: 'Akshitha Edutech Virtual Hall',
    employers: 120,
    vacancies: 6000,
    mode: 'Virtual',
  },
  {
    id: 'manufacturing-skills-fair',
    title: 'Manufacturing & Skills Fair',
    date: '2026-12-05',
    city: 'Pune',
    venue: 'Auto Cluster Exhibition Hall',
    employers: 55,
    vacancies: 2100,
    mode: 'In-person',
  },
]

export const testimonials = [
  {
    name: 'Priya Raghavan',
    role: 'Frontend Developer, Bengaluru',
    quote:
      'I registered on a Sunday and had three interview calls by Wednesday. The career counselling session helped me prepare with confidence.',
  },
  {
    name: 'Arjun Mehta',
    role: 'HR Head, GatiShakti Logistics',
    quote:
      'We hired 60 warehouse staff in one month through the job fair and the verified candidate pool. It saved our team weeks of effort.',
  },
  {
    name: 'Fatima Sheikh',
    role: 'Staff Nurse, Hyderabad',
    quote:
      'The job alerts were relevant to my qualification and location. I found a hospital close to home with better pay.',
  },
]

export const careerResources = [
  {
    title: 'Writing a Resume That Gets Shortlisted',
    category: 'Resume',
    readTime: '6 min read',
    excerpt: 'A step-by-step guide to structuring your resume, choosing keywords, and highlighting achievements.',
  },
  {
    title: 'Top 25 Interview Questions and How to Answer',
    category: 'Interview',
    readTime: '10 min read',
    excerpt: 'Prepare for common HR and technical questions with sample answers and practical tips.',
  },
  {
    title: 'Choosing a Career After 12th',
    category: 'Career Paths',
    readTime: '8 min read',
    excerpt: 'Explore streams, courses and career options in science, commerce, arts and vocational fields.',
  },
  {
    title: 'In-Demand Skills for 2027',
    category: 'Skills',
    readTime: '5 min read',
    excerpt: 'From data analysis to healthcare tech, discover skills employers are actively hiring for.',
  },
  {
    title: 'Negotiating Your First Salary',
    category: 'Interview',
    readTime: '4 min read',
    excerpt: 'Learn how to research pay ranges and confidently discuss your offer with employers.',
  },
  {
    title: 'Government Skill Programs Explained',
    category: 'Skills',
    readTime: '7 min read',
    excerpt: 'A simple overview of free and subsidised skill development programs you can enrol in.',
  },
]

export const faqs = [
  {
    q: 'Is registration free for job seekers?',
    a: 'Yes. Registering, searching jobs, applying, and attending counselling sessions is completely free for job seekers.',
  },
  {
    q: 'How do employers get verified?',
    a: 'Employers submit their company registration and GST details. Our team verifies documents within 2 working days.',
  },
  {
    q: 'Can I attend a job fair online?',
    a: 'Yes. Many of our job fairs are virtual. Register for the fair and join from any device using the link sent to your email.',
  },
  {
    q: 'How do I book a career counselling session?',
    a: 'Visit the Career Guidance page and choose "Book a Session". Pick a counsellor, date and time that suits you.',
  },
]

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id)
}

export const companies = [
  { name: 'Nimbus Softworks', industry: 'Technology & Product', location: 'Bengaluru, India', openings: 48, description: 'Building accessible digital products for a connected world.', featured: true },
  { name: 'Sanjeevani Health Network', industry: 'Healthcare', location: 'Hyderabad, India', openings: 36, description: 'Delivering compassionate care through modern clinical teams.', featured: true },
  { name: 'Pragati Finance Group', industry: 'Banking & Finance', location: 'Mumbai, India', openings: 29, description: 'Creating inclusive financial solutions for growing communities.', featured: true },
  { name: 'Northstar Global Mobility', industry: 'International Services', location: 'Dubai · Singapore · London', openings: 22, description: 'Connecting skilled professionals with global opportunities.', featured: false },
  { name: 'Veerabhadra Industries', industry: 'Advanced Manufacturing', location: 'Pune, India', openings: 22, description: 'Engineering the next generation of responsible manufacturing.', featured: false },
  { name: 'Aranya Hospitality Group', industry: 'Hospitality & Travel', location: 'New Delhi, India', openings: 18, description: 'Creating memorable guest experiences across the region.', featured: false },
] as const

export const institutions = [
  { name: 'Akshita Institute of Technology', type: 'University', location: 'Bengaluru, Karnataka', programs: 42, focus: 'Engineering, computing and applied innovation', badge: 'Featured' },
  { name: 'National School of Business', type: 'Business School', location: 'Mumbai, Maharashtra', programs: 18, focus: 'Leadership, finance and entrepreneurship', badge: 'Verified' },
  { name: 'Sanjeevani College of Health Sciences', type: 'College', location: 'Hyderabad, Telangana', programs: 26, focus: 'Nursing, allied health and clinical practice', badge: 'Verified' },
  { name: 'Global Skills Academy', type: 'Training Partner', location: 'Online · India', programs: 64, focus: 'Job-ready technology and professional skills', badge: 'International' },
  { name: 'Kalam School of Design', type: 'Institute', location: 'New Delhi, India', programs: 12, focus: 'Design, media and creative technology', badge: 'Verified' },
  { name: 'Akshitha Edutech Open Learning', type: 'Learning Network', location: 'Online · Worldwide', programs: 80, focus: 'Flexible learning for every career stage', badge: 'International' },
] as const

export const courses = [
  { title: 'Full-Stack Web Development', provider: 'Nimbus Learning Lab', category: 'Technology', level: 'Intermediate', duration: '16 weeks', learners: '12,400+', format: 'Online', accent: 'sky' },
  { title: 'Data Analytics with Python', provider: 'Global Skills Academy', category: 'Technology', level: 'Beginner', duration: '10 weeks', learners: '8,900+', format: 'Online', accent: 'violet' },
  { title: 'Healthcare Operations & Patient Care', provider: 'Sanjeevani College', category: 'Healthcare', level: 'Professional', duration: '12 weeks', learners: '5,200+', format: 'Hybrid', accent: 'emerald' },
  { title: 'Leadership for Emerging Managers', provider: 'National School of Business', category: 'Business', level: 'Intermediate', duration: '8 weeks', learners: '4,700+', format: 'Online', accent: 'amber' },
  { title: 'English for Global Careers', provider: 'Akshitha Edutech Open Learning', category: 'Communication', level: 'All levels', duration: '6 weeks', learners: '15,800+', format: 'Online', accent: 'rose' },
  { title: 'Sustainable Manufacturing Foundations', provider: 'Veerabhadra Academy', category: 'Manufacturing', level: 'Professional', duration: '14 weeks', learners: '2,100+', format: 'Hybrid', accent: 'teal' },
] as const

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
