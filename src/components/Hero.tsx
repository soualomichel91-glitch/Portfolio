'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const { personalInfo, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="text-light-blue">Chargement...</div>
      </section>
    )
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Bonjour, je suis
            <span className="text-gradient block mt-2">{personalInfo.name}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-light-blue mb-8">
            {personalInfo.title}
          </p>
          
          <p className="text-lg text-light-blue/80 mb-12 max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>
          
          <div className="animate-bounce mt-16">
            <ArrowDown className="text-orange mx-auto" size={32} />
          </div>
        </div>
      </div>
    </section>
  )
}
