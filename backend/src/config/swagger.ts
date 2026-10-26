export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Akshitha Edutech REST API',
    version: '1.0.0',
    description: `
**Akshitha Edutech API Documentation & Interactive API Tester**

This interactive Swagger UI allows you to test all backend endpoints directly from your browser.

### 🔑 Authentication Instructions
1. Call **\`POST /api/v1/auth/login\`** with your credentials (e.g. administrator or registered account).
2. Copy the \`token\` value returned in the response \`data.token\`.
3. Click the green **Authorize 🔓** button at the top right of this page.
4. Enter your token in the **bearerAuth** field as \`Bearer <your_token>\` or simply \`<your_token>\`.
5. Now all protected endpoints will automatically include your authorization header!
    `,
    contact: {
      name: 'Akshitha Edutech Support',
      email: 'support@akshithaedutech.example',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
    {
      url: 'https://akshitha-edutech.onrender.com',
      description: 'Production Cloud Server (Render)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token retrieved from /api/v1/auth/login',
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: 'HTTP-only authentication cookie',
      },
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'An error occurred processing the request' },
          errors: {
            type: 'object',
            additionalProperties: { type: 'string' },
            example: { email: 'Invalid email address' },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '6adaf030e5a75fdbebb4706f' },
          name: { type: 'string', example: 'Priya Sharma' },
          email: { type: 'string', example: 'priya.sharma@example.com' },
          phone: { type: 'string', example: '+91 98765 43210' },
          role: { type: 'string', enum: ['jobseeker', 'employer', 'admin'], example: 'jobseeker' },
          isVerified: { type: 'boolean', example: true },
          company: { type: 'string', nullable: true },
        },
      },
      Job: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'frontend-developer-nimbus' },
          title: { type: 'string', example: 'Frontend Developer' },
          company: { type: 'string', example: 'Nimbus Softworks' },
          location: { type: 'string', example: 'Bengaluru' },
          type: { type: 'string', example: 'Full-time' },
          category: { type: 'string', example: 'Information Technology' },
          experience: { type: 'string', example: '2–4 years' },
          salary: { type: 'string', example: '₹8 – 14 LPA' },
          openings: { type: 'number', example: 3 },
          skills: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'TypeScript', 'Tailwind CSS'],
          },
          description: { type: 'string', example: 'Build accessible interfaces for millions of users.' },
          responsibilities: {
            type: 'array',
            items: { type: 'string' },
            example: ['Build reusable UI components', 'Optimize web performance'],
          },
          requirements: {
            type: 'array',
            items: { type: 'string' },
            example: ['2+ years with React', 'Strong TypeScript skills'],
          },
          status: { type: 'string', enum: ['active', 'closed'], example: 'active' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Application: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6bdaf057d39c5b4a7bff2cee' },
          job: { type: 'string', example: '6adaf056d39c5b4a7bff2cda' },
          applicant: { type: 'string', example: '6adaf030e5a75fdbebb4706f' },
          name: { type: 'string', example: 'Priya Sharma' },
          email: { type: 'string', example: 'priya.sharma@example.com' },
          phone: { type: 'string', example: '+91 98765 43210' },
          coverLetter: { type: 'string', example: 'I am excited to apply for this role...' },
          resumeUrl: { type: 'string', example: '/uploads/resumes/resume-1718000000000.pdf' },
          status: {
            type: 'string',
            enum: ['submitted', 'in_review', 'shortlisted', 'rejected', 'accepted'],
            example: 'submitted',
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Company: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6cdaf057d39c5b4a7bff2caa' },
          name: { type: 'string', example: 'Nimbus Softworks' },
          industry: { type: 'string', example: 'Information Technology' },
          location: { type: 'string', example: 'Bengaluru, Karnataka' },
          website: { type: 'string', example: 'https://nimbussoftworks.example' },
          description: { type: 'string', example: 'Enterprise cloud software solutions.' },
          isVerified: { type: 'boolean', example: true },
        },
      },
      CounsellingRequest: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6ddaf057d39c5b4a7bff2cbb' },
          name: { type: 'string', example: 'Rahul Verma' },
          email: { type: 'string', example: 'rahul.verma@example.com' },
          phone: { type: 'string', example: '9876543210' },
          educationLevel: { type: 'string', example: 'Undergraduate' },
          stream: { type: 'string', example: 'Computer Science' },
          status: { type: 'string', enum: ['pending', 'confirmed', 'completed', 'cancelled'], example: 'pending' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      ContactMessage: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6edaf057d39c5b4a7bff2ccc' },
          name: { type: 'string', example: 'Sunita Rao' },
          email: { type: 'string', example: 'sunita@example.com' },
          phone: { type: 'string', example: '9876543210' },
          subject: { type: 'string', example: 'Partnership Inquiry' },
          message: { type: 'string', example: 'We would like to partner with Akshitha Edutech for hiring.' },
          status: { type: 'string', enum: ['unread', 'read', 'resolved'], example: 'unread' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      JobFair: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6fdaf057d39c5b4a7bff2cdd' },
          title: { type: 'string', example: 'Bengaluru Tech & Innovation Career Fair' },
          type: { type: 'string', enum: ['in-person', 'virtual', 'hybrid'], example: 'in-person' },
          date: { type: 'string', example: '2026-11-15' },
          time: { type: 'string', example: '10:00 AM – 5:00 PM' },
          location: { type: 'string', example: 'Palace Grounds, Bengaluru' },
          companiesCount: { type: 'number', example: 45 },
          openingsCount: { type: 'number', example: 1200 },
          status: { type: 'string', enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], example: 'upcoming' },
        },
      },
    },
  },
  paths: {
    '/': {
      get: {
        summary: 'Root Server & Health Status',
        tags: ['System'],
        description: 'Returns API server health status, version, and quick endpoints.',
        responses: {
          200: {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    service: { type: 'string', example: 'Akshitha Edutech API Server' },
                    message: { type: 'string', example: 'API server is live and healthy' },
                    version: { type: 'string', example: '1.0.0' },
                    apiBase: { type: 'string', example: '/api/v1' },
                  },
                },
              },
            },
          },
        },
      },
    },

    /* =========================================================================
       1. AUTHENTICATION
       ========================================================================= */
    '/api/v1/auth/register': {
      post: {
        summary: 'Register New User',
        tags: ['Authentication'],
        description: 'Create an account as either a Jobseeker or Employer.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone', 'password', 'role', 'terms'],
                properties: {
                  name: { type: 'string', example: 'Priya Sharma' },
                  email: { type: 'string', example: 'priya.sharma@example.com' },
                  phone: { type: 'string', example: '+91 98765 43210' },
                  password: { type: 'string', format: 'password', example: 'SecurePassword123!' },
                  role: { type: 'string', enum: ['jobseeker', 'employer'], example: 'jobseeker' },
                  terms: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Account registered successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/400BadRequest' },
          409: { description: 'Email already registered' },
        },
      },
    },

    '/api/v1/auth/login': {
      post: {
        summary: 'Sign In (Login)',
        tags: ['Authentication'],
        description: 'Authenticate with email and password. Sets HTTP-only auth cookie and returns JWT bearer token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@akshithaedutech.example' },
                  password: { type: 'string', format: 'password', example: 'AdminSecurePass123!' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Logged in successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Signed in successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid email or password' },
        },
      },
    },

    '/api/v1/auth/logout': {
      post: {
        summary: 'Log Out',
        tags: ['Authentication'],
        description: 'Clears the authentication cookie.',
        responses: {
          200: {
            description: 'Logged out successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
              },
            },
          },
        },
      },
    },

    '/api/v1/auth/me': {
      get: {
        summary: 'Get Current Logged-in User Profile',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'Fetch the profile of the currently authenticated user.',
        responses: {
          200: {
            description: 'Current user profile',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },

    /* =========================================================================
       2. JOBS
       ========================================================================= */
    '/api/v1/jobs': {
      get: {
        summary: 'Search & List Jobs',
        tags: ['Jobs'],
        description: 'Browse active job listings with text search and filters.',
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Keyword search (title, skills, description)' },
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Job industry category' },
          { name: 'location', in: 'query', schema: { type: 'string' }, description: 'City or remote' },
          { name: 'type', in: 'query', schema: { type: 'string' }, description: 'Full-time, Part-time, Internship, Contract' },
          { name: 'experience', in: 'query', schema: { type: 'string' }, description: 'Fresher, 1–3 years, 3–6 years' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 12 } },
        ],
        responses: {
          200: {
            description: 'List of jobs matching criteria',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 7 },
                    total: { type: 'number', example: 7 },
                    page: { type: 'number', example: 1 },
                    totalPages: { type: 'number', example: 1 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Job' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Post New Job Vacancy',
        tags: ['Jobs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'Post a new job. Allowed for Employer or Admin accounts.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'category', 'location', 'type', 'experience', 'salary', 'skills', 'description'],
                properties: {
                  title: { type: 'string', example: 'Full Stack Node.js Engineer' },
                  category: { type: 'string', example: 'Information Technology' },
                  location: { type: 'string', example: 'Hyderabad' },
                  type: { type: 'string', example: 'Full-time' },
                  experience: { type: 'string', example: '3–6 years' },
                  salary: { type: 'string', example: '₹14 – 22 LPA' },
                  openings: { type: 'number', example: 2 },
                  skills: { type: 'array', items: { type: 'string' }, example: ['Node.js', 'React', 'MongoDB'] },
                  description: { type: 'string', example: 'Build high-scale systems for career education.' },
                  responsibilities: { type: 'array', items: { type: 'string' }, example: ['Architect microservices'] },
                  requirements: { type: 'array', items: { type: 'string' }, example: ['3+ years in Node.js'] },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Job posted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        job: { $ref: '#/components/schemas/Job' },
                      },
                    },
                  },
                },
              },
            },
          },
          403: { description: 'Forbidden - only employers or admins can post jobs' },
        },
      },
    },

    '/api/v1/jobs/{id}': {
      get: {
        summary: 'Get Job Details by ID or Slug',
        tags: ['Jobs'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Job ID or unique URL slug' },
        ],
        responses: {
          200: {
            description: 'Job details and related jobs',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        job: { $ref: '#/components/schemas/Job' },
                        related: { type: 'array', items: { $ref: '#/components/schemas/Job' } },
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: 'Job not found' },
        },
      },
      patch: {
        summary: 'Update Job Vacancy',
        tags: ['Jobs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  salary: { type: 'string', example: '₹16 – 24 LPA' },
                  openings: { type: 'number', example: 5 },
                  status: { type: 'string', enum: ['active', 'closed'] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Job updated successfully' },
          403: { description: 'Forbidden - not the job owner' },
        },
      },
      delete: {
        summary: 'Close Job Vacancy',
        tags: ['Jobs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Job closed successfully' },
        },
      },
    },

    '/api/v1/jobs/{id}/applications': {
      post: {
        summary: 'Apply for a Job (Upload Resume)',
        tags: ['Applications'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'Submit an application with a PDF/DOCX resume file or cover letter.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Job ID' },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone'],
                properties: {
                  name: { type: 'string', example: 'Priya Sharma' },
                  email: { type: 'string', example: 'priya.sharma@example.com' },
                  phone: { type: 'string', example: '+91 98765 43210' },
                  coverLetter: { type: 'string', example: 'I would love to contribute to this role...' },
                  resume: {
                    type: 'string',
                    format: 'binary',
                    description: 'PDF or Word document (max 2MB)',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Application submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Application submitted successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        application: { $ref: '#/components/schemas/Application' },
                      },
                    },
                  },
                },
              },
            },
          },
          409: { description: 'You have already applied for this job' },
        },
      },
    },

    /* =========================================================================
       3. APPLICATIONS
       ========================================================================= */
    '/api/v1/applications/mine': {
      get: {
        summary: 'Get My Job Applications',
        tags: ['Applications'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'List all job applications submitted by the logged-in jobseeker.',
        responses: {
          200: {
            description: 'List of submitted applications',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Application' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    '/api/v1/employer/jobs': {
      get: {
        summary: 'Employer: Get My Jobs with Applicant Counts',
        tags: ['Jobs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'Returns only the jobs created by the currently authenticated employer, including real-time applicant counts.',
        responses: {
          200: {
            description: 'List of jobs created by the authenticated employer',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 3 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Job' },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized: missing or invalid credentials' },
          403: { description: 'Forbidden: only employer or admin role allowed' },
        },
      },
    },

    '/api/v1/employer/jobs/{id}/applications': {
      get: {
        summary: 'Employer: View Applicants for a Job',
        tags: ['Applications'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        description: 'View all candidates who applied to a specific job owned by the employer.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Job ID' },
        ],
        responses: {
          200: {
            description: 'List of applicants and resumes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Application' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    '/api/v1/applications/{id}/status': {
      patch: {
        summary: 'Employer: Update Application Status',
        tags: ['Applications'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: {
                    type: 'string',
                    enum: ['submitted', 'in_review', 'shortlisted', 'rejected', 'accepted'],
                    example: 'shortlisted',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Status updated successfully' },
        },
      },
    },

    /* =========================================================================
       4. COMPANIES
       ========================================================================= */
    '/api/v1/companies': {
      get: {
        summary: 'List Verified Companies',
        tags: ['Companies'],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' } },
          { name: 'industry', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'List of companies',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Company' } },
                  },
                },
              },
            },
          },
        },
      },
    },

    '/api/v1/companies/{id}': {
      get: {
        summary: 'Get Company Details & Jobs',
        tags: ['Companies'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: {
            description: 'Company details and active jobs',
          },
        },
      },
    },

    '/api/v1/companies/mine': {
      patch: {
        summary: 'Employer: Edit Own Company Profile',
        tags: ['Companies'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Nimbus Technologies Ltd.' },
                  industry: { type: 'string', example: 'Information Technology' },
                  website: { type: 'string', example: 'https://nimbus.example' },
                  description: { type: 'string', example: 'Leading cloud provider.' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Company profile updated successfully' },
        },
      },
    },

    /* =========================================================================
       5. COUNSELLING & CONTACT
       ========================================================================= */
    '/api/v1/counselling-requests': {
      post: {
        summary: 'Submit Career Counselling Request',
        tags: ['Counselling'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone', 'educationLevel'],
                properties: {
                  name: { type: 'string', example: 'Ankit Kumar' },
                  email: { type: 'string', example: 'ankit@example.com' },
                  phone: { type: 'string', example: '9876543210' },
                  educationLevel: { type: 'string', example: 'Graduate' },
                  stream: { type: 'string', example: 'Electronics' },
                  preferredTime: { type: 'string', example: 'Morning (10 AM – 1 PM)' },
                  message: { type: 'string', example: 'Need guidance for tech career transition.' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Counselling request registered' },
        },
      },
      get: {
        summary: 'Admin: List Counselling Requests',
        tags: ['Counselling'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: 'List of counselling requests' },
        },
      },
    },

    '/api/v1/counselling-requests/{id}/status': {
      patch: {
        summary: 'Admin: Update Counselling Request Status',
        tags: ['Counselling'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['pending', 'confirmed', 'completed', 'cancelled'] },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Status updated' } },
      },
    },

    '/api/v1/contact': {
      post: {
        summary: 'Submit Contact Message',
        tags: ['Contact'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone', 'subject', 'message'],
                properties: {
                  name: { type: 'string', example: 'Sunita Rao' },
                  email: { type: 'string', example: 'sunita@example.com' },
                  phone: { type: 'string', example: '9876543210' },
                  subject: { type: 'string', example: 'Institution Partnership' },
                  message: { type: 'string', example: 'We would like to register our college students on Akshitha Edutech.' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Message sent successfully' },
        },
      },
      get: {
        summary: 'Admin: List Contact Messages',
        tags: ['Contact'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: { 200: { description: 'List of messages' } },
      },
    },

    /* =========================================================================
       6. JOB FAIRS
       ========================================================================= */
    '/api/v1/job-fairs': {
      get: {
        summary: 'List Job Fairs & Hiring Drives',
        tags: ['Job Fairs'],
        responses: {
          200: {
            description: 'List of job fairs',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/JobFair' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Admin: Create Job Fair',
        tags: ['Job Fairs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'type', 'date', 'location'],
                properties: {
                  title: { type: 'string', example: 'National IT & Banking Job Fair' },
                  type: { type: 'string', enum: ['in-person', 'virtual', 'hybrid'], example: 'hybrid' },
                  date: { type: 'string', example: '2026-12-01' },
                  time: { type: 'string', example: '9:30 AM – 6:00 PM' },
                  location: { type: 'string', example: 'Hyderabad Exhibition Center' },
                  companiesCount: { type: 'number', example: 50 },
                  openingsCount: { type: 'number', example: 2500 },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Job fair created' } },
      },
    },

    '/api/v1/job-fairs/{id}/register': {
      post: {
        summary: 'Register for Job Fair Pass',
        tags: ['Job Fairs'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone'],
                properties: {
                  name: { type: 'string', example: 'Priya Sharma' },
                  email: { type: 'string', example: 'priya.sharma@example.com' },
                  phone: { type: 'string', example: '+91 98765 43210' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Registration pass generated successfully',
          },
          409: { description: 'Already registered for this job fair' },
        },
      },
    },

    /* =========================================================================
       7. ADMIN OPERATIONS
       ========================================================================= */
    '/api/v1/admin/stats': {
      get: {
        summary: 'Admin: Dashboard Summary Stats',
        tags: ['Admin'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: {
            description: 'Platform metrics (users, active jobs, applications, pending reviews)',
          },
          403: { description: 'Forbidden - admin only' },
        },
      },
    },

    '/api/v1/admin/users': {
      get: {
        summary: 'Admin: List Users',
        tags: ['Admin'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          { name: 'role', in: 'query', schema: { type: 'string', enum: ['jobseeker', 'employer', 'admin'] } },
        ],
        responses: {
          200: { description: 'List of users' },
        },
      },
    },

    '/api/v1/admin/employers/{id}/verify': {
      patch: {
        summary: 'Admin: Verify or Unverify Employer',
        tags: ['Admin'],
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['isVerified'],
                properties: {
                  isVerified: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Employer verification status updated' },
        },
      },
    },
  },
  responses: {
    '400BadRequest': {
      description: 'Validation Error',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' },
        },
      },
    },
  },
};
