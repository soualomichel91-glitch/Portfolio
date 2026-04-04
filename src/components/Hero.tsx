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
        // Générer un CV PDF avec le style bicolore
        const pdf = new jsPDF()
        
        console.log('Début génération CV style bicolore...')
        
        // Récupérer toutes les données
        const educationData = JSON.parse(localStorage.getItem('portfolio_education') || '[]')
        const skillsData = JSON.parse(localStorage.getItem('portfolio_skills') || '[]')
        const projectsData = JSON.parse(localStorage.getItem('portfolio_projects') || '[]')
        
        // Configuration des colonnes
        const leftColX = 20
        const rightColX = 80
        const pageWidth = 210
        const leftColWidth = 60
        const rightColWidth = pageWidth - rightColX - 20
        
        // Colonne gauche (fond noir)
        pdf.setFillColor(0, 0, 0)
        pdf.rect(0, 0, leftColWidth + 20, 297, 'F')
        
        // Photo de profil dans la colonne gauche
        let yPosition = 30
        if (personalInfo.profilePhoto) {
          try {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            await new Promise<void>((resolve) => {
              img.onload = () => resolve()
              img.src = personalInfo.profilePhoto!
            })
            
            // Cadre blanc pour la photo
            pdf.setFillColor(255, 255, 255)
            pdf.rect(leftColX + 5, yPosition, 50, 50, 'F')
            pdf.addImage(img, 'JPEG', leftColX + 5, yPosition, 50, 50)
            yPosition += 60
          } catch (error) {
            console.log('Erreur lors de l\'ajout de la photo:', error)
            // Initial si pas de photo
            pdf.setFillColor(255, 255, 255)
            pdf.rect(leftColX + 5, yPosition, 50, 50, 'F')
            pdf.setTextColor(0, 0, 0)
            pdf.setFontSize(24)
            pdf.setFont('helvetica', 'bold')
            const initials = personalInfo.name.split(' ').map(n => n[0]).join('')
            pdf.text(initials, leftColX + 30, yPosition + 30, { align: 'center' })
            yPosition += 60
          }
        }
        
        // Coordonnées dans la colonne gauche
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.text('CONTACT', leftColX, yPosition)
        yPosition += 8
        
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.text(personalInfo.location || 'Conakry, Guinée', leftColX, yPosition)
        yPosition += 6
        pdf.text(personalInfo.email || 'soualomichel91@gmail.com', leftColX, yPosition)
        yPosition += 6
        pdf.text(personalInfo.phone || '+224620157184', leftColX, yPosition)
        yPosition += 10
        
        // Langues
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.text('LANGUES', leftColX, yPosition)
        yPosition += 8
        
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.text('Français - Natif', leftColX, yPosition)
        yPosition += 6
        pdf.text('Anglais - Professionnel', leftColX, yPosition)
        yPosition += 10
        
        // Compétences
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.text('COMPÉTENCES', leftColX, yPosition)
        yPosition += 8
        
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        if (skillsData.length > 0) {
          const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
            if (!acc[skill.category]) acc[skill.category] = []
            acc[skill.category].push(skill)
            return acc
          }, {})
          
          Object.entries(skillsByCategory).forEach(([category, skills]: [string, any]) => {
            pdf.text(category.toUpperCase(), leftColX, yPosition)
            yPosition += 6
            skills.slice(0, 4).forEach((skill: any) => {
              pdf.text(`• ${skill.name}`, leftColX + 3, yPosition)
              yPosition += 5
            })
            yPosition += 3
          })
        } else {
          pdf.text('• React, Next.js, TypeScript', leftColX + 3, yPosition)
          yPosition += 5
          pdf.text('• Node.js, MongoDB, PostgreSQL', leftColX + 3, yPosition)
          yPosition += 5
          pdf.text('• Git, Docker, AWS', leftColX + 3, yPosition)
          yPosition += 10
        }
        
        // Centres d'intérêt
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.text('CENTRES D\'INTÉRÊT', leftColX, yPosition)
        yPosition += 8
        
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.text('• Développement web', leftColX + 3, yPosition)
        yPosition += 5
        pdf.text('• Technologies', leftColX + 3, yPosition)
        yPosition += 5
        pdf.text('• Lecture', leftColX + 3, yPosition)
        
        // Colonne droite (fond blanc)
        yPosition = 30
        pdf.setFillColor(255, 255, 255)
        pdf.rect(rightColX - 10, 0, rightColWidth + 20, 297, 'F')
        
        // Nom et titre
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(28)
        pdf.setFont('helvetica', 'bold')
        pdf.text(personalInfo.name.toUpperCase(), rightColX, yPosition)
        yPosition += 15
        
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'normal')
        pdf.text(personalInfo.title, rightColX, yPosition)
        yPosition += 15
        
        // Ligne de séparation
        pdf.setDrawColor(0, 0, 0)
        pdf.setLineWidth(0.5)
        pdf.line(rightColX, yPosition, pageWidth - 20, yPosition)
        yPosition += 15
        
        // Description personnelle
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'normal')
        const bioLines = pdf.splitTextToSize(personalInfo.bio, rightColWidth)
        bioLines.forEach((line: string) => {
          pdf.text(line, rightColX, yPosition)
          yPosition += 6
        })
        yPosition += 15
        
        // Expériences professionnelles
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('EXPÉRIENCES PROFESSIONNELLES', rightColX, yPosition)
        yPosition += 12
        
        if (educationData.length > 0) {
          const professionalExp = educationData.filter((exp: any) => exp.type === 'professionnel')
          professionalExp.forEach((exp: any) => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(12)
            pdf.text(exp.title.toUpperCase(), rightColX, yPosition)
            yPosition += 8
            
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(10)
            pdf.text(`${exp.institution} • ${exp.location}`, rightColX, yPosition)
            yPosition += 6
            pdf.text(`${exp.startDate} - ${exp.endDate || 'Présent'}`, rightColX, yPosition)
            yPosition += 8
            
            if (exp.description) {
              const descLines = pdf.splitTextToSize(exp.description, rightColWidth - 10)
              descLines.forEach((line: string) => {
                pdf.text(`• ${line}`, rightColX + 5, yPosition)
                yPosition += 5
              })
            }
            yPosition += 10
          })
        } else {
          // Expérience par défaut
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(12)
          pdf.text('DÉVELOPPEUR FULL STACK', rightColX, yPosition)
          yPosition += 8
          
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.text('Tech Innovations Guinea • Conakry, Guinée', rightColX, yPosition)
          yPosition += 6
          pdf.text('2023 - Présent', rightColX, yPosition)
          yPosition += 8
          
          const defaultDesc = [
            'Développement d\'applications web modernes et performantes',
            'Gestion de projet et mentorat d\'équipe',
            'Architecture technique et optimisation des performances',
            'Collaboration avec les équipes produit et design'
          ]
          defaultDesc.forEach(line => {
            pdf.text(`• ${line}`, rightColX + 5, yPosition)
            yPosition += 5
          })
        }
        
        yPosition += 15
        
        // Formations
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('FORMATIONS', rightColX, yPosition)
        yPosition += 12
        
        if (educationData.length > 0) {
          const education = educationData.filter((edu: any) => edu.type === 'universitaire' || edu.type === 'formation')
          education.slice(0, 3).forEach((edu: any) => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(12)
            pdf.text(edu.title.toUpperCase(), rightColX, yPosition)
            yPosition += 8
            
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(10)
            pdf.text(`${edu.institution} • ${edu.location}`, rightColX, yPosition)
            yPosition += 6
            pdf.text(`${edu.startDate} - ${edu.endDate}`, rightColX, yPosition)
            yPosition += 10
          })
        } else {
          // Formations par défaut
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(12)
          pdf.text('MASTER DÉVELOPPEMENT WEB', rightColX, yPosition)
          yPosition += 8
          
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.text('Ecole Supérieure du Numérique • Paris, France', rightColX, yPosition)
          yPosition += 6
          pdf.text('2021 - 2023', rightColX, yPosition)
          yPosition += 10
          
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(12)
          pdf.text('LICENCE INFORMATIQUE', rightColX, yPosition)
          yPosition += 8
          
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.text('Université Paris-Saclay • Orsay, France', rightColX, yPosition)
          yPosition += 6
          pdf.text('2018 - 2021', rightColX, yPosition)
        }
        
        // Télécharger le PDF
        pdf.save(`CV_${personalInfo.name.replace(' ', '_')}_Bicolore.pdf`)
        console.log('CV bicolore généré avec succès!')
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

          
          {/* Main content */}
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-light-blue mb-8">
              {personalInfo.title}
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
