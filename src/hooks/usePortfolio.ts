'use client'

import { useState, useEffect } from 'react'
import { Project, Skill, PersonalInfo, defaultProjects, defaultSkills, defaultPersonalInfo } from '@/lib/data'

export function usePortfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Charger les données depuis localStorage ou utiliser les valeurs par défaut
    const savedProjects = localStorage.getItem('portfolio_projects')
    const savedSkills = localStorage.getItem('portfolio_skills')
    const savedPersonalInfo = localStorage.getItem('portfolio_personalInfo')

    setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects)
    setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills)
    setPersonalInfo(savedPersonalInfo ? JSON.parse(savedPersonalInfo) : defaultPersonalInfo)
    setLoading(false)
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects))
  }

  const saveSkills = (newSkills: Skill[]) => {
    setSkills(newSkills)
    localStorage.setItem('portfolio_skills', JSON.stringify(newSkills))
  }

  const savePersonalInfo = (newPersonalInfo: PersonalInfo) => {
    setPersonalInfo(newPersonalInfo)
    localStorage.setItem('portfolio_personalInfo', JSON.stringify(newPersonalInfo))
  }

  return {
    projects,
    skills,
    personalInfo,
    loading,
    saveProjects,
    saveSkills,
    savePersonalInfo
  }
}
