'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, User, Briefcase, Award, Search, Download, Upload, Eye, EyeOff, Settings, LogOut, Menu, Github, ExternalLink } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { SyncNotificationContainer } from '@/components/SyncNotification'
import { useSyncNotification } from '@/hooks/useSyncNotification'
import AdminParcours from '@/components/AdminParcours'
import AdminCV from '@/components/AdminCV'
import AdminSync from '@/components/AdminSync'

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

interface Education {
  id: number
  type: 'scolaire' | 'universitaire' | 'professionnel' | 'formation'
  title: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
  current?: boolean
  skills?: string[]
}

export default function AdminPage() {
  const { projects, skills, personalInfo, education, saveProjects, saveSkills, savePersonalInfo, saveEducation } = usePortfolio()
  const { notifications, showNotification, hideNotification } = useSyncNotification()
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'info' | 'parcours' | 'cv' | 'settings'>('projects')
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [localProjects, setLocalProjects] = useState<Project[]>(projects)
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills)
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo)
  const [localEducation, setLocalEducation] = useState<Education[]>(education)
  const [photoPosition, setPhotoPosition] = useState({
    scale: 1,
    x: 0,
    y: 0
  })
  const [showPositionControls, setShowPositionControls] = useState(false)

  useEffect(() => {
    setLocalProjects(projects)
    setLocalSkills(skills)
    setLocalPersonalInfo(personalInfo)
    setLocalEducation(education)
    
    // Charger la position de la photo si elle existe
    if (personalInfo.photoPosition) {
      setPhotoPosition(personalInfo.photoPosition)
    }
  }, [projects, skills, personalInfo, education])

  // Le système de notifications est maintenant géré par useSyncNotification()

  const handleSaveProject = async () => {
    setIsLoading(true)
    try {
      if (editingItem.id) {
        const updated = localProjects.map(p => p.id === editingItem.id ? editingItem : p)
        setLocalProjects(updated)
        await saveProjects(updated)
        showNotification('Projet mis à jour avec succès', 'success')
      } else {
        const newProject = { ...editingItem, id: Date.now() }
        const updated = [...localProjects, newProject]
        setLocalProjects(updated)
        await saveProjects(updated)
        showNotification('Projet ajouté avec succès', 'success')
      }
      setIsEditing(false)
      setEditingItem(null)
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
    
    setIsLoading(true)
    try {
      const updated = localProjects.filter(p => p.id !== id)
      setLocalProjects(updated)
      await saveProjects(updated)
      showNotification('Projet supprimé avec succès', 'success')
    } catch (error) {
      showNotification('Erreur lors de la suppression', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSkill = async () => {
    setIsLoading(true)
    try {
      if (editingItem.id) {
        const updated = localSkills.map(s => s.id === editingItem.id ? editingItem : s)
        setLocalSkills(updated)
        await saveSkills(updated)
        showNotification('Compétence mise à jour avec succès', 'success')
      } else {
        const newSkill = { ...editingItem, id: Date.now() }
        const updated = [...localSkills, newSkill]
        setLocalSkills(updated)
        await saveSkills(updated)
        showNotification('Compétence ajoutée avec succès', 'success')
      }
      setIsEditing(false)
      setEditingItem(null)
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) return
    
    setIsLoading(true)
    try {
      const updated = localSkills.filter(s => s.id !== id)
      setLocalSkills(updated)
      await saveSkills(updated)
      showNotification('Compétence supprimée avec succès', 'success')
    } catch (error) {
      showNotification('Erreur lors de la suppression', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEducation = async () => {
    setIsLoading(true)
    try {
      if (editingItem.id) {
        const updated = localEducation.map(e => e.id === editingItem.id ? editingItem : e)
        setLocalEducation(updated)
        await saveEducation(updated)
        showNotification('Parcours mis à jour avec succès', 'success')
      } else {
        const newEducation = { ...editingItem, id: Date.now() }
        const updated = [...localEducation, newEducation]
        setLocalEducation(updated)
        await saveEducation(updated)
        showNotification('Parcours ajouté avec succès', 'success')
      }
      setIsEditing(false)
      setEditingItem(null)
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEducation = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) return
    
    setIsLoading(true)
    try {
      const updated = localEducation.filter(e => e.id !== id)
      setLocalEducation(updated)
      await saveEducation(updated)
      showNotification('Parcours supprimé avec succès', 'success')
    } catch (error) {
      showNotification('Erreur lors de la suppression', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const exportData = () => {
    if (typeof window !== 'undefined') {
      const data = {
        projects: localProjects,
        skills: localSkills,
        personalInfo: localPersonalInfo,
        education: localEducation,
        exportDate: new Date().toISOString()
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
      showNotification('Données exportées avec succès', 'success')
    }
  }

  const handleSavePersonalInfo = async () => {
    setIsLoading(true)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_personalInfo', JSON.stringify(localPersonalInfo))
        showNotification('Informations personnelles sauvegardées', 'success')
      }
    } catch (error) {
      showNotification('Erreur lors de la sauvegarde', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPhotoPosition = () => {
    setPhotoPosition({ scale: 1, x: 0, y: 0 })
    showNotification('Position de la photo réinitialisée', 'info')
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const photoUrl = event.target?.result as string
        setLocalPersonalInfo({...localPersonalInfo, profilePhoto: photoUrl})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader()
      reader.onload = (event) => {
        const cvUrl = event.target?.result as string
        setLocalPersonalInfo({...localPersonalInfo, cvUrl: cvUrl})
        showNotification('CV uploadé avec succès', 'success')
      }
      reader.readAsDataURL(file)
    } else {
      showNotification('Veuillez sélectionner un fichier PDF', 'error')
    }
  }

  const filteredProjects = localProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSkills = localSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEducation = localEducation.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.institution.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-night-blue flex">
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-dark-blue border-r border-white/10 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SM</span>
              </div>
              {sidebarOpen && <span className="text-white font-semibold">Admin</span>}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-light-blue hover:text-orange transition-colors duration-200"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'projects', label: 'Projets', icon: Briefcase },
            { id: 'skills', label: 'Compétences', icon: Award },
            { id: 'parcours', label: 'Parcours', icon: User },
            { id: 'cv', label: 'CV', icon: Download },
            { id: 'info', label: 'Informations', icon: User },
            { id: 'settings', label: 'Paramètres', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-orange text-white'
                  : 'text-light-blue hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => typeof window !== 'undefined' && window.open('/', '_blank')}
            className="w-full flex items-center gap-3 px-3 py-2 text-light-blue hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
          >
            <Eye size={20} />
            {sidebarOpen && <span>Voir le site</span>}
          </button>
          <button
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/')}
            className="w-full flex items-center gap-3 px-3 py-2 text-light-blue hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Quitter</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-dark-blue border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {activeTab === 'projects' && 'Gestion des projets'}
                {activeTab === 'skills' && 'Gestion des compétences'}
                {activeTab === 'parcours' && 'Gestion du parcours'}
                {activeTab === 'cv' && 'Gestion du CV'}
                {activeTab === 'info' && 'Informations personnelles'}
                {activeTab === 'settings' && 'Paramètres'}
              </h1>
              <p className="text-light-blue text-sm mt-1">Gérez votre portfolio dynamique</p>
            </div>
            
            <div className="flex items-center gap-4">
              {activeTab !== 'settings' && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange transition-colors duration-200 w-64"
                  />
                </div>
              )}
              
              <button
                onClick={exportData}
                className="p-2 text-light-blue hover:text-orange transition-colors duration-200"
                title="Exporter les données"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg animate-slide-in-right ${
                notification.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' :
                notification.type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-400' :
                'bg-blue-500/20 border border-blue-500/30 text-blue-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'success' && <Save size={16} />}
                {notification.type === 'error' && <X size={16} />}
                {notification.type === 'info' && <Settings size={16} />}
                <span>{notification.message}</span>
              </div>
            </div>
          ))}
        </div>

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Profil</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Nom</label>
                      <input
                        type="text"
                        value={localPersonalInfo.name}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Titre</label>
                      <input
                        type="text"
                        value={localPersonalInfo.title}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, title: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Biographie</label>
                      <textarea
                        value={localPersonalInfo.bio}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, bio: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange resize-none"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Photo de profil</label>
                      <div className="flex flex-col items-center gap-6">
                        {localPersonalInfo.profilePhoto ? (
                          <div className="relative group">
                            <div className="relative w-72 h-72 rounded-2xl overflow-visible shadow-xl border-4 border-orange/20 hover:border-orange/40 transition-all duration-300">
                              <div className="relative w-72 h-72 flex items-center justify-center">
                                <img
                                  src={localPersonalInfo.profilePhoto}
                                  alt="Photo de profil"
                                  className="max-w-full max-h-full object-contain transition-transform duration-200"
                                  style={{
                                    transform: `scale(${photoPosition.scale}) translate(${photoPosition.x}px, ${photoPosition.y}px)`,
                                    width: 'auto',
                                    height: 'auto'
                                  }}
                                />
                              </div>
                              
                              {/* Cadre décoratif */}
                              <div className="absolute inset-0 border-4 border-orange/20 rounded-2xl pointer-events-none"></div>
                              
                              {/* Effet de vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                              
                              {/* Bouton de suppression */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                                <button
                                  onClick={() => {
                                    if (confirm('Êtes-vous sûr de vouloir supprimer la photo de profil ?')) {
                                      setLocalPersonalInfo({...localPersonalInfo, profilePhoto: ''})
                                    }
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                                >
                                  <Trash2 size={18} />
                                  Supprimer
                                </button>
                              </div>
                              
                              {/* Bordure décorative */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange to-light-orange rounded-2xl opacity-20 blur-sm"></div>
                            </div>
                            
                            {/* Élément décoratif */}
                            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-orange rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white text-xl font-bold">SM</span>
                            </div>
                          </div>
                        ) : (
                          <label className="cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                            <div className="relative w-72 h-72 bg-gradient-to-br from-orange via-orange to-light-orange rounded-2xl flex items-center justify-center shadow-xl border-4 border-orange/20 hover:border-orange/40 transition-all duration-300 transform hover:scale-105">
                              <div className="text-center">
                                <span className="text-white text-6xl font-bold drop-shadow-lg mb-4 block">
                                  {localPersonalInfo.name.split(' ').map(n => n[0]).join('')}
                                </span>
                                <div className="text-white/80 text-sm">
                                  <Upload size={24} className="mx-auto mb-2" />
                                  Cliquez pour ajouter une photo
                                </div>
                              </div>
                              
                              {/* Bordure décorative */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange to-light-orange rounded-2xl opacity-20 blur-sm"></div>
                            </div>
                          </label>
                        )}
                        
                        {/* Contrôles de positionnement */}
                        {localPersonalInfo.profilePhoto && (
                          <div className="w-full max-w-sm space-y-4">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-white font-medium mb-3 text-center">Positionnement de la photo</h4>
                              
                              {/* Contrôle de zoom */}
                              <div className="mb-4">
                                <label className="text-white text-sm mb-2 block">Zoom: {Math.round(photoPosition.scale * 100)}%</label>
                                <input
                                  type="range"
                                  min="0.5"
                                  max="2"
                                  step="0.1"
                                  value={photoPosition.scale}
                                  onChange={(e) => setPhotoPosition({...photoPosition, scale: parseFloat(e.target.value)})}
                                  className="w-full"
                                />
                              </div>
                              
                              {/* Contrôles de position */}
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                <div></div>
                                <button
                                  onClick={() => setPhotoPosition({...photoPosition, y: photoPosition.y - 10})}
                                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors duration-200"
                                >
                                  ↑
                                </button>
                                <div></div>
                                <button
                                  onClick={() => setPhotoPosition({...photoPosition, x: photoPosition.x - 10})}
                                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors duration-200"
                                >
                                  ←
                                </button>
                                <button
                                  onClick={resetPhotoPosition}
                                  className="p-2 bg-orange/20 hover:bg-orange/30 text-white rounded transition-colors duration-200 text-xs"
                                  title="Réinitialiser"
                                >
                                  ⟲
                                </button>
                                <button
                                  onClick={() => setPhotoPosition({...photoPosition, x: photoPosition.x + 10})}
                                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors duration-200"
                                >
                                  →
                                </button>
                                <div></div>
                                <button
                                  onClick={() => setPhotoPosition({...photoPosition, y: photoPosition.y + 10})}
                                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors duration-200"
                                >
                                  ↓
                                </button>
                                <div></div>
                              </div>
                              
                              <div className="text-xs text-light-blue text-center">
                                Utilisez les flèches pour déplacer et le curseur pour zoomer
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-light-blue text-sm text-center">
                          {localPersonalInfo.profilePhoto ? 'Ajustez la position puis sauvegardez' : 'Formats acceptés : JPG, PNG, GIF (max 5MB)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Coordonnées</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={localPersonalInfo.email}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, email: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={localPersonalInfo.phone}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Localisation</label>
                      <input
                        type="text"
                        value={localPersonalInfo.location}
                        onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, location: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSavePersonalInfo}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={20} />
                )}
                Sauvegarder les informations
              </button>
            </div>
          )}

          {activeTab === 'parcours' && <AdminParcours />}

          {activeTab === 'cv' && <AdminCV />}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">Projets ({filteredProjects.length})</h2>
                  <div className="text-sm text-light-blue">
                    {searchTerm && `Résultats pour "${searchTerm}"`}
                  </div>
                </div>
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
                <div className="card animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {editingItem.id ? 'Modifier le projet' : 'Ajouter un projet'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Titre *</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                        placeholder="Titre du projet"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Technologies</label>
                      <input
                        type="text"
                        value={editingItem.technologies.join(', ')}
                        onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                        placeholder="React, Next.js, TypeScript"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={editingItem.github}
                        onChange={(e) => setEditingItem({...editingItem, github: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Demo URL</label>
                      <input
                        type="url"
                        value={editingItem.demo}
                        onChange={(e) => setEditingItem({...editingItem, demo: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-white font-medium mb-2">Description *</label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange resize-none"
                      rows={3}
                      placeholder="Description du projet"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProject}
                      disabled={isLoading}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save size={18} />
                      )}
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditingItem(null)
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X size={18} />
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="card hover-lift">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <div className="flex gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-blue hover:text-orange transition-colors duration-200"
                              >
                                <Github size={18} />
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-blue hover:text-orange transition-colors duration-200"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-light-blue mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange/20 text-orange rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(project)
                            setIsEditing(true)
                          }}
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
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">Compétences ({filteredSkills.length})</h2>
                  <div className="text-sm text-light-blue">
                    {searchTerm && `Résultats pour "${searchTerm}"`}
                  </div>
                </div>
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
                <div className="card animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {editingItem.id ? 'Modifier la compétence' : 'Ajouter une compétence'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Nom *</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                        placeholder="Nom de la compétence"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Catégorie *</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Niveau: {editingItem.level}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editingItem.level}
                        onChange={(e) => setEditingItem({...editingItem, level: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveSkill}
                      disabled={isLoading}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save size={18} />
                      )}
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditingItem(null)
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X size={18} />
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="card hover-lift">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                          <span className="text-orange font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-orange to-light-orange h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-light-blue text-sm">{skill.category}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(skill)
                            setIsEditing(true)
                          }}
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

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Paramètres</h2>
              
              <AdminSync />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Apparence</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Mode sombre</span>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                          darkMode ? 'bg-orange' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          darkMode ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Sauvegarde et restauration</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={exportData}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Download size={20} />
                      Exporter les données
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                      <Upload size={20} />
                      Importer des données
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      <SyncNotificationContainer notifications={notifications} onHide={hideNotification} />
      </div>
    </div>
  )
}
