import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Job } from '../models/Job';
import { JobFair } from '../models/JobFair';
import { normalizeEmail } from '../utils/normalize';

const seedJobs = [
  {
    slug: 'frontend-developer-nimbus',
    title: 'Frontend Developer',
    company: 'Nimbus Softworks',
    location: 'Bengaluru',
    type: 'Full-time' as const,
    category: 'Information Technology',
    experience: '2–4 years',
    salary: '₹8 – 14 LPA',
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
    slug: 'staff-nurse-sanjeevani',
    title: 'Staff Nurse',
    company: 'Sanjeevani Hospitals',
    location: 'Hyderabad',
    type: 'Full-time' as const,
    category: 'Healthcare',
    experience: '1–3 years',
    salary: '₹3.6 – 5 LPA',
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
    slug: 'relationship-manager-pragati',
    title: 'Relationship Manager',
    company: 'Pragati Finance Bank',
    location: 'Mumbai',
    type: 'Full-time' as const,
    category: 'Banking & Finance',
    experience: '3–6 years',
    salary: '₹6 – 10 LPA',
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
    slug: 'production-supervisor-veerabhadra',
    title: 'Production Supervisor',
    company: 'Veerabhadra Industries',
    location: 'Pune',
    type: 'Full-time' as const,
    category: 'Manufacturing',
    experience: '4–8 years',
    salary: '₹5 – 8 LPA',
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
    slug: 'mathematics-teacher-vidya',
    title: 'Mathematics Teacher (TGT)',
    company: 'Vidya Bharati Public School',
    location: 'Jaipur',
    type: 'Full-time' as const,
    category: 'Education',
    experience: '2–5 years',
    salary: '₹3 – 4.8 LPA',
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
    slug: 'data-analyst-intern-nimbus',
    title: 'Data Analyst Intern',
    company: 'Nimbus Softworks',
    location: 'Remote',
    type: 'Internship' as const,
    category: 'Information Technology',
    experience: 'Fresher',
    salary: '₹15,000 / month',
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
    slug: 'backend-engineer-codekul',
    title: 'Backend Engineer (Node.js)',
    company: 'Codekul Technologies',
    location: 'Hyderabad',
    type: 'Full-time' as const,
    category: 'Information Technology',
    experience: '3–6 years',
    salary: '₹12 – 20 LPA',
    openings: 4,
    skills: ['Node.js', 'PostgreSQL', 'AWS'],
    description: 'Design and scale APIs that power our fintech platform serving 5 million users.',
    responsibilities: ['Design REST and event-driven services', 'Own database schema and performance', 'Mentor junior engineers'],
    requirements: ['3+ years with Node.js', 'Strong SQL skills', 'Experience with cloud infrastructure'],
  },
];

const seedFairs = [
  {
    slug: 'bengaluru-tech-fair',
    title: 'Bengaluru Tech Hiring Fair',
    date: '2026-11-24',
    city: 'Bengaluru',
    venue: 'Palace Grounds, Gate 4',
    employers: 85,
    vacancies: 3200,
    mode: 'In-person' as const,
    description: 'Premier technology hiring summit connecting tech giants and funded startups with top software engineers.',
  },
  {
    slug: 'healthcare-mega-drive',
    title: 'Healthcare Mega Recruitment Drive',
    date: '2026-12-02',
    city: 'Hyderabad',
    venue: 'HITEX Exhibition Centre',
    employers: 40,
    vacancies: 1500,
    mode: 'In-person' as const,
    description: 'Mass recruitment drive for nurses, lab technicians, pharmacists, and medical officers.',
  },
  {
    slug: 'virtual-freshers-fair',
    title: 'National Virtual Freshers Fair',
    date: '2026-12-15',
    city: 'Online',
    venue: 'Akshitha Edutech Virtual Hall',
    employers: 120,
    vacancies: 6000,
    mode: 'Virtual' as const,
    description: 'Nationwide online drive targeting graduates from engineering, arts, and commerce colleges.',
  },
  {
    slug: 'manufacturing-skills-fair',
    title: 'Manufacturing & Skills Fair',
    date: '2027-01-05',
    city: 'Pune',
    venue: 'Auto Cluster Exhibition Hall',
    employers: 55,
    vacancies: 2100,
    mode: 'In-person' as const,
    description: 'Dedicated recruitment fair for mechanical engineers, CNC operators, and technicians.',
  },
];

async function seed() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Ensuring sample employer user exists...');
    const employerEmail = normalizeEmail('employer@nimbus.example');
    let employer = await User.findOne({ email: employerEmail });
    if (!employer) {
      employer = new User({
        name: 'Nimbus Softworks HR',
        email: employerEmail,
        phone: '9876543211',
        password: 'EmployerSecurePass123!',
        role: 'employer',
        isVerified: true,
      });
      await employer.save();
    }

    console.log('[Seed] Ensuring sample candidate/jobseeker user exists...');
    const candidateEmail = normalizeEmail('candidate@akshithaedutech.example');
    let candidate = await User.findOne({ email: candidateEmail });
    if (!candidate) {
      candidate = new User({
        name: 'Rahul Sharma (Candidate)',
        email: candidateEmail,
        phone: '9876543222',
        password: 'CandidatePass123!',
        role: 'jobseeker',
        isVerified: true,
      });
      await candidate.save();
    }

    console.log('[Seed] Ensuring verified Company profiles exist...');
    await Company.collection.dropIndex('owner_1').catch(() => {});
    const companyNames = [
      'Nimbus Softworks',
      'Sanjeevani Hospitals',
      'Pragati Finance Bank',
      'Veerabhadra Industries',
      'Codekul Technologies',
      'GatiShakti Logistics',
    ];

    for (const compName of companyNames) {
      const existingComp = await Company.findOne({ name: compName });
      if (!existingComp) {
        await Company.create({
          name: compName,
          type: 'Enterprise Partner',
          industry: compName.includes('Health') ? 'Healthcare' : compName.includes('Bank') ? 'Banking & Finance' : 'Information Technology',
          location: 'India',
          openings: 15,
          description: `${compName} is a verified hiring partner on Akshitha Edutech platform.`,
          owner: employer._id,
          isVerified: true,
        });
      }
    }

    console.log('[Seed] Seeding job listings...');
    for (const jobData of seedJobs) {
      const existingJob = await Job.findOne({ slug: jobData.slug });
      if (!existingJob) {
        await Job.create({
          ...jobData,
          owner: employer._id,
          status: 'active',
        });
      }
    }

    console.log('[Seed] Seeding job fairs...');
    for (const fairData of seedFairs) {
      const existingFair = await JobFair.findOne({ slug: fairData.slug });
      if (!existingFair) {
        await JobFair.create(fairData);
      }
    }

    console.log('====================================================');
    console.log('✅ Database seeded successfully with initial data!');
    console.log('====================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Fatal Error] Failed to seed database:', error);
    process.exit(1);
  }
}

seed();
