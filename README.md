# Akshitha Edutech Company — Careers Portal (Frontend)

A complete, editable frontend for an employment and career-services portal. The structure (job search, employer services, career guidance and job fairs) is like a national career portal, but the branding, content and design are all original.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

---

## 1. Requirements

- [Node.js](https://nodejs.org/) **20.9 or newer**
- [pnpm](https://pnpm.io/) (recommended) or npm
- [VS Code](https://code.visualstudio.com/) (recommended extensions: *Tailwind CSS IntelliSense*, *ESLint*)

## 2. Install & run

```bash
# 1. Open the folder in VS Code
code future-akshita

# 2. Install dependencies
pnpm install        # or: npm install

# 3. Start the dev server
pnpm dev            # or: npm run dev
```

Then open http://localhost:3000.

### Production build

```bash
pnpm build
pnpm start
```

---

## 3. Pages

| Route               | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `/`                 | Home: hero search, stats, services, categories, featured jobs, how it works, employers, job fairs, testimonials |
| `/jobs`             | Job search with keyword, location, sector, job-type filters and sorting (stored in the URL) |
| `/jobs/[id]`        | Job details, apply form and similar jobs                       |
| `/employers`        | Employer benefits and a "Post a Job" form                      |
| `/career-guidance`  | Counselling info, career articles, and a session booking form   |
| `/job-fairs`        | Upcoming in-person and virtual job fairs                       |
| `/about`            | Mission, vision, stats and milestones                          |
| `/contact`          | Contact details, contact form and FAQs                         |
| `/login`            | Sign-in form (UI only)                                         |
| `/register`         | Job seeker / employer registration (UI only, `?role=employer`) |

---

## 4. Project structure

```
app/                     # Routes (one folder per page)
  layout.tsx             # Root layout: fonts, header, footer, SEO metadata
  globals.css            # Theme colours & design tokens
  page.tsx               # Home page
  jobs/ employers/ career-guidance/ job-fairs/ about/ contact/ login/ register/
components/
  layout/                # Site header, footer, logo
  home/                  # Home page sections
  jobs/                  # Job card, search bar, filters, apply form
  employers/ career/ contact/ auth/ job-fairs/
  forms/form-field.tsx   # Reusable labelled input/select/textarea
  shared/                # Page header & section heading
  ui/                    # shadcn/ui primitives
lib/
  site.ts                # Company name, contact details, navigation links
  data.ts                # Sample jobs, categories, employers, events, FAQs
  validation.ts          # Simple form validation helpers
public/images/           # Images used on the site
```

---

## 5. Common edits

- **Company name, phone, email, address, menu links** → `lib/site.ts`
- **Jobs, categories, employers, job fairs, testimonials, FAQs** → `lib/data.ts`
- **Brand colours & fonts** → the `:root` variables in `app/globals.css` (`--primary`, `--accent`, …) and the fonts in `app/layout.tsx`
- **Home page sections (order / remove / add)** → `app/page.tsx`
- **Images** → swap files in `public/images/`

---

## 6. Connecting a backend

This is a frontend project. All data comes from `lib/data.ts` and forms validate on the client and then show a success message. To go live:

1. Replace the arrays in `lib/data.ts` with database or API calls (e.g. Neon/Postgres, Supabase).
2. In each form component (look for `// TODO: send data to your backend`) send the `FormData` to an API route or Server Action.
3. Add a real authentication provider (e.g. Better Auth, Auth.js, Supabase Auth) to `/login` and `/register`.
4. Always validate input on the server too.

---

## 7. Scripts

| Command      | What it does                     |
| ------------ | -------------------------------- |
| `pnpm dev`   | Start the development server     |
| `pnpm build` | Build for production             |
| `pnpm start` | Run the production build         |
| `pnpm lint`  | Run ESLint                       |
