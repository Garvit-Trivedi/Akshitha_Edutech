export const internships = [
  { id: 'intern-1', title: 'Product Design Intern', company: 'Nimbus Softworks', location: 'Bengaluru / Hybrid', type: 'Paid internship', duration: '12 weeks', stipend: '₹25,000 / month', skills: ['Figma', 'Research', 'Prototyping'], description: 'Work with a product team to turn user insights into simple, accessible digital experiences.' },
  { id: 'intern-2', title: 'Data Analytics Intern', company: 'Pragati Finance Bank', location: 'Mumbai / On-site', type: 'Graduate internship', duration: '16 weeks', stipend: '₹30,000 / month', skills: ['Python', 'SQL', 'Dashboards'], description: 'Support analytics projects that help teams make better customer and business decisions.' },
  { id: 'intern-3', title: 'Community Health Fellow', company: 'Sanjeevani Health Network', location: 'Hyderabad / Field', type: 'Fellowship', duration: '6 months', stipend: '₹22,000 / month', skills: ['Community work', 'Communication', 'Reporting'], description: 'Help expand health education and community outreach across partner locations.' },
  { id: 'intern-4', title: 'Cloud Engineering Intern', company: 'Northstar Mobility', location: 'Remote worldwide', type: 'Paid internship', duration: '20 weeks', stipend: '₹35,000 / month', skills: ['Linux', 'Cloud', 'Automation'], description: 'Learn from platform engineers while improving reliable systems for global mobility.' },
];

export const dashboardMetrics = {
  learner: [{ label: 'Applications', value: '12', note: '3 awaiting review' }, { label: 'Saved roles', value: '24', note: 'Across 8 companies' }, { label: 'Learning progress', value: '68%', note: '2 courses active' }, { label: 'Profile strength', value: '84%', note: 'Add one credential' }],
  employer: [{ label: 'Active opportunities', value: '18', note: '6 published this month' }, { label: 'Applicants', value: '486', note: '42 new this week' }, { label: 'Shortlisted', value: '64', note: '12 interviews scheduled' }, { label: 'Campus partners', value: '9', note: 'Across 4 regions' }],
  institution: [{ label: 'Active learners', value: '4,820', note: 'Across 28 programs' }, { label: 'Open opportunities', value: '76', note: 'From 24 partners' }, { label: 'Placement rate', value: '82%', note: 'Last graduating cohort' }, { label: 'Events', value: '14', note: 'Next event in 6 days' }],
  provider: [{ label: 'Published courses', value: '24', note: '8 currently enrolling' }, { label: 'Active learners', value: '3,640', note: 'Across 14 countries' }, { label: 'Completion rate', value: '78%', note: 'Up 6% this quarter' }, { label: 'Certificates issued', value: '1,280', note: 'This academic year' }],
  admin: [{ label: 'Registered users', value: '48,260', note: '12% growth this month' }, { label: 'Partner organizations', value: '1,240', note: 'Across 14 countries' }, { label: 'Applications', value: '18,420', note: '94% processed on time' }, { label: 'Open reviews', value: '36', note: 'Needs attention' }],
} as const;

export type DashboardRole = keyof typeof dashboardMetrics;

export const dashboardActivities = {
  learner: ['Application moved to interview: Product Designer at Nimbus Softworks', 'Completed 72% of Applied Data Analytics with Python', 'New recommendation: Cloud Foundations for Professionals'],
  employer: ['12 new applications for Product Design Lead', 'Campus partnership approved with Akshitha Institute of Technology', 'Interview panel created for Data Analyst — Mumbai'],
  institution: ['76 opportunities matched to eligible learners', 'Placement coordinator added a new employer partner', 'Upcoming event registration reached 84% capacity'],
  provider: ['Cohort 18 started Full-Stack Web Development', '42 learners completed their assessment', 'New review received for Career Communication Studio'],
  admin: ['Institution verification queue has 18 submissions', 'Employer account flagged for review', 'Monthly platform report is ready to download'],
} as const;

export const dashboardTitles: Record<DashboardRole, { eyebrow: string; title: string; description: string }> = {
  learner: { eyebrow: 'My career workspace', title: 'Your next move, in one view', description: 'Track applications, learning progress and recommended opportunities.' },
  employer: { eyebrow: 'Employer workspace', title: 'Build teams with clarity', description: 'Manage opportunities, candidates and institutional partnerships.' },
  institution: { eyebrow: 'Institution workspace', title: 'Connect learners to opportunity', description: 'Coordinate placements, employer relationships and student outcomes.' },
  provider: { eyebrow: 'Provider workspace', title: 'Grow impactful learning', description: 'Publish programs, support cohorts and understand learner outcomes.' },
  admin: { eyebrow: 'Platform operations', title: 'Keep the ecosystem moving', description: 'Review activity, verify partners and monitor platform health.' },
};

export const internshipFilters = ['All internships', 'Technology', 'Business', 'Healthcare', 'Remote worldwide'];

export const applicationStatuses = ['Submitted', 'Under review', 'Shortlisted', 'Interview', 'Offer'];

