'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: 'Accueil', href: '#hero', route: '/' },
    { name: 'À propos', href: '#about', route: '/' },
    { name: 'Projets', href: '#projects', route: '/' },
    { name: 'Compétences', href: '#skills', route: '/' },
    { name: 'Parcours', href: '/parcours', route: '/parcours' },
    { name: 'Contact', href: '#contact', route: '/' },
  ]

  const handleNavigation = (item: typeof navigation[0]) => {
    setIsMenuOpen(false)
    
    if (item.href === '#hero') {
      // Cas spécial pour Accueil - toujours scroller en haut
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (pathname === item.route) {
      // Si on est déjà sur la bonne page, scroller vers l'ancre
      if (item.href.startsWith('#')) {
        const element = document.getElementById(item.href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // Sinon, naviguer vers la page
      if (item.href.startsWith('/')) {
        // C'est une route complète (comme /parcours)
        router.push(item.href)
      } else {
        // C'est une ancre, naviguer vers la page puis scroller
        router.push(item.route + item.href)
      }
    }
  }

  return (
    <header className="fixed top-0 w-full bg-night-blue/90 backdrop-blur-md z-50 border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SM</span>
            </div>
            <span className="text-white font-semibold text-xl">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className="text-light-blue hover:text-orange transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className="block py-2 text-light-blue hover:text-orange transition-colors duration-200 w-full text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
