"use client"
import { ExternalLink, Github, Sparkles, Lock } from 'lucide-react'
import { useState } from "react"
import Image from "next/image"

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const projects = [
    {
      title: "E-commerce Website",
      description: "A full-featured e-commerce platform built with modern web technologies.",
      image: "/ecommerce-dashboard.png",
      stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Stripe", "Clerk"],
      category: "web",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      isPrivateRepo: false,
      status: "completed",
    },
    {
      title: "Chicken Ordering System",
      description: "Order management system with email confirmations and real-time updates.",
      image: "/food-ordering-app-interface.jpg",
      stack: ["Next.js", "SendGrid", "Stripe", "Vercel"],
      category: "web",
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
      isPrivateRepo: true,
      status: "completed",
    },
    {
      title: "Resume Portfolio",
      description: "Personal portfolio showcasing projects and professional experience.",
      image: "/portfolio-website-showcase.jpg",
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      category: "portfolio",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      isPrivateRepo: false,
      status: "in-progress",
    },
    {
      title: "AI Agentic Assignments",
      description: "Advanced AI-powered agent projects demonstrating autonomous capabilities.",
      image: "/artificial-intelligence-machine-learning.png",
      stack: ["Python", "AI SDK", "LangChain", "OpenAI"],
      category: "ai",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      isPrivateRepo: true,
      status: "completed",
    },
  ]

  const categories = ["all", "web", "ai", "portfolio"]

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-accent" size={24} />
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid - 3 columns on lg, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-lg overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-4px]"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
                    Featured
                  </div>
                )}
                {project.status && (
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === "completed" 
                      ? "bg-green-500/90 text-white" 
                      : "bg-blue-500/90 text-white"
                  }`}>
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.isPrivateRepo ? (
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
                      <Lock size={16} />
                      Private
                    </div>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                      aria-label="View source code"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
