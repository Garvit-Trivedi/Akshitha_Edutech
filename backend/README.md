# Akshitha Edutech — Backend REST API

Production-ready backend API service for the Akshitha Edutech job portal and career guidance platform. Built with Node.js, Express, TypeScript, and MongoDB with Mongoose.

---

## 🛠 Technology Stack

- **Runtime & Framework**: Node.js, Express.js with TypeScript
- **Database & ODM**: MongoDB with Mongoose
- **Validation**: Zod (strict server-side schemas)
- **Authentication**: JWT access tokens stored in secure, `HttpOnly`, `SameSite` cookies
- **Password Security**: bcrypt password hashing
- **Security & Hardening**: Helmet security headers, CORS origin whitelisting, Express Rate Limiter
- **File Uploads**: Multer (restricted to PDF and Word documents, max 2MB)
- **Configuration**: Dotenv environment management

---

## 📂 Project Architecture

```
backend/
├── src/
│   ├── app.ts                 # Express app initialization, CORS, Helmet, rate-limiting & routes
│   ├── server.ts              # Server bootstrap, MongoDB connection & graceful shutdown
│   ├── config/
│   │   ├── env.ts             # Typed environment variable loader & defaults
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
└── README.md                  # Complete documentation
```

---

## ⚙️ Configuration (.env)

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port for the backend API | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/akshitha_edutech` or Atlas URI |
| `JWT_SECRET` | Secret key for signing JWT tokens | `min 32 random characters` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `COOKIE_NAME` | Name of the HttpOnly cookie | `token` |
| `CLIENT_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:3000,http://127.0.0.1:3000` |
| `MAX_FILE_SIZE_MB`| Max allowed resume file size | `2` |
| `UPLOAD_DIR` | Directory for uploaded resumes | `uploads/resumes` |
| `ADMIN_NAME` | Initial admin user name | `Platform Administrator` |
| `ADMIN_EMAIL` | Initial admin user email | `admin@akshithaedutech.example` |
| `ADMIN_PASSWORD` | Initial admin user password | `AdminSecurePass123!` |
| `ADMIN_PHONE` | Initial admin user phone | `9876543210` |

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. MongoDB Setup
You can connect to either:
- **Local MongoDB**: `mongodb://127.0.0.1:27017/akshitha_edutech`
- **MongoDB Atlas**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a database user, and paste your connection string into `MONGODB_URI` in `backend/.env`:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/akshitha_edutech?retryWrites=true&w=majority
  ```

### 3. Create the First Administrator Securely
Public registration as an administrator is **strictly blocked** in the API. To create the first platform administrator, run:
```bash
npm run seed:admin
```
This reads credentials from `.env` and safely creates or upgrades the account with role `'admin'`.

### 4. Seed Realistic Initial Data (Optional)
To populate MongoDB with verified companies, sample jobs, and upcoming hiring drives:
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```
The API server starts at `http://localhost:5000` with hot-reloading via `tsx watch`.

### 6. Build and Run Production
```bash
npm run build
npm start
```

---

## 📡 REST API Reference (`/api/v1`)

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register as `jobseeker` or `employer`. Sets HTTP-only cookie. |
| `POST` | `/api/v1/auth/login` | Public | Sign in with email and password. Sets HTTP-only cookie. |
| `POST` | `/api/v1/auth/logout` | Public | Clears authentication cookie. |
| `GET` | `/api/v1/auth/me` | Authenticated | Fetch current user profile and linked company. |

#### Registration Payload Example:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "password": "Password123!",
  "role": "jobseeker",
  "terms": true
}
```

---

### Jobs (`/api/v1/jobs`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/jobs` | Public | List and search active jobs. Query params: `q`, `location`, `category`, `type`, `sort`, `page`, `limit`. |
| `GET` | `/api/v1/jobs/:id` | Public | Get single job details (by MongoDB `_id` or `slug`) and related jobs. |
| `POST` | `/api/v1/jobs` | Employer, Admin | Post a new job vacancy. Sets owner to authenticated employer. |
| `PATCH` | `/api/v1/jobs/:id` | Employer (owner), Admin | Edit job details. |
| `DELETE`| `/api/v1/jobs/:id` | Employer (owner), Admin | Close job vacancy. |
| `POST` | `/api/v1/jobs/:id/applications` | Jobseeker, Admin | Apply for an active job. Accepts `multipart/form-data` with resume file or JSON. Prevents duplicate applications. |

---

### Applications (`/api/v1/applications`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/applications/mine` | Jobseeker, Admin | View applications submitted by the logged-in user. |
| `GET` | `/api/v1/employer/jobs/:id/applications` | Employer (owner), Admin | View all candidates who applied to a specific job. |
| `PATCH` | `/api/v1/applications/:id/status` | Employer (owner), Admin | Update status (`submitted`, `in_review`, `shortlisted`, `rejected`, `accepted`). |

---

### Companies (`/api/v1/companies`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/companies` | Public | Browse verified company directory. Supports `q` and `industry` filters. |
| `GET` | `/api/v1/companies/:id` | Public | Company details and active job listings. |
| `PATCH` | `/api/v1/companies/mine` | Employer | Edit employer's own company profile. |
| `PATCH` | `/api/v1/companies/:id/verify` | Admin | Verify or unverify an organization. |

---

### Career Counselling (`/api/v1/counselling-requests`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/counselling-requests` | Public / Auth | Submit career counselling request. |
| `GET` | `/api/v1/counselling-requests` | Admin | Review all counselling requests. |
| `PATCH` | `/api/v1/counselling-requests/:id/status` | Admin | Update status (`pending`, `confirmed`, `completed`, `cancelled`). |

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
| `POST` | `/api/v1/job-fairs/:id/register` | Authenticated | Register for a job fair and receive a unique entry pass. Duplicate-protected. |
| `POST` | `/api/v1/job-fairs` | Admin | Create a new job fair event. |
| `PATCH` | `/api/v1/job-fairs/:id` | Admin | Update a job fair. |
| `DELETE`| `/api/v1/job-fairs/:id` | Admin | Remove a job fair. |
| `GET` | `/api/v1/job-fairs/:id/registrations` | Admin | View registered attendees for a job fair. |

---

### Admin Operations (`/api/v1/admin`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/stats` | Admin | Summary metrics (users, active jobs, applications, pending reviews). |
| `GET` | `/api/v1/admin/users` | Admin | List registered users with role filter. |
| `PATCH` | `/api/v1/admin/employers/:id/verify` | Admin | Verify employer account and company. |

---

## 🔒 Security Best Practices Implemented

1. **HTTP-Only & Secure Cookies**: Authentication tokens are transmitted in `HttpOnly`, `SameSite` cookies, rendering them immune to XSS token theft.
2. **CORS Origin Whitelisting**: Strictly limits requests to specified frontend domains with credentials enabled.
3. **No Password Leakage**: `select: false` on Mongoose password field, with explicit deletion in JSON transforms.
4. **Rate Limiting**: Defends against brute force authentication and spam on contact and registration endpoints.
5. **Safe File Uploads**: File uploads are restricted by MIME type and extension (`.pdf`, `.doc`, `.docx`) up to 2MB. Files are saved with cryptographically random filenames in isolated disk storage.
6. **Strict Role-Based Access Control**: Prevents horizontal and vertical privilege escalation; employers can only manage their own jobs and applicants.
