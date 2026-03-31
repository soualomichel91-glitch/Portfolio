'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Check, AlertCircle, User, MessageSquare } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const { personalInfo, loading } = usePortfolio()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({} as Partial<Record<keyof FormData, boolean>>)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (formData.phone && !/^[+]?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis'
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Le sujet doit contenir au moins 3 caractères'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Le message ne doit pas dépasser 1000 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Valider en temps réel
    if (touched[name as keyof FormData]) {
      validateForm()
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name as keyof FormData]: true }))
    validateForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Marquer tous les champs comme touchés
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Partial<Record<keyof FormData, boolean>>)
    setTouched(allTouched)
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simuler une validation (90% de succès)
      if (Math.random() > 0.1) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTouched({} as Partial<Record<keyof FormData, boolean>>)
        setErrors({})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (fieldName: keyof FormErrors) => {
    return touched[fieldName] ? errors[fieldName] : ''
  }

  const getCharacterCount = () => {
    return `${formData.message.length}/1000`
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
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Animation de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-orange/5 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient">Contact</span>
            </h2>
            <p className="text-light-blue text-lg max-w-2xl mx-auto">
              Une idée en tête ? Discutons de votre projet ensemble
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="text-orange" size={28} />
                  Parlons de votre projet
                </h3>
                <p className="text-light-blue text-lg leading-relaxed">
                  Je suis toujours intéressé par de nouveaux défis et opportunités. 
                  N'hésitez pas à me contacter pour discuter de vos idées ou projets.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center group-hover:bg-orange/30 transition-colors duration-200">
                    <Mail className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-light-blue hover:text-orange transition-colors duration-200 cursor-pointer">
                      {personalInfo.email}
                    </div>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center group-hover:bg-orange/30 transition-colors duration-200">
                    <Phone className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Téléphone</div>
                    <div className="text-light-blue hover:text-orange transition-colors duration-200 cursor-pointer">
                      {personalInfo.phone}
                    </div>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center group-hover:bg-orange/30 transition-colors duration-200">
                    <MapPin className="text-orange" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Localisation</div>
                    <div className="text-light-blue hover:text-orange transition-colors duration-200 cursor-pointer">
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="card">
                <h4 className="text-lg font-semibold text-white mb-4">Temps de réponse</h4>
                <p className="text-light-blue text-sm">
                  Je m'engage à répondre à votre message dans les 24 à 48 heures ouvrées. 
                  Pour les urgences, n'hésitez pas à m'appeler directement.
                </p>
              </div>
            </div>
            
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3 animate-fade-in">
                    <Check className="text-green-400" size={20} />
                    <div className="text-green-400">
                      <div className="font-medium">Message envoyé avec succès !</div>
                      <div className="text-sm">Je vous répondrai dans les plus brefs délais.</div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3 animate-fade-in">
                    <AlertCircle className="text-red-400" size={20} />
                    <div className="text-red-400">
                      <div className="font-medium">Erreur lors de l'envoi</div>
                      <div className="text-sm">Veuillez réessayer plus tard ou me contacter directement.</div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2 flex items-center gap-2">
                      <User size={16} />
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 ${
                        getFieldError('name') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20'
                      }`}
                      placeholder="Votre nom"
                      disabled={isSubmitting}
                    />
                    {getFieldError('name') && (
                      <div className="mt-1 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {getFieldError('name')}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 ${
                        getFieldError('email') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20'
                      }`}
                      placeholder="votre@email.com"
                      disabled={isSubmitting}
                    />
                    {getFieldError('email') && (
                      <div className="mt-1 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {getFieldError('email')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 ${
                        getFieldError('phone') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20'
                      }`}
                      placeholder="+33 6 12 34 56 78"
                      disabled={isSubmitting}
                    />
                    {getFieldError('phone') && (
                      <div className="mt-1 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {getFieldError('phone')}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 ${
                        getFieldError('subject') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20'
                      }`}
                      placeholder="Sujet de votre message"
                      disabled={isSubmitting}
                    />
                    {getFieldError('subject') && (
                      <div className="mt-1 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {getFieldError('subject')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 resize-none ${
                        getFieldError('message') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20'
                      }`}
                      placeholder="Décrivez votre projet, vos idées ou vos questions..."
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-light-blue/60">
                      {getCharacterCount()}
                    </div>
                  </div>
                  {getFieldError('message') && (
                    <div className="mt-1 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {getFieldError('message')}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-light-blue">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-orange focus:border-orange"
                  />
                  <label htmlFor="privacy">
                    J'accepte que mes données soient traitées conformément à la politique de confidentialité *
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:animate-bounce" />
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