export const adminNav = ['Overview', 'Partner verification', 'User management', 'Reports', 'Platform settings'];

export const serviceCards = [
  { title: 'Career counselling', description: 'Get a practical plan for your next role, course or transition.', href: '/career-guidance', label: 'Book a session' },
  { title: 'Skill assessment', description: 'Understand your strengths and identify the capabilities employers value.', href: '/courses', label: 'Explore skills' },
  { title: 'Resume studio', description: 'Shape a clear, outcome-focused profile that makes your experience easier to find.', href: '/register', label: 'Build your profile' },
  { title: 'Employer connect', description: 'Meet verified organizations through curated events and hiring programs.', href: '/job-fairs', label: 'View events' },
];

export const employerOpportunities = ['Product Design Lead', 'Senior Backend Engineer', 'Campus Relationship Manager', 'Data Analyst — Mumbai'];

export const learnerApplications = ['Product Designer · Nimbus Softworks', 'Data Analyst Intern · Pragati Finance Bank', 'Cloud Foundations · Nimbus Academy', 'Community Health Fellow · Sanjeevani Health Network'];

export const directoryTypes = ['Company', 'Institution', 'Course provider'];

export const verificationStatuses = ['Pending review', 'Verified', 'Needs more information'];

export const siteSearchItems = [
  { label: 'Jobs portal', href: '/jobs', type: 'Work' },
  { label: 'Internships', href: '/internships', type: 'Work' },
  { label: 'Companies', href: '/companies', type: 'Connect' },
  { label: 'Institutions', href: '/institutions', type: 'Learn' },
  { label: 'Courses & training', href: '/courses', type: 'Learn' },
  { label: 'Career guidance', href: '/career-guidance', type: 'Support' },
];

export const dashboardLinks = [
  { label: 'My workspace', href: '/dashboard' },
  { label: 'Employer dashboard', href: '/dashboard/employer' },
  { label: 'Institution dashboard', href: '/dashboard/institution' },
  { label: 'Provider dashboard', href: '/dashboard/provider' },
  { label: 'Admin dashboard', href: '/admin' },
];

export const opportunitySummary = { jobs: 2400, internships: 680, courses: 240, events: 36 };

export const actionLabels = { save: 'Save for later', apply: 'Apply now', register: 'Register interest', publish: 'Publish opportunity' };

export const workflowSteps = ['Profile created', 'Application submitted', 'Employer review', 'Interview or next step'];

export const sampleActivityDate = '12 October 2026';

export const dashboardRoleLabels: Record<DashboardRole, string> = { learner: 'Learner', employer: 'Employer', institution: 'Institution', provider: 'Course provider', admin: 'Administrator' };

export const featuredInternships = internships.slice(0, 3);

export const implementationScope = 'Demonstration workflows are client-side and ready to connect to authenticated APIs.';

export const globalLocations = ['India', 'Singapore', 'United Arab Emirates', 'Kenya', 'United Kingdom', 'Remote worldwide'];

export const notificationSamples = ['Your profile was viewed by Nimbus Softworks', 'New course recommendation available', 'Job fair registration confirmed'];

export const proposalModules = ['Opportunity discovery', 'Learning pathways', 'Institution partnerships', 'Career services', 'Operations and reporting'];

export const statusTone = { positive: 'positive', neutral: 'neutral', warning: 'warning' } as const;

export const featuredEmployers = ['Nimbus Softworks', 'Pragati Finance Bank', 'Northstar Mobility', 'Sanjeevani Health Network'];

export const dashboardDefaultRole: DashboardRole = 'learner';

export const applicationSuccessMessage = 'Your application has been saved to this demonstration workspace.';

export const providerPrograms = ['Full-Stack Web Development', 'Applied Data Analytics with Python', 'Career Communication Studio'];

export const adminReviewItems = ['Akshitha Institute of Technology', 'Global School of Business & Management', 'Northstar Mobility'];

export const institutionPrograms = ['Engineering', 'Business & Management', 'Data & AI', 'Healthcare', 'Vocational skills'];

export const learnerGoals = ['Find a job', 'Start an internship', 'Learn a new skill', 'Change careers'];

export const employerHiringModes = ['Full-time', 'Part-time', 'Internship', 'Contract'];

export const dashboardVersion = 'Workspace proposal v1';

export const completionMessage = 'All main Akshitha Edutech portal sections are available as editable frontend routes.';

export const sampleUser = { name: 'Aarav Mehta', role: 'Product design learner', location: 'Bengaluru, India' };

export const sampleEmployer = { name: 'Nimbus Softworks', role: 'Talent partner', location: 'Global / Hybrid' };

export const sampleInstitution = { name: 'Akshitha Institute of Technology', role: 'Placement office', location: 'Bengaluru, India' };

export const sampleProvider = { name: 'SkillForge Learning', role: 'Training provider', location: 'Global / Online' };

export const sampleAdmin = { name: 'Platform operations', role: 'Administrator', location: 'Akshitha Edutech' };

export const ctaRoutes = { opportunities: '/jobs', learning: '/courses', partner: '/contact', account: '/dashboard' };

