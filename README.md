# Akshitha Edutech — Career & Job Portal

A full-stack employment and career-services portal connecting job seekers, verified employers, educational institutions, and career counsellors across India.

- **Live Frontend**: [https://akshita-jade.vercel.app](https://akshita-jade.vercel.app)
- **Live Backend API**: [https://akshitha-edutech.onrender.com](https://akshitha-edutech.onrender.com)

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
