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
            <div className="flex justify-center">
              <div className="relative group">
                <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-orange/20 hover:border-orange/40 transition-all duration-300 transform hover:scale-105">
                  {personalInfo.profilePhoto ? (
                    <img
                      src={personalInfo.profilePhoto}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                      style={{
                        transform: personalInfo.photoPosition 
                          ? `scale(${personalInfo.photoPosition.scale}) translate(${personalInfo.photoPosition.x}px, ${personalInfo.photoPosition.y}px)`
                          : 'scale(1) translate(0px, 0px)',
                        objectPosition: 'center'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange via-orange to-light-orange rounded-3xl flex items-center justify-center">
                      <span className="text-white text-7xl font-bold drop-shadow-lg">
                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  
                  {/* Effet de vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Bordure décorative */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange to-light-orange rounded-3xl opacity-20 blur-sm"></div>
                </div>
                
                {/* Élément décoratif */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">SM</span>
                </div>
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
              
              {/* Informations de contact */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full"></div>
                  <span className="text-white font-medium">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full"></div>
                  <span className="text-white font-medium">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full"></div>
                  <span className="text-white font-medium">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
