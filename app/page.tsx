import { Hero } from "./components/hero"
import { About } from "./components/about"
import { Projects } from "./components/projects"
import { Skills } from "./components/skills"
import { Contact } from "./components/contact"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
