# Portfolio — Frontend Engineer

A modern, animated, glassmorphism portfolio built with Next.js, Framer Motion, and Tailwind CSS. Features a config-driven content system, dark/light mode, and a full feedback pipeline with Google Sheets integration.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4, custom glassmorphism system
- **Animations**: Framer Motion
- **Feedback Pipeline**: Google Sheets, Cloudinary, Nodemailer
- **Deployment**: Vercel-ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + SEO meta
│   ├── page.tsx                # Main page (all sections)
│   └── api/
│       ├── feedback/route.ts   # POST — submit feedback
│       └── feedbacks/route.ts  # GET  — fetch approved feedbacks
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx          # Sticky glass navbar + mobile menu
│   │   ├── Hero.tsx            # Animated hero with CTA
│   │   ├── About.tsx           # Summary + stat highlights
│   │   ├── Skills.tsx          # Grouped skill cards + marquee
│   │   ├── Experience.tsx      # Horizontal scroll cards (Zopping)
│   │   ├── Internship.tsx      # MountBlue project cards
│   │   ├── FeatureHighlights.tsx # "What I've Built" grid
│   │   ├── Projects.tsx        # Personal projects with links
│   │   ├── Testimonials.tsx    # Approved feedback display
│   │   ├── FeedbackForm.tsx    # Feedback submission form
│   │   ├── Contact.tsx         # Contact form + social links
│   │   └── Footer.tsx          # Footer with social icons
│   └── ui/
│       ├── AnimatedSection.tsx # Scroll-reveal wrapper
│       ├── BackgroundBlobs.tsx # Floating gradient blobs
│       ├── Card.tsx            # Reusable glass card
│       ├── SectionHeading.tsx  # Section title + subtitle
│       ├── StarRating.tsx      # Interactive/readonly stars
│       ├── TechTag.tsx         # Tech stack pill
│       └── Toast.tsx           # Success/error notifications
├── data/
│   └── portfolioConfig.ts     # All content (edit this to customize)
├── hooks/
│   └── useTheme.ts            # Dark/light mode toggle
├── lib/
│   ├── cloudinary.ts          # Image upload helper
│   ├── email.ts               # Nodemailer notification
│   └── googleSheets.ts        # Google Sheets read/write
└── styles/
    └── globals.css            # Tailwind + glassmorphism + blobs
```

## Customization

All content is driven from a single config file:

```
src/data/portfolioConfig.ts
```

Edit this file to update your name, role, skills, experience, projects, and links. No need to touch any component files.

## Feedback System

### Flow

```
User submits form → POST /api/feedback
  ├── Validates input
  ├── Uploads profile image → Cloudinary
  ├── Appends row → Google Sheet (status: "pending")
  └── Sends email notification → Admin

Admin approves in Google Sheet (status → "approved")

Portfolio fetches → GET /api/feedbacks → shows approved only
```

### Google Sheet Setup

1. Create a new Google Sheet
2. Add header row: `Name | Designation | Company | Ex-Company | Rating | Image URL | Message | Status | Timestamp`
3. Create a [Google Service Account](https://console.cloud.google.com/iam-admin/serviceaccounts)
4. Enable the Google Sheets API
5. Share the sheet with the service account email (Editor access)
6. Download the JSON key and extract `client_email` and `private_key`

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key |
| `GOOGLE_SHEET_ID` | Sheet ID from the URL |
| `SMTP_HOST` | SMTP server (default: smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (default: 587) |
| `SMTP_USER` | Email address for sending |
| `SMTP_PASS` | App password (not your login password) |
| `NOTIFICATION_EMAIL` | Where to receive feedback alerts |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

> The portfolio works without these — feedback will use fallback sample data until configured.

## Features

- **Glassmorphism UI** — Blur, transparency, gradient reflections
- **Floating blobs** — Animated background orbs
- **Dark / Light mode** — Toggle with localStorage persistence
- **Responsive** — Mobile-first with horizontal scroll sections
- **Config-driven** — Single file to edit all content
- **SEO optimized** — Meta tags, semantic HTML, ATS keywords
- **Feedback pipeline** — Form → Email → Sheet → Approval → Display
- **Image upload** — Cloudinary with signed uploads
- **Star ratings** — Interactive submit + readonly display
- **Toast notifications** — Success/error feedback

## Deployment

```bash
# Deploy to Vercel
npx vercel

# Or connect your GitHub repo to Vercel for auto-deploys
```

Add your environment variables in the Vercel dashboard under Settings → Environment Variables.

## License

MIT
# portfolio

