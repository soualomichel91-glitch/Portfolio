'use client'

import { useState } from 'react'
import { GraduationCap, Briefcase, Award, BookOpen } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Education } from '@/lib/data'

export default function Parcours() {
  const { education } = usePortfolio()
  const [activeFilter, setActiveFilter] = useState<'all' | 'scolaire' | 'universitaire' | 'professionnel' | 'formation'>('all')

  const filteredEducation = education.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scolaire': return <GraduationCap size={20} />
      case 'universitaire': return <BookOpen size={20} />
      case 'professionnel': return <Briefcase size={20} />
      case 'formation': return <Award size={20} />
      default: return <BookOpen size={20} />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scolaire': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'universitaire': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'professionnel': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'formation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Présent'
    const [year, month] = dateString.split('-')
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  return (
    <section id="parcours" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Mon Parcours</h2>
          <p className="text-light-blue text-lg">Découvrez mon parcours éducatif et professionnel</p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'all', label: 'Tout', icon: <BookOpen size={18} /> },
            { id: 'scolaire', label: 'Scolaire', icon: <GraduationCap size={18} /> },
            { id: 'universitaire', label: 'Universitaire', icon: <BookOpen size={18} /> },
            { id: 'professionnel', label: 'Professionnel', icon: <Briefcase size={18} /> },
            { id: 'formation', label: 'Formation', icon: <Award size={18} /> }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-orange text-white'
                  : 'bg-white/10 text-light-blue hover:bg-white/20 hover:text-white'
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {filteredEducation.map((item, index) => (
            <div key={item.id} className={`card hover-lift animate-fade-in ${getTypeColor(item.type)} border`}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-light-blue font-medium">{item.institution}</p>
                    <p className="text-light-blue text-sm">{item.location}</p>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-orange font-medium">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                    {item.current && (
                      <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        En cours
                      </span>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-white mb-3">{item.description}</p>
                  )}
                  
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEducation.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light-blue text-lg">
              {activeFilter === 'all' 
                ? 'Aucune expérience dans votre parcours pour le moment.'
                : `Aucune expérience de type "${activeFilter}" dans votre parcours.`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
