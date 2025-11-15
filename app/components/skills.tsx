"use client"
import { Code2, Database, Cpu, Wrench, Star } from "lucide-react"
import { useState, useEffect } from "react"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      color: "text-blue-500",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      color: "text-green-500",
      skills: [
        { name: "REST APIs", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Sanity.io", level: 85 },
        { name: "Stripe", level: 80 },
        { name: "SendGrid", level: 75 },
        { name: "Clerk Auth", level: 85 },
      ],
    },
    {
      title: "AI & Agents",
      icon: Cpu,
      color: "text-purple-500",
      skills: [
        { name: "Python", level: 80 },
        { name: "AI SDK", level: 85 },
        { name: "LangChain", level: 75 },
        { name: "Agentic AI", level: 70 },
        { name: "Machine Learning", level: 65 },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      color: "text-orange-500",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Vercel", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Postman", level: 80 },
        { name: "npm/yarn", level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon
            return (
              <div
                key={idx}
                className={`glass p-6 rounded-lg hover:shadow-lg transition-all ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-muted`}>
                    <Icon className={`${category.color}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < Math.ceil(skill.level / 20) ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out ${
                            isVisible ? "translate-x-0" : "-translate-x-full"
                          }`}
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${idx * 100 + 200}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
