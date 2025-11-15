"use client"

import { useEffect, useRef } from "react"

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system for 3D effect
    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2
        this.y = Math.random() * canvas.height - canvas.height / 2
        this.z = Math.random() * 1000
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.vz = (Math.random() - 0.5) * 5
        this.size = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz

        // Reset position if out of bounds
        if (Math.abs(this.x) > canvas.width / 2) this.vx *= -1
        if (Math.abs(this.y) > canvas.height / 2) this.vy *= -1
        if (this.z > 1000 || this.z < 0) this.vz *= -1
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Calculate depth-based opacity and size
        const scale = this.z / 1000
        const opacity = scale * 0.8
        const screenX = this.x + canvas.width / 2
        const screenY = this.y + canvas.height / 2
        const size = this.size * (1 - scale * 0.5)

        ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      // Clear canvas with fade effect for trail
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      // Draw connecting lines
      ctx.strokeStyle = "rgba(100, 200, 255, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x + canvas.width / 2, particles[i].y + canvas.height / 2)
            ctx.lineTo(particles[j].x + canvas.width / 2, particles[j].y + canvas.height / 2)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20 bg-gradient-to-b from-background via-background to-background/80"
    />
  )
}
