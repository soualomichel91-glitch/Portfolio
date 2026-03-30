'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, User, Briefcase, Award, Mail } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
}

interface Skill {
  id: number
  name: string
  category: string
  level: number
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'info'>('projects')
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Plateforme de commerce électronique complète avec panier, paiement et gestion des stocks",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Application de gestion de tâches collaborative avec temps réel et notifications",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://example.com"
    }
  ])

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "React", category: "Frontend", level: 90 },
    { id: 2, name: "Next.js", category: "Frontend", level: 85 },
    { id: 3, name: "Node.js", category: "Backend", level: 80 },
    { id: 4, name: "MongoDB", category: "Backend", level: 70 }
  ])

  const [personalInfo, setPersonalInfo] = useState({
    name: "Soualo Michel",
    title: "Développeur Web Full Stack",
    email: "contact@soualomichel.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    bio: "Passionné par le développement web depuis plusieurs ans, je me spécialise dans la création d'applications modernes et performantes."
  })

  const handleEditProject = (project: Project) => {
    setEditingItem(project)
    setIsEditing(true)
  }

  const handleSaveProject = () => {
    if (editingItem.id) {
      setProjects(projects.map(p => p.id === editingItem.id ? editingItem : p))
    } else {
      setProjects([...projects, { ...editingItem, id: Date.now() }])
    }
    setIsEditing(false)
    setEditingItem(null)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingItem(skill)
    setIsEditing(true)
  }

  const handleSaveSkill = () => {
    if (editingItem.id) {
      setSkills(skills.map(s => s.id === editingItem.id ? editingItem : s))
    } else {
      setSkills([...skills, { ...editingItem, id: Date.now() }])
    }
    setIsEditing(false)
    setEditingItem(null)
  }

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-night-blue p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Administration</h1>
          <p className="text-light-blue">Gérez votre portfolio dynamique</p>
        </div>

        <div className="flex space-x-1 mb-8 bg-white/10 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
              activeTab === 'projects' 
                ? 'bg-orange text-white' 
                : 'text-light-blue hover:text-white'
            }`}
          >
            <Briefcase className="inline mr-2" size={20} />
            Projets
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
              activeTab === 'skills' 
                ? 'bg-orange text-white' 
                : 'text-light-blue hover:text-white'
            }`}
          >
            <Award className="inline mr-2" size={20} />
            Compétences
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
              activeTab === 'info' 
                ? 'bg-orange text-white' 
                : 'text-light-blue hover:text-white'
            }`}
          >
            <User className="inline mr-2" size={20} />
            Infos
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Gestion des projets</h2>
              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    description: '',
                    technologies: [],
                    github: '',
                    demo: ''
                  })
                  setIsEditing(true)
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Ajouter un projet
              </button>
            </div>

            {isEditing && editingItem && !editingItem.category && (
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingItem.id ? 'Modifier le projet' : 'Ajouter un projet'}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none"
                    rows={3}
                  />
                  <input
                    type="text"
                    placeholder="Technologies (séparées par des virgules)"
                    value={editingItem.technologies.join(', ')}
                    onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={editingItem.github}
                    onChange={(e) => setEditingItem({...editingItem, github: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                  />
                  <input
                    type="url"
                    placeholder="Demo URL"
                    value={editingItem.demo}
                    onChange={(e) => setEditingItem({...editingItem, demo: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProject}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save size={20} />
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditingItem(null)
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X size={20} />
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-light-blue mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-orange/20 text-orange rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <a href={project.github} className="text-light-blue hover:text-orange">GitHub</a>
                        <a href={project.demo} className="text-light-blue hover:text-orange">Demo</a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-light-blue hover:text-orange transition-colors duration-200"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-light-blue hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Gestion des compétences</h2>
              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    category: 'Frontend',
                    level: 50
                  })
                  setIsEditing(true)
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Ajouter une compétence
              </button>
            </div>

            {isEditing && editingItem && editingItem.category && (
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingItem.id ? 'Modifier la compétence' : 'Ajouter une compétence'}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom de la compétence"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                  />
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <div>
                    <label className="block text-light-blue mb-2">Niveau: {editingItem.level}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingItem.level}
                      onChange={(e) => setEditingItem({...editingItem, level: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveSkill}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save size={20} />
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditingItem(null)
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X size={20} />
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="card">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                        <span className="text-orange font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-orange to-light-orange h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-light-blue text-sm">{skill.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="p-2 text-light-blue hover:text-orange transition-colors duration-200"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-2 text-light-blue hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Informations personnelles</h2>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Profil</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-light-blue mb-2">Nom</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-light-blue mb-2">Titre</label>
                  <input
                    type="text"
                    value={personalInfo.title}
                    onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-light-blue mb-2">Biographie</label>
                  <textarea
                    value={personalInfo.bio}
                    onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Coordonnées</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-light-blue mb-2">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-light-blue mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-light-blue mb-2">Localisation</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            <button className="btn-primary">
              <Save size={20} className="mr-2" />
              Sauvegarder les informations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
