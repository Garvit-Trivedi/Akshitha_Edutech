# Akshitha Edutech — Backend REST API

Production-ready backend API service powering the Akshitha Edutech career and employment portal. Built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB with Mongoose**.

- **API Base URL**: `https://akshitha-edutech.onrender.com/api/v1`
- **Health Check**: `https://akshitha-edutech.onrender.com/`

---

## 🛠 Technology Stack

- **Runtime & Language**: Node.js (v20+), TypeScript 5.7
- **Server Framework**: Express.js 4.21
- **Database & ODM**: MongoDB with Mongoose 8.12
- **Validation**: Zod (strict schema-based request validation)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs password hashing
- **Session Transport**: Dual delivery via secure `HttpOnly` / `SameSite: none` cookies + `Authorization: Bearer` headers
- **File Uploads**: Multer (disk storage restricted to PDF, DOC, DOCX up to 2MB)
- **Security & Hardening**: Helmet, Dynamic CORS with credentials, Express Rate Limiter
- **Configuration**: Dotenv environment management

---

## 🔄 Complete Backend Workflows

### 1. Server Initialization & Database Lifecycle
```
[Client/Cloud Request]
        │
        ▼
   server.ts ──► connectDB() ──► MongoDB Atlas / Local
        │
        ▼
    createApp()
        ├── trust proxy (1)
        ├── Helmet (Security Headers)
        ├── Dynamic CORS (Reflects origin + credentials)
        ├── Parsers (express.json, urlencoded, cookie-parser)
        ├── Rate Limiters (General, Auth, Contact)
        ├── Static Serve (/uploads/resumes)
        ├── /api/v1 Routes
        └── Centralized errorHandler
```
1. **Startup**: `src/server.ts` initiates connection to MongoDB. Connection state events (`connected`, `error`, `disconnected`) are logged.
2. **Proxy Support**: `app.set('trust proxy', 1)` enables accurate client IP tracking behind cloud reverse proxies (Render, Cloudflare, AWS ALB).
3. **Graceful Shutdown**: Intercepts `SIGINT` and `SIGTERM` signals to cleanly close database connections and finish active HTTP requests before exiting.

---

### 2. Authentication & Session Workflow

```
[Register / Login Request]
        │
        ▼
  validateBody(Zod)
        │
        ▼
  AuthService.login() / register()
        ├── bcrypt.compare() / hash(password, 10)
        ├── signToken(userId, role, email)
        └── setAuthCookie(res, token)
        │
        ▼
  [Response: HTTP 200/201]
  ├── Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=None
  └── JSON Body: { success: true, data: { user, token } }
```

1. **Registration (`POST /api/v1/auth/register`)**:
   - Accepts `name`, `email`, `phone`, `password`, `role` (`jobseeker` or `employer`).
   - Normalizes email (lowercase, trimmed) and phone.
   - Hashes password using `bcryptjs` (salt rounds: 10).
   - If role is `employer`, automatically initializes a linked `Company` document.
   - Disallows direct registration with role `admin` (admins are seeded securely via script).
2. **Login (`POST /api/v1/auth/login`)**:
   - Compares plaintext password against hashed password using `bcrypt.compare()`.
   - Generates signed JWT payload `{ userId, role, email }` with configurable expiration (`7d`).
   - Sets secure cookie (`HttpOnly`, `Secure` in production, `SameSite: none` for cross-origin).
   - Returns token in response body for clients using `Authorization: Bearer <token>`.
3. **Protected Routes (`protect` middleware)**:
   - Checks cookie `req.cookies.token` or header `Authorization: Bearer <token>`.
   - Verifies JWT with `JWT_SECRET`.
   - Attaches authenticated user object to `req.user`.
4. **Role Authorization (`restrictTo` middleware)**:
   - Verifies whether `req.user.role` matches required roles (`admin`, `employer`, `jobseeker`).

---

### 3. Jobs & Application Lifecycle Workflow

