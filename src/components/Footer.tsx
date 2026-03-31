'use client'

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark-blue border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SM</span>
                </div>
                <span className="text-white font-semibold text-xl">Portfolio</span>
              </div>
              <p className="text-light-blue">
                Développeur Web Full Stack passionné par la création d'expériences numériques innovantes.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-light-blue hover:text-orange transition-colors duration-200">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-light-blue hover:text-orange transition-colors duration-200">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-light-blue hover:text-orange transition-colors duration-200">
                    Projets
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-light-blue hover:text-orange transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Réseaux sociaux</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-light-blue hover:bg-orange hover:text-white transition-colors duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-light-blue hover:bg-orange hover:text-white transition-colors duration-200"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:contact@soualomichel.com"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-light-blue hover:bg-orange hover:text-white transition-colors duration-200"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-blue text-sm mb-4 md:mb-0">
              © 2024 Soualo Michel. Tous droits réservés.
            </p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-light-blue hover:text-orange transition-colors duration-200"
            >
              <ArrowUp size={20} />
              Retour en haut
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
