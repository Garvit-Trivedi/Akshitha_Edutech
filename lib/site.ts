export const siteConfig = {
  name: 'Akshitha Edutech',
  shortName: 'Akshitha Edutech',
  tagline: 'Connecting talent with opportunity across India',
  description:
    'Akshitha Edutech is a career services platform that helps job seekers find jobs, employers hire talent, and everyone access career guidance, skill programs, and job fairs.',
  contact: {
    email: 'support@akshithaedutech.example',
    phone: '1800-000-0000',
    address: '4th Floor, Akshita Towers, MG Road, Bengaluru, Karnataka 560001',
    hours: 'Mon – Sat, 9:00 AM – 6:00 PM',
  },
}

export const mainNav = [
  { label: 'Find Jobs', href: '/jobs', menuKey: 'jobseekers' },
  { label: 'Companies', href: '/companies', menuKey: 'companies' },
  { label: 'Institutions', href: '/institutions', menuKey: 'institutions' },
  { label: 'Courses', href: '/courses', menuKey: 'courses' },
  { label: 'Employers', href: '/employers', menuKey: 'employers' },
  { label: 'Career Guidance', href: '/career-guidance', menuKey: 'guidance' },
  { label: 'Job Fairs', href: '/job-fairs', menuKey: 'events' },
]

export const megaMenus = {
  jobseekers: [
    { title: 'Get Started', links: [{ label: 'Create your profile', href: '/register?role=jobseeker' }, { label: 'Sign in to your account', href: '/login' }, { label: 'How Akshitha Edutech works', href: '/about' }] },
    { title: 'Find Opportunities', links: [{ label: 'Domestic Jobs', href: '/jobs#domestic' }, { label: 'International Jobs', href: '/jobs#international' }, { label: 'Classified Jobs', href: '/jobs#classified' }, { label: 'RA-International Jobs', href: '/jobs#ra-international' }] },
    { title: 'Grow Your Career', links: [{ label: 'Career guidance', href: '/career-guidance' }, { label: 'Counselling request', href: '/career-guidance#counselling' }, { label: 'Skill-building resources', href: '/career-guidance#resources' }] },
  ],
  companies: [
    { title: 'Explore Companies', links: [{ label: 'Browse verified companies', href: '/companies' }, { label: 'Top hiring partners', href: '/companies#featured' }, { label: 'International employers', href: '/companies#international' }] },
    { title: 'Company Opportunities', links: [{ label: 'Open roles by company', href: '/jobs' }, { label: 'Internships', href: '/courses' }, { label: 'Company job fairs', href: '/job-fairs' }] },
    { title: 'For Organizations', links: [{ label: 'List your company', href: '/employers#post-job' }, { label: 'Build your talent brand', href: '/contact' }] },
  ],
  institutions: [
    { title: 'Find Institutions', links: [{ label: 'Browse institutions', href: '/institutions' }, { label: 'Universities & colleges', href: '/institutions#universities' }, { label: 'Training partners', href: '/institutions#training' }] },
    { title: 'Student Services', links: [{ label: 'Explore courses', href: '/courses' }, { label: 'Career pathways', href: '/career-guidance' }, { label: 'Institution events', href: '/job-fairs' }] },
    { title: 'Partner With Us', links: [{ label: 'Register an institution', href: '/contact' }, { label: 'Become a skills partner', href: '/contact' }] },
  ],
  courses: [
    { title: 'Learn & Grow', links: [{ label: 'Browse all courses', href: '/courses' }, { label: 'Technology courses', href: '/courses#technology' }, { label: 'Business courses', href: '/courses#business' }] },
    { title: 'Career Outcomes', links: [{ label: 'Certificate programs', href: '/courses#certificates' }, { label: 'Job-ready learning', href: '/courses#job-ready' }, { label: 'Free resources', href: '/career-guidance#resources' }] },
    { title: 'For Institutions', links: [{ label: 'Publish a course', href: '/contact' }, { label: 'Partner with Akshitha Edutech', href: '/contact' }] },
  ],
  employers: [
    { title: 'Hire With Confidence', links: [{ label: 'Post a new opportunity', href: '/employers#post-job' }, { label: 'Employer registration', href: '/register?role=employer' }, { label: 'Employer login', href: '/login' }] },
    { title: 'Recruitment Support', links: [{ label: 'Hiring solutions', href: '/employers' }, { label: 'Find skilled candidates', href: '/jobs' }, { label: 'Host a job fair', href: '/job-fairs' }] },
    { title: 'Employer Resources', links: [{ label: 'Responsible hiring guide', href: '/about' }, { label: 'Contact our team', href: '/contact' }] },
  ],
  guidance: [
    { title: 'Career Planning', links: [{ label: 'Book career counselling', href: '/career-guidance#counselling' }, { label: 'Explore career paths', href: '/career-guidance' }, { label: 'Skills assessment', href: '/career-guidance#resources' }] },
    { title: 'Learning & Skills', links: [{ label: 'Training resources', href: '/career-guidance#resources' }, { label: 'Interview preparation', href: '/career-guidance#resources' }, { label: 'AI Resume Building', href: '/career-guidance#ai-resume' }] },
    { title: 'Support', links: [{ label: 'Admin', href: '/career-guidance' }, { label: 'Ask a question', href: '/contact' }] },
  ],
  events: [
    { title: 'Discover Events', links: [{ label: 'View upcoming job fairs', href: '/job-fairs' }, { label: 'Register for an event', href: '/job-fairs' }] },
    { title: 'For Employers', links: [{ label: 'Create a job fair', href: '/employers' }, { label: 'Meet local talent', href: '/job-fairs' }] },
    { title: 'Stay Connected', links: [{ label: 'Contact the events team', href: '/contact' }, { label: 'List of model career centers', href: '/career-guidance#career-centers' }] },
  ],
} as const

export type MegaMenuKey = keyof typeof megaMenus

export const footerNav = [
  {
    title: 'For Job Seekers',
    links: [
      { label: 'Search Jobs', href: '/jobs' },
      { label: 'Register as Job Seeker', href: '/register?role=jobseeker' },
      { label: 'Career Guidance', href: '/career-guidance' },
      { label: 'Upcoming Job Fairs', href: '/job-fairs' },
    ],
  },
  {
    title: 'For Employers',
    links: [
      { label: 'Post a Job', href: '/register?role=employer' },
      { label: 'Hiring Solutions', href: '/employers' },
      { label: 'Host a Job Fair', href: '/job-fairs' },
      { label: 'Employer Login', href: '/login' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help & FAQs', href: '/contact#faq' },
    ],
  },
]