```
[Employer]                        [Jobseeker]
    │                                  │
    ▼                                  ▼
POST /api/v1/jobs                 GET /api/v1/jobs (Filter & Search)
    │                                  │
    │ (Job vacancy active)             ▼
    └─────────────────────────────► POST /api/v1/jobs/:id/applications
                                       ├── Multer checks resume (PDF/DOCX <= 2MB)
                                       ├── Enforces unique (applicant + job)
                                       └── Status: 'submitted'
                                       │
    ┌──────────────────────────────────┘
    ▼
GET /api/v1/employer/jobs/:id/applications
    │ (Review resume, candidate info)
    ▼
PATCH /api/v1/applications/:id/status
    └── Updates: 'in_review' | 'shortlisted' | 'rejected' | 'accepted'
```

1. **Post a Job (`POST /api/v1/jobs`)**:
   - Restricted to `employer` and `admin`.
   - Validates title, category, type, location, experience, salary, skills, and openings.
   - Generates unique URL-friendly slug (e.g. `frontend-developer-nimbus`).
   - Binds job ownership to the authenticated employer ID.
2. **Search Jobs (`GET /api/v1/jobs`)**:
   - Public access.
   - Supports text search `?q=`, category `?category=`, location `?location=`, type `?type=`.
   - Utilizes MongoDB compound text index on `{ title: 'text', description: 'text', skills: 'text' }`.
   - Pagination with `?page=` and `?limit=`.
3. **Apply for Job (`POST /api/v1/jobs/:id/applications`)**:
   - Restricted to `jobseeker` and `admin`.
   - Validates that the job exists and status is `active`.
   - File upload middleware (`resumeUpload.single('resume')`) validates file MIME type (`application/pdf`, `.doc`, `.docx`) and size limit (max 2MB).
   - Saves resume to disk storage (`uploads/resumes/<filename>`).
   - Database enforces compound unique index `{ applicant: 1, job: 1 }` preventing duplicate applications.
4. **Manage Applications (`GET /api/v1/employer/jobs/:id/applications`)**:
   - Employers can only view applications for jobs they own.
   - Status updates via `PATCH /api/v1/applications/:id/status` (`in_review`, `shortlisted`, `rejected`, `accepted`).

---

### 4. Career Counselling & Inquiries Workflow

```
[Jobseeker / Student] ──► POST /api/v1/counselling-requests
                                │ (Zod validation & Rate limit)
                                ▼
                         MongoDB: CounsellingRequest
                                │ (status: 'pending')
                                ▼
[Admin Dashboard]     ──► GET /api/v1/counselling-requests
                      ──► PATCH /api/v1/counselling-requests/:id/status
                                (status: 'confirmed' | 'completed' | 'cancelled')
```

1. **Counselling Request (`POST /api/v1/counselling-requests`)**:
   - Captures applicant name, email, phone, education level, stream, and preferred date/time.
   - Rate limited to protect against spam.
2. **Contact Message (`POST /api/v1/contact`)**:
   - Captures inquiry subject, message body, name, email, and phone.
   - Rate limited to 10 submissions per 15 minutes per IP.
3. **Admin Review**:
   - Administrators query all counselling requests and contact messages.
   - Update lifecycle statuses (`unread`, `read`, `resolved`).

---

### 5. Job Fairs & Registration Workflow

```
[Admin]       ──► POST /api/v1/job-fairs (Create fair with date, venue, companies)
                       │
                       ▼
[Jobseeker]   ──► GET /api/v1/job-fairs (List upcoming fairs)
              ──► POST /api/v1/job-fairs/:id/register
                       │
                       ├── Enforces unique registration
                       ├── Generates unique entry pass (e.g. AKSH-FAIR-ABCD1234)
                       └── Returns ticket registration details
```

---

### 6. Security, CORS & Error Handling Architecture

