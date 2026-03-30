'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function Contact() {
  const { personalInfo, loading } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Message envoyé avec succès!')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="text-light-blue">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Contact</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Parlons de votre projet</h3>
                <p className="text-light-blue text-lg leading-relaxed">
                  Je suis toujours intéressé par de nouveaux défis et opportunités. 
                  N'hésitez pas à me contacter pour discuter de vos idées ou projets.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-light-blue">{personalInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center">
                    <Phone className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Téléphone</div>
                    <div className="text-light-blue">{personalInfo.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Localisation</div>
                    <div className="text-light-blue">{personalInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
