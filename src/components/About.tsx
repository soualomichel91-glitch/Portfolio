'use client'

import { usePortfolio } from '@/hooks/usePortfolio'

export default function About() {
  const { personalInfo, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="about" className="py-20 px-6 bg-dark-blue">
        <div className="container mx-auto text-center">
          <div className="text-light-blue">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-6 bg-dark-blue">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">À propos</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="card">
              <div className="w-64 h-64 bg-gradient-to-br from-orange to-light-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{personalInfo.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-light-blue text-lg leading-relaxed">
                {personalInfo.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2">3+</div>
                  <div className="text-light-blue">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2">20+</div>
                  <div className="text-light-blue">Projets réalisés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
