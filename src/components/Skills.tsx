'use client'

import { usePortfolio } from '@/hooks/usePortfolio'

export default function Skills() {
  const { skills, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="skills" className="py-20 px-6 bg-dark-blue">
        <div className="container mx-auto text-center">
          <div className="text-light-blue">Chargement des compétences...</div>
        </div>
      </section>
    )
  }

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <section id="skills" className="py-20 px-6 bg-dark-blue">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Compétences</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="card">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-light-blue font-medium">{skill.name}</span>
                        <span className="text-orange font-medium">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange to-light-orange h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
