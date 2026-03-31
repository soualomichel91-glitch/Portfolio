'use client'

import { useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { ExternalLink, Github, Eye, Calendar, Filter, Search } from 'lucide-react'

export default function Projects() {
  const { projects, loading } = usePortfolio()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTech, setFilterTech] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="text-light-blue">Chargement des projets...</div>
        </div>
      </section>
    )
  }

  // Extraire toutes les technologies uniques
  const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies)))

  // Filtrer les projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTech = !filterTech || project.technologies.includes(filterTech)
    return matchesSearch && matchesTech
  })

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-light-blue text-lg max-w-2xl mx-auto">
              Découvrez mes réalisations et les technologies que j'utilise
            </p>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200"
                />
              </div>
              
              <select
                value={filterTech}
                onChange={(e) => setFilterTech(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange transition-colors duration-200"
              >
                <option value="">Toutes les technologies</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-orange text-white' 
                      : 'bg-white/10 text-light-blue hover:bg-white/20'
                  }`}
                >
                  Grille
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-orange text-white' 
                      : 'bg-white/10 text-light-blue hover:bg-white/20'
                  }`}
                >
                  Liste
                </button>
              </div>
            </div>

            {/* Résultats */}
            <div className="text-light-blue">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
            </div>
          </div>
          
          {/* Vue Grille */}
          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="card group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-medium-blue to-dark-blue rounded-lg flex items-center justify-center group-hover:from-orange group-hover:to-light-orange transition-all duration-300">
                      <span className="text-white text-2xl font-bold">{project.title}</span>
                    </div>
                    
                    {/* Overlay avec bouton de vue rapide */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="text-white" size={32} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-light-blue mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-orange/20 text-orange rounded-full text-sm hover:bg-orange hover:text-white transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-white/20 text-light-blue rounded-full text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-light-blue hover:text-orange transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-light-blue hover:text-orange transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>

                  {/* Détails étendus */}
                  {selectedProject === project.id && (
                    <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
                      <p className="text-light-blue text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-orange/20 text-orange rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-primary text-sm px-3 py-1">
                          Voir le projet
                        </button>
                        <button className="btn-secondary text-sm px-3 py-1">
                          En savoir plus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Vue Liste */}
          {viewMode === 'list' && (
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="card group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 h-32 bg-gradient-to-br from-medium-blue to-dark-blue rounded-lg flex items-center justify-center group-hover:from-orange group-hover:to-light-orange transition-all duration-300 flex-shrink-0">
                      <span className="text-white text-lg font-bold text-center px-2">{project.title}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-orange transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          <a
                            href={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-light-blue hover:text-orange transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={18} />
                          </a>
                          <a
                            href={project.demo}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-light-blue hover:text-orange transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                      
                      <p className="text-light-blue mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-orange/20 text-orange rounded-full text-sm hover:bg-orange hover:text-white transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Message si aucun résultat */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-light-blue text-lg mb-4">
                Aucun projet ne correspond à votre recherche
              </div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterTech('')
                }}
                className="btn-primary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