- **CORS Architecture**:
  The backend dynamically accepts all valid client origins via dynamic origin callback while preserving `credentials: true`. This allows cross-origin requests from Vercel deployments, preview URLs, custom domains, and local environments without tripping browser security policies.
- **Helmet Security Headers**:
  Sets modern HTTP headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Cross-Origin-Resource-Policy: cross-origin` to serve static resume files).
- **Rate Limiting**:
  - `generalLimiter`: 200 requests per 15 minutes across all `/api` routes.
  - `authLimiter`: 20 attempts per 15 minutes for `/api/v1/auth/login` and `/api/v1/auth/register`.
  - `contactLimiter`: 10 submissions per 15 minutes.
- **Centralized Error Handling**:
  - Operational errors throw `AppError(message, statusCode, errors)`.
  - Catches Mongoose duplicate key (`code: 11000`) and converts to user-friendly 409 Conflict.
  - Formats Zod validation issues into structured field errors `{ errors: { field: message } }`.

---

## 📂 Directory Structure

```
backend/
├── src/
│   ├── app.ts                 # Express initialization, CORS, Helmet, middleware & route mounting
│   ├── server.ts              # Server bootstrap, MongoDB connection & graceful shutdown
│   ├── config/
│   │   ├── env.ts             # Typed environment variable loader & origin defaults
│   │   └── db.ts              # MongoDB Mongoose connection and lifecycle events
│   ├── models/                # Mongoose schemas with compound indexes & validation
│   │   ├── User.ts            # User accounts (jobseeker, employer, admin)
│   │   ├── Company.ts         # Verified employer company profiles
│   │   ├── Job.ts             # Job vacancies with full-text search indexes
│   │   ├── Application.ts     # Job applications (unique compound index on applicant+job)
│   │   ├── CounsellingRequest.ts # Career counselling booking requests
│   │   ├── ContactMessage.ts  # Contact and feedback submissions
│   │   ├── JobFair.ts         # Hiring drives and job fairs
│   │   └── JobFairRegistration.ts # Event registrations with unique tickets
│   ├── validators/            # Zod input validation schemas
│   ├── middleware/            # Auth, RBAC, Validation, Error Handler, Upload, Rate Limiter
│   ├── controllers/           # HTTP Request and Response handlers
│   ├── services/              # Encapsulated business and database logic
│   ├── routes/                # Modular REST route definitions under /api/v1
│   ├── scripts/
│   │   ├── createAdmin.ts     # One-time secure administrator creation script
│   │   └── seed.ts            # Realistic database seed (sample jobs, companies, fairs)
│   └── utils/
│       ├── AppError.ts        # Custom operational error class
│       ├── jwt.ts             # JWT token signing, verification & cookie options
│       └── normalize.ts       # Email and phone normalization helpers
├── uploads/resumes/           # Isolated disk storage for candidate resumes
├── .env.example               # Environment variables template
├── package.json               # Backend dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── render.yaml                # Render cloud deployment blueprint
```

---

## ⚙️ Environment Variables (`.env`)

Create `backend/.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | API port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/akshitha_edutech` or Atlas URI |
| `JWT_SECRET` | Secret key for signing JWT tokens | `min 32 random characters` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `COOKIE_NAME` | Name of the authentication cookie | `token` |
| `CLIENT_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:3000,https://akshita-jade.vercel.app` |
| `MAX_FILE_SIZE_MB`| Max allowed resume upload size | `2` |
| `UPLOAD_DIR` | Directory for uploaded resumes | `uploads/resumes` |
| `ADMIN_NAME` | Initial administrator name | `Platform Administrator` |
| `ADMIN_EMAIL` | Initial administrator email | `admin@akshithaedutech.example` |
| `ADMIN_PASSWORD` | Initial administrator password | `AdminSecurePass123!` |
| `ADMIN_PHONE` | Initial administrator phone | `9876543210` |

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create the First Administrator Securely
```bash
npm run seed:admin
```

