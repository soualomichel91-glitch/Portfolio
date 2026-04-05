'use client'

import { useState, useEffect } from 'react'
import { Project, Skill, PersonalInfo, Education, defaultProjects, defaultSkills, defaultPersonalInfo, defaultEducation } from '@/lib/data'

export function usePortfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo)
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Charger les données depuis localStorage ou utiliser les valeurs par défaut
    if (typeof window !== 'undefined') {
      const loadData = () => {
        const savedProjects = localStorage.getItem('portfolio_projects')
        const savedSkills = localStorage.getItem('portfolio_skills')
        const savedPersonalInfo = localStorage.getItem('portfolio_personalInfo')
        const savedEducation = localStorage.getItem('portfolio_education')

        setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects)
        setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills)
        setPersonalInfo(savedPersonalInfo ? JSON.parse(savedPersonalInfo) : defaultPersonalInfo)
        setEducation(savedEducation ? JSON.parse(savedEducation) : defaultEducation)
        setLoading(false)
      }

      loadData()

      // Écouteurs d'événements pour la synchronisation en temps réel
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'portfolio_projects' && e.newValue) {
          setProjects(JSON.parse(e.newValue))
        } else if (e.key === 'portfolio_skills' && e.newValue) {
          setSkills(JSON.parse(e.newValue))
        } else if (e.key === 'portfolio_personalInfo' && e.newValue) {
          setPersonalInfo(JSON.parse(e.newValue))
        } else if (e.key === 'portfolio_education' && e.newValue) {
          setEducation(JSON.parse(e.newValue))
        }
      }

      // Écouteur d'événements personnalisés pour la synchronisation intra-fenêtre
      const handlePortfolioUpdate = (e: CustomEvent) => {
        const { type, data } = e.detail
        switch (type) {
          case 'projects':
            setProjects(data)
            break
          case 'skills':
            setSkills(data)
            break
          case 'personalInfo':
            setPersonalInfo(data)
            break
          case 'education':
            setEducation(data)
            break
        }
      }

      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('portfolioUpdate', handlePortfolioUpdate as EventListener)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('portfolioUpdate', handlePortfolioUpdate as EventListener)
      }
    } else {
      // Pour le build statique (Vercel), utiliser les données par défaut mises à jour
      setProjects(defaultProjects)
      setSkills(defaultSkills)
      setPersonalInfo(defaultPersonalInfo)
      setEducation(defaultEducation)
      setLoading(false)
    }
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_projects', JSON.stringify(newProjects))
      // Émettre un événement personnalisé pour la synchronisation intra-fenêtre
      window.dispatchEvent(new CustomEvent('portfolioUpdate', {
        detail: { type: 'projects', data: newProjects }
      }))
    }
  }

  const saveSkills = (newSkills: Skill[]) => {
    setSkills(newSkills)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_skills', JSON.stringify(newSkills))
      window.dispatchEvent(new CustomEvent('portfolioUpdate', {
        detail: { type: 'skills', data: newSkills }
      }))
    }
  }

  const savePersonalInfo = (newPersonalInfo: PersonalInfo) => {
    setPersonalInfo(newPersonalInfo)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_personalInfo', JSON.stringify(newPersonalInfo))
      window.dispatchEvent(new CustomEvent('portfolioUpdate', {
        detail: { type: 'personalInfo', data: newPersonalInfo }
      }))
    }
  }

  const saveEducation = (newEducation: Education[]) => {
    setEducation(newEducation)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_education', JSON.stringify(newEducation))
      window.dispatchEvent(new CustomEvent('portfolioUpdate', {
        detail: { type: 'education', data: newEducation }
      }))
    }
  }

  return {
    projects,
    skills,
    personalInfo,
    education,
    loading,
    saveProjects,
    saveSkills,
    savePersonalInfo,
    saveEducation
  }
}
