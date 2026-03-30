'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const { projects, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="text-light-blue">Chargement des projets...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Projets</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-medium-blue to-dark-blue rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{project.title}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-light-blue mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange/20 text-orange rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-light-blue hover:text-orange transition-colors duration-200"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-light-blue hover:text-orange transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