### 3. Seed Realistic Initial Data (Optional)
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
Starts API server on `http://localhost:5000` with hot-reloading.

### 5. Build & Run for Production
```bash
npm run build
npm start
```

---

## 📡 REST API Reference (`/api/v1`)

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register as `jobseeker` or `employer`. Returns JWT and sets cookie. |
| `POST` | `/api/v1/auth/login` | Public | Sign in with email and password. Sets HTTP-only cookie. |
| `POST` | `/api/v1/auth/logout` | Public | Clears authentication cookie. |
| `GET` | `/api/v1/auth/me` | Authenticated | Fetch current user profile and linked company. |

---

### Jobs (`/api/v1/jobs`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/jobs` | Public | Search & list active jobs (`?q=`, `?category=`, `?location=`, `?type=`, `?page=`). |
| `GET` | `/api/v1/jobs/:id` | Public | Get single job details (by MongoDB ID or slug) and related jobs. |
| `POST` | `/api/v1/jobs` | Employer, Admin | Post a new job vacancy. |
| `PATCH` | `/api/v1/jobs/:id` | Employer (owner), Admin | Edit job details. |
| `DELETE`| `/api/v1/jobs/:id` | Employer (owner), Admin | Close job vacancy. |
| `POST` | `/api/v1/jobs/:id/applications` | Jobseeker, Admin | Apply for an active job with resume (PDF/DOCX). |

---

### Applications (`/api/v1/applications`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/applications/mine` | Jobseeker, Admin | View applications submitted by logged-in user. |
| `GET` | `/api/v1/employer/jobs/:id/applications` | Employer (owner), Admin | View all candidates who applied to a specific job. |
| `PATCH` | `/api/v1/applications/:id/status` | Employer (owner), Admin | Update candidate status (`in_review`, `shortlisted`, `rejected`, `accepted`). |

---

### Companies (`/api/v1/companies`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/companies` | Public | Browse verified companies directory. |
| `GET` | `/api/v1/companies/:id` | Public | Get company details and active job listings. |
| `PATCH` | `/api/v1/companies/mine` | Employer | Edit employer's own company profile. |

---

### Career Counselling (`/api/v1/counselling-requests`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/counselling-requests` | Public | Submit career counselling request. |
| `GET` | `/api/v1/counselling-requests` | Admin | Review all counselling requests. |
| `PATCH` | `/api/v1/counselling-requests/:id/status` | Admin | Update request status (`confirmed`, `completed`, `cancelled`). |

---

### Contact Form (`/api/v1/contact`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/contact` | Public (Rate Limited) | Submit contact inquiry or feedback. |
| `GET` | `/api/v1/contact` | Admin | Review submitted contact messages. |
| `PATCH` | `/api/v1/contact/:id/status` | Admin | Update message status (`unread`, `read`, `resolved`). |

---

### Job Fairs (`/api/v1/job-fairs`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/job-fairs` | Public | List upcoming job fairs. |
| `GET` | `/api/v1/job-fairs/:id` | Public | Get single fair details. |
| `POST` | `/api/v1/job-fairs/:id/register` | Authenticated | Register for a job fair and receive a unique entry ticket pass. |
| `POST` | `/api/v1/job-fairs` | Admin | Create a new job fair event. |
| `PATCH` | `/api/v1/job-fairs/:id` | Admin | Update a job fair. |
| `DELETE`| `/api/v1/job-fairs/:id` | Admin | Remove a job fair. |
| `GET` | `/api/v1/job-fairs/:id/registrations` | Admin | View registered attendees for a job fair. |

---

### Admin Operations (`/api/v1/admin`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/stats` | Admin | Overview statistics (users, jobs, applications, pending reviews). |
| `GET` | `/api/v1/admin/users` | Admin | List registered users with role filter. |
| `PATCH` | `/api/v1/admin/employers/:id/verify` | Admin | Verify employer account and company. |
