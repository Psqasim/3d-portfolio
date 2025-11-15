"use client"
import { BookOpen, Award, Gamepad2, Trophy, Briefcase, Target } from "lucide-react"

export function About() {
  const education = [
    {
      title: "Certified AI, Metaverse & Web 3.0 Developer",
      institution: "GIAIC (Governor Initiative for Artificial Intelligence)",
      year: "2024 to Present",
      description: "Advanced certification in AI integration, Metaverse technologies, and Web 3.0 development",
    },
    {
      title: "Intermediate",
      institution: "Govt Islamia Science College",
      year: "2019",
      description: "Completed intermediate studies with focus on science and mathematics",
    },
    {
      title: "Matriculation",
      institution: "Bahria Model School",
      year: "2017",
      description: "Foundation education with strong academic performance",
    },
  ]

  const hobbies = [
    { icon: Gamepad2, label: "Gaming" },
    { icon: Trophy, label: "Football" },
    { icon: BookOpen, label: "Coding" },
  ]

  const skills = ["Communication", "Time Management", "Teamwork", "Fast Learner"]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Bio */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <Target className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-2">My Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate Full Stack Developer with expertise in building modern web applications. Certified in
                  AI, Metaverse, and Web 3.0 technologies, I combine creative problem-solving with technical excellence
                  to deliver impactful solutions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-2">My Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  My journey in tech has equipped me with a diverse skill set spanning frontend and backend development,
                  AI integration, and emerging technologies. I'm committed to continuous learning and staying at the
                  forefront of technological innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="text-accent" />
              Education
            </h3>
            <div className="space-y-4 relative before:absolute before:left-2 before:top-8 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-transparent">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-accent rounded-full border-2 border-background" />
                  <div className="glass p-4 rounded-lg hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-foreground">{edu.title}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-accent font-medium mt-1">{edu.year}</p>
                    <p className="text-xs text-muted-foreground mt-2">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills & Hobbies */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="glass p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-accent" size={20} />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="glass p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Hobbies & Interests</h3>
            <div className="flex flex-wrap gap-4">
              {hobbies.map((hobby) => {
                const Icon = hobby.icon
                return (
                  <div
                    key={hobby.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Icon className="text-accent" size={24} />
                    <span className="text-sm font-medium">{hobby.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
