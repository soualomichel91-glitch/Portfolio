'use client'

import { useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react'
import jsPDF from 'jspdf'

export default function Hero() {
  const { personalInfo, loading } = usePortfolio()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadCV = async () => {
    setIsDownloading(true)
    
    try {
      if (typeof window !== 'undefined') {
        // Générer un CV PDF dynamique avec toutes les informations
        const pdf = new jsPDF()
        
        let yPosition = 20
        let currentPage = 1
        
        console.log('Début génération CV...')
        
        // En-tête avec photo
        if (personalInfo.profilePhoto) {
          try {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            await new Promise<void>((resolve) => {
              img.onload = () => resolve()
              img.src = personalInfo.profilePhoto!
            })
            
            pdf.addImage(img, 'JPEG', 150, yPosition, 40, 40)
            yPosition = yPosition + 50
          } catch (error) {
            console.log('Erreur lors de l\'ajout de la photo:', error)
          }
        }
        
        // Nom et titre
        pdf.setFontSize(24)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text(personalInfo.name, 20, yPosition)
        yPosition = yPosition + 15
        
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(30, 30, 30)
        pdf.text(personalInfo.title, 20, yPosition)
        yPosition = yPosition + 20
        
        // Ligne de séparation
        pdf.setDrawColor(255, 140, 0)
        pdf.setLineWidth(0.5)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition = yPosition + 15
        
        // Informations de contact
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text('CONTACT', 20, yPosition)
        yPosition = yPosition + 10
        
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(30, 30, 30)
        pdf.setFontSize(10)
        pdf.text(`Email: ${personalInfo.email}`, 20, yPosition)
        yPosition = yPosition + 8
        pdf.text(`Phone: ${personalInfo.phone}`, 20, yPosition)
        yPosition = yPosition + 8
        pdf.text(`Location: ${personalInfo.location}`, 20, yPosition)
        yPosition = yPosition + 15
        
        // Biographie
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text('ABOUT', 20, yPosition)
        yPosition = yPosition + 10
        
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(30, 30, 30)
        pdf.setFontSize(10)
        const bioLines = pdf.splitTextToSize(personalInfo.bio, 170, 10)
        bioLines.forEach((line: string) => {
          pdf.text(line, 20, yPosition)
          yPosition = yPosition + 6
        })
        yPosition = yPosition + 10
        
        console.log('Section ABOUT terminée, yPosition:', yPosition)
        
        // Parcours - ORDRE SPÉCIFIQUE: professionnel, formations, universitaire, scolaire
        const educationData = JSON.parse(localStorage.getItem('portfolio_education') || '[]')
        console.log('Education data:', educationData) // Debug
        
        // Toujours afficher la section Parcours
        if (yPosition > 240) {
          pdf.addPage()
          currentPage++
          console.log('Nouvelle page ajoutée pour PARCOURS, page:', currentPage)
          yPosition = 20
        }
        
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text('PARCOURS', 20, yPosition)
        yPosition = yPosition + 10
        
        if (educationData.length > 0) {
          // Ordre spécifique des types
          const typeOrder = ['professionnel', 'formations', 'universitaire', 'scolaire']
          const sortedEducation = educationData.sort((a: any, b: any) => {
            const aIndex = typeOrder.indexOf(a.type)
            const bIndex = typeOrder.indexOf(b.type)
            if (aIndex === -1) return 1
            if (bIndex === -1) return -1
            return aIndex - bIndex
          })
          
          sortedEducation.slice(0, 8).forEach((item: any) => {
            if (yPosition > 270) {
              pdf.addPage()
              currentPage++
              console.log('Nouvelle page ajoutée dans parcours, page:', currentPage)
              yPosition = 20
            }
            
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(11)
            pdf.text(item.title, 20, yPosition)
            yPosition = yPosition + 7
            
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(9)
            pdf.text(`${item.institution} • ${item.location}`, 20, yPosition)
            yPosition = yPosition + 6
            pdf.text(`${item.startDate} - ${item.endDate || 'Présent'}`, 20, yPosition)
            yPosition = yPosition + 6
            
            if (item.description) {
              const descText = item.description.substring(0, 250)
              const descLines = pdf.splitTextToSize(descText, 170, 9)
              descLines.forEach((line: string) => {
                if (yPosition > 270) {
                  pdf.addPage()
                  currentPage++
                  yPosition = 20
                }
                pdf.text(line, 25, yPosition)
                yPosition = yPosition + 5
              })
            }
            yPosition = yPosition + 8
          })
        } else {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.setTextColor(30, 30, 30)
          pdf.text('Aucune expérience ajoutée pour le moment.', 20, yPosition)
          yPosition = yPosition + 10
          console.log('No education data found') // Debug
        }
        
        console.log('Section PARCOURS terminée, yPosition:', yPosition)
        
        // Compétences
        const skillsData = JSON.parse(localStorage.getItem('portfolio_skills') || '[]')
        console.log('Skills data:', skillsData) // Debug
        
        // Toujours afficher la section Compétences
        if (yPosition > 240) {
          pdf.addPage()
          currentPage++
          console.log('Nouvelle page ajoutée pour COMPÉTENCES, page:', currentPage)
          yPosition = 20
        }
        
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text('COMPÉTENCES', 20, yPosition)
        yPosition = yPosition + 10
        
        if (skillsData.length > 0) {
          // Regrouper par catégorie
          const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
            if (!acc[skill.category]) acc[skill.category] = []
            acc[skill.category].push(skill)
            return acc
          }, {})
          
          Object.entries(skillsByCategory).forEach(([category, skills]: [string, any]) => {
            if (yPosition > 260) {
              pdf.addPage()
              currentPage++
              yPosition = 20
            }
            
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(11)
            pdf.setTextColor(255, 140, 0)
            pdf.text(category.toUpperCase(), 20, yPosition)
            yPosition = yPosition + 8
            
            skills.forEach((skill: any) => {
              pdf.setFont('helvetica', 'normal')
              pdf.setFontSize(10)
              pdf.setTextColor(30, 30, 30)
              pdf.text(`• ${skill.name} - ${skill.level}%`, 25, yPosition)
              yPosition = yPosition + 6
            })
            yPosition = yPosition + 5
          })
        } else {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.setTextColor(30, 30, 30)
          pdf.text('Aucune compétence ajoutée pour le moment.', 20, yPosition)
          yPosition = yPosition + 10
          console.log('No skills data found') // Debug
        }
        
        console.log('Section COMPÉTENCES terminée, yPosition:', yPosition)
        
        // Projets
        const projectsData = JSON.parse(localStorage.getItem('portfolio_projects') || '[]')
        console.log('Projects data:', projectsData) // Debug
        
        // Toujours afficher la section Projets
        if (yPosition > 240) {
          pdf.addPage()
          currentPage++
          console.log('Nouvelle page ajoutée pour PROJETS, page:', currentPage)
          yPosition = 20
        }
        
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 140, 0)
        pdf.text('PROJETS', 20, yPosition)
        yPosition = yPosition + 10
        
        if (projectsData.length > 0) {
          projectsData.slice(0, 6).forEach((project: any) => {
            if (yPosition > 260) {
              pdf.addPage()
              currentPage++
              yPosition = 20
            }
            
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(11)
            pdf.text(project.title, 20, yPosition)
            yPosition = yPosition + 7
            
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(9)
            pdf.setTextColor(30, 30, 30)
            
            if (project.description) {
              const descText = project.description.substring(0, 200)
              const descLines = pdf.splitTextToSize(descText, 170, 9)
              descLines.forEach((line: string) => {
                if (yPosition > 270) {
                  pdf.addPage()
                  currentPage++
                  yPosition = 20
                }
                pdf.text(line, 25, yPosition)
                yPosition = yPosition + 5
              })
            }
            
            if (project.technologies && project.technologies.length > 0) {
              yPosition = yPosition + 3
              pdf.text(`Technologies: ${project.technologies.slice(0, 8).join(', ')}`, 25, yPosition)
            }
            
            if (project.link) {
              yPosition = yPosition + 4
              pdf.text(`Lien: ${project.link}`, 25, yPosition)
            }
            
            yPosition = yPosition + 10
          })
        } else {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.setTextColor(30, 30, 30)
          pdf.text('Aucun projet ajouté pour le moment.', 20, yPosition)
          yPosition = yPosition + 10
          console.log('No projects data found') // Debug
        }
        
        console.log('Section PROJETS terminée, yPosition:', yPosition)
        console.log('Nombre total de pages:', currentPage)
        
        // Télécharger le PDF
        pdf.save(`CV_${personalInfo.name.replace(' ', '_')}.pdf`)
        console.log('CV sauvegardé avec succès!')
      }
    } catch (error) {
      console.error('Erreur lors de la génération du CV:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-night-blue pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
          <p className="text-light-blue mt-4">Chargement...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-night-blue via-dark-blue to-night-blue relative overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-light-orange/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 mt-8">
        <div className="text-center">
          {/* Profile image with animation */}
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange to-light-orange rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-orange">SM</span>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-light-blue mb-8">
              {personalInfo.title}
            </p>
            
            {/* Description */}
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download size={20} />
                )}
                {isDownloading ? 'Génération...' : 'Télécharger CV'}
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={20} />
                Me contacter
              </button>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-blue hover:text-orange transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-blue hover:text-orange transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-orange w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
