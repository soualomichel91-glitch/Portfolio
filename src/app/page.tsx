'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Parcours from '@/components/Parcours'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { SyncNotificationContainer } from '@/components/SyncNotification'
import { useSyncNotification } from '@/hooks/useSyncNotification'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function Home() {
  const { notifications, showNotification, hideNotification } = useSyncNotification()
  const { saveProjects, saveSkills, savePersonalInfo, saveEducation } = usePortfolio()

  useEffect(() => {
    // Écouter les mises à jour du portfolio pour afficher des notifications
    const handlePortfolioUpdate = (e: CustomEvent) => {
      const { type, data } = e.detail
      
      let message = ''
      switch (type) {
        case 'projects':
          message = 'Projets mis à jour en temps réel'
          break
        case 'skills':
          message = 'Compétences mises à jour en temps réel'
          break
        case 'personalInfo':
          message = 'Informations personnelles mises à jour en temps réel'
          break
        case 'education':
          message = 'Parcours mis à jour en temps réel'
          break
        default:
          message = 'Données synchronisées'
      }
      
      showNotification(message, 'success')
    }

    window.addEventListener('portfolioUpdate', handlePortfolioUpdate as EventListener)

    return () => {
      window.removeEventListener('portfolioUpdate', handlePortfolioUpdate as EventListener)
    }
  }, [showNotification])

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
      <SyncNotificationContainer notifications={notifications} onHide={hideNotification} />
    </main>
  )
}
