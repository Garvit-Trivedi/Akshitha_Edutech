# Akshitha Edutech — Career & Job Portal

A full-stack employment and career-services portal connecting job seekers, verified employers, educational institutions, and career counsellors across India.

- **Live Frontend**: [https://akshita-jade.vercel.app](https://akshita-jade.vercel.app)
- **Live Backend API**: [https://akshitha-edutech.onrender.com](https://akshitha-edutech.onrender.com)
- **Interactive Swagger API Tester**: [https://akshitha-edutech.onrender.com/api-docs](https://akshitha-edutech.onrender.com/api-docs) (or local: `http://localhost:5000/api-docs`)

---

## 🧪 Demo Credentials & Fast Testing (Testing Purpose Only)

> [!NOTE]
> **Strictly for Demo & Testing Purposes**: Test credentials and 1-click autofill buttons are provided **solely for rapid evaluation and testing**. In a live production environment, these demo accounts and quick-fill triggers are disabled.

To make testing and evaluation **fast, effortless, and seamless**, test credentials for all roles are provided **directly on the website itself** on the **[Sign In Page](https://akshita-jade.vercel.app/login)**:

- ⚡ **1-Click Autofill on the Website**: You don't need to manually type or register new accounts. Simply click any of the **Quick Demo Login** buttons (**Candidate**, **Employer**, or **Admin**) on the login page to instantly autofill the credentials.
- 🚀 **Fast Testing Across Roles**: Enables reviewers to switch roles and test candidate applications, employer postings, or administrative management in seconds without setup delay.

### Test Credentials Reference

| Role | Email | Password | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| **Candidate** (Jobseeker) | `candidate@akshithaedutech.example` | `CandidatePass123!` | Test job browsing, resume upload applications, counselling bookings. |
| **Employer** (Hiring Partner) | `employer@nimbus.example` | `EmployerSecurePass123!` | Test vacancy posting, applicant review, candidate status transitions. |
| **Administrator** | `admin@akshithaedutech.example` | `AdminSecurePass123!` | Test system analytics, job fair management, employer verification. |

---

## ⚡ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons |
| **Backend** | Node.js, Express.js, TypeScript, Mongoose, Zod, JWT, Multer, Helmet, CORS |
| **Database** | MongoDB (Local / MongoDB Atlas) |
| **Deployment** | Vercel (Frontend) + Render (Backend) |

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.9 or newer)
- [pnpm](https://pnpm.io/) or `npm`
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

---

### Step 1: Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Garvit-Trivedi/Akshitha_Edutech.git
cd Akshitha_Edutech

# Install frontend dependencies
pnpm install          # or: npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

### Step 2: Configure Environment Variables

**1. Frontend (`.env.local` in root directory):**
```env
# For local backend:
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Or point to live Render backend:
# NEXT_PUBLIC_API_URL=https://akshitha-edutech.onrender.com/api/v1
```

**2. Backend (`backend/.env` in backend directory):**
```bash
cp backend/.env.example backend/.env
```
Ensure `backend/.env` contains:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/akshitha_edutech
JWT_SECRET=your_super_secret_jwt_key_min32chars!
JWT_EXPIRES_IN=7d
COOKIE_NAME=token
CLIENT_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://akshita-jade.vercel.app
UPLOAD_DIR=uploads/resumes
```

---

### Step 3: Initialize Database & Start Backend

Open a terminal in the `backend/` directory:

```bash
cd backend

# 1. Create the default administrator account
npm run seed:admin

# 2. (Optional) Seed realistic companies, jobs, and hiring fairs
npm run seed

# 3. Start the backend development server
npm run dev
```
> Backend runs at: **`http://localhost:5000`** (API Base: `http://localhost:5000/api/v1`)

---

### Step 4: Start Frontend

Open a second terminal in the project root:

```bash
pnpm dev              # or: npm run dev
```
> Frontend runs at: **`http://localhost:3000`**  
> 💡 *Tip*: Visit `http://localhost:3000/login` and use the 1-click **Quick Demo Logins** to autofill credentials for Candidate, Employer, or Admin for rapid testing.

---

## 🌟 Key Features

- 🔍 **Job Search & Filters**: Search by keyword, location, industry, job type, and experience.
- 📄 **Resume Application**: Upload PDF/DOCX resumes (Multer disk storage with MIME validation).
- 🏢 **Employer Portal**: Post job vacancies, review applicant profiles, and update candidate statuses.
- 🎯 **Career Counselling**: Book one-on-one sessions with guidance advisors.
- 🎪 **Job Fairs**: Discover online and in-person hiring events with unique ticket registration.
- 🔐 **Dual Auth**: Secure JWT stored in `HttpOnly` cross-site cookies with `Authorization: Bearer` fallback.
- 🛡️ **Security**: Dynamic CORS reflection, Helmet security headers, rate limiting, and Zod input validation.

---

## 📁 Repository Structure

```
├── app/                  # Next.js App Router (pages: /jobs, /login, /register, /employers, etc.)
├── components/           # UI components, forms, layout headers, job cards, auth context
├── lib/                  # Frontend API client (lib/api.ts), validation, site metadata
├── public/               # Images and static assets
├── backend/              # Node.js + Express + TypeScript REST API service
│   ├── src/              # Controllers, models, services, routes, middleware, validators
│   ├── uploads/resumes/  # Isolated storage for candidate resumes
│   └── README.md         # Complete backend workflow and REST API documentation
└── README.md             # Project overview & local setup guide
```

For complete architectural details, business logic workflows, and full API endpoint documentation, see [backend/README.md](file:///home/garvit/Downloads/Website-Building-main/backend/README.md).