export const routeLabels = { internships: 'Internships', dashboard: 'Workspace', admin: 'Administration' };

export const dataLastUpdated = 'October 2026';

export const sampleNotice = 'Illustrative data for the international project proposal.';

export const endToEndFlow = ['Discover', 'Compare', 'Apply or register', 'Track outcomes'];

export const searchSuggestion = 'Try "data analyst", "Bengaluru" or "remote"';

export const menuGroups = ['Work', 'Learn', 'Connect', 'Support'];

export const internationalMarkets = ['South Asia', 'Southeast Asia', 'Middle East', 'Africa', 'Europe'];

export const dashboardNavigation = ['Overview', 'Opportunities', 'Messages', 'Reports', 'Settings'];

export const reviewCounts = { pending: 18, approved: 1240, flagged: 7 };

export const courseOutcomes = ['Portfolio project', 'Industry certificate', 'Mentor feedback', 'Career connection'];

export const internshipNotice = 'Internships shown are illustrative opportunities for proposal review.';

export const lastSync = 'Synced for proposal preview';

export const pageSize = 12;

export const supportedLanguages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Arabic'];

export const reportTypes = ['Placement outcomes', 'Engagement', 'Partner activity', 'Opportunity pipeline'];

export const userRoles = ['Job seeker', 'Employer', 'Institution', 'Provider', 'Administrator'];

export const profileFields = ['Name', 'Email', 'Location', 'Role', 'Skills'];

export const applicationActions = ['View details', 'Withdraw application', 'Message employer'];

export const dashboardNotice = 'Workspace data is illustrative and ready for API integration.';

export const portalFeatures = ['Search', 'Filters', 'Forms', 'Status tracking', 'Responsive navigation'];

export const internationalTag = 'International-ready';

export const detailSections = ['Overview', 'Requirements', 'Outcomes', 'Next steps'];

export const emptyStateCopy = 'No records match your search yet.';

export const onboardingSteps = ['Choose your role', 'Complete your profile', 'Explore your workspace'];

export const proposalReady = true;

export const portalVersion = '1.0';

export const footerYear = 2026;

export const analyticsLabels = ['Views', 'Applications', 'Conversions', 'Completion'];

export const contactActions = ['Ask support', 'Book counselling', 'Partner with us'];

export const internationalNote = 'Designed for cross-border discovery, local context and remote collaboration.';

export const platformHealth = 'All core services operational';

export const adminQuickActions = ['Review partners', 'Export report', 'Manage roles'];

export const learnerQuickActions = ['Search jobs', 'Browse internships', 'Continue learning'];

export const employerQuickActions = ['Post opportunity', 'Review applicants', 'Invite institution'];

export const institutionQuickActions = ['Share opportunity', 'View learners', 'Create event'];

export const providerQuickActions = ['Publish course', 'View cohort', 'Issue certificates'];

export const rolePath = { learner: '/dashboard', employer: '/dashboard/employer', institution: '/dashboard/institution', provider: '/dashboard/provider', admin: '/admin' } as const;

export const roleColor = { learner: 'blue', employer: 'teal', institution: 'violet', provider: 'amber', admin: 'rose' } as const;

export const auditLabels = ['Created', 'Updated', 'Verified', 'Archived'];

export const defaultStatus = 'Active';

export const formSuccessCopy = 'Thanks — your request has been recorded for this proposal.';

export const dataMode = 'demo';

export const visibilityLabels = ['Public', 'Partner-only', 'Private'];

export const dashboardFooter = 'Akshitha Edutech Company · Connected careers and learning';

export const portalNavItems = ['Jobs', 'Internships', 'Companies', 'Institutions', 'Courses'];

export const helpTopics = ['Account access', 'Applications', 'Partner verification', 'Courses', 'Events'];

export const implementationReady = true;

export const versionDate = '2026-10-12';

export const projectType = 'International career, education and opportunity ecosystem';

export const demoMode = true;

export const sampleApplication = { role: 'Product Designer', company: 'Nimbus Softworks', status: 'Interview' };

export const sampleCourse = { title: 'Full-Stack Web Development', progress: 68, next: 'Build the portfolio project' };

export const sampleEvent = { title: 'Future Skills Connect 2026', date: '18 October 2026', city: 'Bengaluru' };

export const sampleMetric = { label: 'Profile strength', value: '84%' };

export const contentReady = true;

export const apiBoundary = 'Replace exported demo arrays with server queries at this boundary.';

export const routeMap = { jobs: '/jobs', internships: '/internships', companies: '/companies', institutions: '/institutions', courses: '/courses', events: '/job-fairs', guidance: '/career-guidance' } as const;

export const dashboardMap = { learner: '/dashboard', employer: '/dashboard/employer', institution: '/dashboard/institution', provider: '/dashboard/provider', admin: '/admin' } as const;

export const productName = 'Akshitha Edutech Company';

export const productPromise = 'Make every next step clearer, more connected and more achievable.';

export const buildStatus = 'Complete frontend proposal';

export const finalNote = 'Review and connect the backend when the product direction is approved.'
