"use client"
import { ArrowRight, Download } from 'lucide-react'
import { ThreeDBackground } from "./three-d-background"
import { HeroImage } from "./hero-image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ThreeDBackground />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Text content */}
        <div className="text-center mb-8">
          {/* Animated greeting */}
          <div className="mb-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-muted rounded-full text-sm font-medium">
              Welcome to my portfolio
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Muhammad Qasim</span>
            <br />
            <span className="text-foreground">Full Stack Developer</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Certified AI, Metaverse & Web 3.0 Developer. Building modern web applications with Next.js, TypeScript, and
            cutting-edge technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              View Projects
              <ArrowRight size={20} />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              Download CV
              <Download size={20} />
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              Hire Me
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <HeroImage />

        {/* Scroll indicator */}
        <div className="mt-16 text-center animate-bounce">
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
