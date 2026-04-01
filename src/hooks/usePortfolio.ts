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
      const savedProjects = localStorage.getItem('portfolio_projects')
      const savedSkills = localStorage.getItem('portfolio_skills')
      const savedPersonalInfo = localStorage.getItem('portfolio_personalInfo')
      const savedEducation = localStorage.getItem('portfolio_education')

      setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects)
      setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills)
      setPersonalInfo(savedPersonalInfo ? JSON.parse(savedPersonalInfo) : defaultPersonalInfo)
      setEducation(savedEducation ? JSON.parse(savedEducation) : defaultEducation)
    } else {
      // Pour le build statique (Vercel), utiliser les données par défaut mises à jour
      setProjects(defaultProjects)
      setSkills(defaultSkills)
      setPersonalInfo(defaultPersonalInfo)
      setEducation(defaultEducation)
    }
    setLoading(false)
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_projects', JSON.stringify(newProjects))
    }
  }

  const saveSkills = (newSkills: Skill[]) => {
    setSkills(newSkills)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_skills', JSON.stringify(newSkills))
    }
  }

  const savePersonalInfo = (newPersonalInfo: PersonalInfo) => {
    setPersonalInfo(newPersonalInfo)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_personalInfo', JSON.stringify(newPersonalInfo))
    }
  }

  const saveEducation = (newEducation: Education[]) => {
    setEducation(newEducation)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_education', JSON.stringify(newEducation))
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
