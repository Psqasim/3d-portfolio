"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"

export function HeroImage() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return (
    <div className="relative mt-12 flex justify-center">
      <div
        className="w-full max-w-sm h-96 perspective cursor-pointer transition-transform duration-300"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass shadow-2xl">
          <Image
            src="/qas2.png"
            alt="Developer working with AI"
            fill
            priority
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
