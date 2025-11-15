# 🛠️ Setup & Installation Guide

This guide will walk you through setting up the portfolio locally and deploying it to production.

## Prerequisites

Make sure you have these installed:
- **Node.js** 18.17+ ([Download](https://nodejs.org))
- **npm** or **pnpm** (comes with Node.js)
- A code editor (VS Code recommended)

## Step 1: Clone & Install

\`\`\`bash
# Clone the repository (if from GitHub)
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
pnpm install
\`\`\`

This installs all required packages including:
- Next.js 16
- React 19.2
- Tailwind CSS 4
- shadcn/ui components
- AI SDK & OpenAI
- Resend for emails

## Step 2: Environment Variables

Create a `.env.local` file in the root directory with your API keys:

\`\`\`env
# AI Chatbot - Required for chat functionality
OPENAI_API_KEY=sk-your-openai-api-key-here

# Email Service - Required for contact form
RESEND_API_KEY=re_your-resend-api-key-here

# Development only (for Supabase redirect)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### Getting API Keys

#### 1. OpenAI API Key
- Go to [platform.openai.com](https://platform.openai.com)
- Sign up or log in to your account
- Navigate to API Keys section
- Click "Create new secret key"
- Copy and paste it into `.env.local`

#### 2. Resend API Key
- Visit [resend.com](https://resend.com)
- Sign up for free account
- Go to API Keys in settings
- Copy your API key
- Paste it into `.env.local`

#### 3. Update Recipient Email (Important!)
In `app/api/send-email/route.ts`, change the email to yours:

\`\`\`typescript
// Line: const result = await resend.emails.send({
const result = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'YOUR_EMAIL_HERE@example.com', // <-- Change this!
  subject: `New message from ${name}`,
  html: emailContent,
})
\`\`\`

## Step 3: Add Your CV

1. Place your CV PDF file in the `public` folder
2. Name it `cv.pdf`
3. The "Download CV" button will automatically link to it

Example:
\`\`\`
public/
├── cv.pdf        <-- Your resume here
├── images/
└── ...
\`\`\`

## Step 4: Customize Your Portfolio

### Update Projects
Edit `app/components/projects.tsx`:

\`\`\`typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description here",
    image: "/path-to-image.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/your-username/repo",
    liveUrl: "https://your-project.com",
    isPrivate: false,
    category: "web",
  },
  // Add more projects...
]
\`\`\`

### Update Skills
Edit `app/components/skills.tsx`:

\`\`\`typescript
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "TypeScript", proficiency: 90 },
      // Add your skills...
    ],
  },
  // Add more categories...
]
\`\`\`

### Update About Section
Edit `app/components/about.tsx`:
- Change education entries
- Update biography
- Modify timeline events

## Step 5: Run Locally

Start the development server:

\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Common Commands

\`\`\`bash
# Development
npm run dev              # Start dev server (hot reload)

# Production
npm run build            # Build for production
npm start               # Start production server

# Linting
npm run lint            # Check code quality

# Troubleshooting
rm -rf .next           # Clear Next.js cache
npm install            # Reinstall dependencies
\`\`\`

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `RESEND_API_KEY`
6. Click Deploy
7. Your site is live!

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Add environment variables in Site Settings
6. Deploy

### Option 3: Self-Hosted

\`\`\`bash
# Build for production
npm run build

# Start server (production mode)
npm start

# Or use a process manager like PM2
npm install -g pm2
pm2 start "npm start" --name portfolio
\`\`\`

## Troubleshooting

### Port 3000 already in use
\`\`\`bash
npm run dev -- -p 3001
# Or kill the process using port 3000
lsof -i :3000
kill -9 <PID>
\`\`\`

### Dependencies won't install
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
\`\`\`

### Environment variables not working
1. Make sure `.env.local` file exists in root directory
2. Restart dev server after adding env vars
3. Never commit `.env.local` to GitHub (add to `.gitignore`)

### AI Chatbot not responding
1. Check if `OPENAI_API_KEY` is valid
2. Verify API key has available credits
3. Check browser console for errors

### Contact form not sending
1. Verify `RESEND_API_KEY` is correct
2. Update recipient email in `send-email/route.ts`
3. Check Resend dashboard for email logs

## File Structure

\`\`\`
portfolio/
├── app/
│   ├── api/                    # API routes
│   │   ├── chat/route.ts      # OpenAI chat endpoint
│   │   └── send-email/route.ts # Resend email endpoint
│   ├── components/             # React components
│   │   ├── hero.tsx
│   │   ├── ai-chatbot.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   ├── contact.tsx
│   │   └── [more components...]
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
│
├── components/
│   └── ui/                     # shadcn/ui components (50+)
│
├── public/
│   ├── cv.pdf                  # Your resume
│   ├── images/                 # Project images
│   └── [assets...]
│
├── .env.local                  # Environment variables (NEVER commit!)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.mjs             # Next.js config
└── tailwind.config.js          # Tailwind CSS config
\`\`\`

## Best Practices

✅ **Do:**
- Keep `.env.local` out of version control
- Test locally before deploying
- Use meaningful commit messages
- Update project images for better visuals
- Keep dependencies updated regularly

❌ **Don't:**
- Commit API keys to GitHub
- Hardcode secrets in code
- Forget to add your email to contact form
- Use old project images or screenshots

## Next Steps

1. Customize all your information
2. Add high-quality project images
3. Deploy to Vercel
4. Set up custom domain (optional)
5. Monitor analytics in Vercel dashboard
6. Share your portfolio with the world!

## Need Help?

- Check Next.js docs: [nextjs.org](https://nextjs.org)
- Tailwind CSS docs: [tailwindcss.com](https://tailwindcss.com)
- OpenAI docs: [platform.openai.com](https://platform.openai.com/docs)
- Resend docs: [resend.com/docs](https://resend.com/docs)

---

**Happy deploying! 🚀**
