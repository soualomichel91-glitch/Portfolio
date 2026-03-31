import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Parcours from '@/components/Parcours'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-night-blue">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Parcours />
      <Contact />
      <Footer />
    </main>
  )
}
