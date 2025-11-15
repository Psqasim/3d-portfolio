# 🚀 Muhammad Qasim's Portfolio

> A modern, animated, and interactive 3D portfolio website showcasing full stack development skills, AI expertise, and creative projects.

## What's Inside?

This portfolio is built with cutting-edge web technologies and features:

- **3D Interactive Hero** - Particle-based 3D background that responds to your screen
- **AI Chatbot** - Talk with Qasim's AI Assistant powered by OpenAI to learn about projects and skills
- **Project Showcase** - Beautiful project gallery with filtering by category (Web, AI, Portfolio)
- **Skills Dashboard** - Animated proficiency bars and star ratings for technical expertise
- **Contact System** - Direct email integration for inquiries and opportunities
- **Dark/Light/System Mode** - Seamless theme switching with system preference detection
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop screens
- **Performance Optimized** - Built with Next.js 16 and optimized assets

## Tech Stack

This portfolio is crafted with:

- **Frontend**: Next.js 16 (App Router), React 19.2, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui (50+ components)
- **Interactivity**: Framer Motion for animations, Canvas for 3D effects
- **AI Integration**: OpenAI API for intelligent chatbot
- **Email**: Resend API for contact form
- **Icons**: Lucide React
- **Themes**: next-themes with system mode support

## Features Breakdown

### 🎨 Hero Section
- Animated 3D particle background
- Tilt effect on hero image card
- Quick action buttons (View Projects, Download CV, Hire Me)

### 🤖 AI Assistant
- Floating chat widget with preview popup
- Context-aware responses about your work
- Mobile-optimized chat interface
- Smooth animations and transitions

### 📂 Projects Gallery
- Categorized filtering system
- Image previews for each project
- Status badges (Completed, In Progress)
- Private repository indicators
- Live demo and GitHub links

### 💡 Skills Section
- Animated proficiency bars
- Star ratings for skill levels
- Color-coded categories
- Staggered entrance animations

### 📬 Contact Section
- Email form with validation
- Resend API integration
- Real-time feedback messages
- Social media links (Email, Twitter, LinkedIn)

### 🌓 Theme System
- Light Mode - Clean and bright
- Dark Mode - Easy on the eyes
- System Mode - Follows your OS preference
- Smooth transitions between themes

## Quick Start

To run this project locally:

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables (see SETUP.md)
cp .env.example .env.local

# Start development server
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the magic!

## Environment Variables

You'll need these API keys to enable all features:

\`\`\`env
OPENAI_API_KEY=your_openai_key_here
RESEND_API_KEY=your_resend_key_here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

See `SETUP.md` for detailed setup instructions.

## Project Structure

\`\`\`
app/
├── api/                    # Route handlers
│   ├── chat/route.ts      # AI chatbot API
│   └── send-email/route.ts # Contact form API
├── components/             # React components
│   ├── hero.tsx           # Hero section with 3D effects
│   ├── ai-chatbot.tsx     # Chat widget
│   ├── projects.tsx       # Project gallery
│   ├── skills.tsx         # Skills section
│   ├── contact.tsx        # Contact form
│   └── [more components]
├── page.tsx               # Home page
└── globals.css            # Global styles
\`\`\`

## Customization

### Update Your Info
- Edit project data in `app/components/projects.tsx`
- Update skills in `app/components/skills.tsx`
- Modify about section in `app/components/about.tsx`
- Change contact email in `app/api/send-email/route.ts`

### Styling
- Colors: Modify CSS variables in `app/globals.css`
- Theme: Edit theme provider in `app/components/theme-provider.tsx`
- Animations: Update Tailwind config in `globals.css`

### Add Your CV
- Place your CV PDF in `/public/cv.pdf`
- The Download CV button will automatically link to it

## Deployment

### Deploy to Vercel (Recommended)
\`\`\`bash
# Connect your GitHub repo to Vercel
# Add environment variables in Vercel dashboard
# Push to GitHub and it auto-deploys!
\`\`\`

### Or Deploy Manually
\`\`\`bash
npm run build
npm run start
\`\`\`

## Performance Tips

- Images are optimized with Next.js Image component
- Code splitting for faster page loads
- Dark mode preference detection (no flash)
- Lazy loading for off-screen components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 12+, Android 5+)

## License

Built with love by Muhammad Qasim ✨

---

**Made with Next.js 16 • Tailwind CSS 4 • Shadcn/UI • TypeScript**

Have questions? Hit up the AI chatbot or reach out through the contact form!
