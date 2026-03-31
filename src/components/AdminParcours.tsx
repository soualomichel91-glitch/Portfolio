'use client'

import { useState } from 'react'
import { GraduationCap, Briefcase, Award, BookOpen, Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Education } from '@/lib/data'

export default function AdminParcours() {
  const { education, saveEducation } = usePortfolio()
  const [activeFilter, setActiveFilter] = useState<'all' | 'scolaire' | 'universitaire' | 'professionnel' | 'formation'>('all')
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)

  const filteredEducation = education.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  )

  const handleAddEducation = () => {
    setEditingItem({
      id: Date.now(),
      type: 'scolaire',
      title: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
      skills: []
    })
    setIsEditing(true)
  }

  const handleEditEducation = (item: Education) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const handleSaveEducation = () => {
    if (!editingItem) return
    
    if (editingItem.id && education.find(e => e.id === editingItem.id)) {
      const updated = education.map(e => e.id === editingItem.id ? editingItem : e)
      saveEducation(updated)
    } else {
      const newEducation = [...education, editingItem]
      saveEducation(newEducation)
    }
    
    setIsEditing(false)
    setEditingItem(null)
  }

  const handleDeleteEducation = (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) return
    
    const updated = education.filter(e => e.id !== id)
    saveEducation(updated)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scolaire': return <GraduationCap size={20} />
      case 'universitaire': return <BookOpen size={20} />
      case 'professionnel': return <Briefcase size={20} />
      case 'formation': return <Award size={20} />
      default: return <BookOpen size={20} />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scolaire': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'universitaire': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'professionnel': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'formation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Présent'
    const [year, month] = dateString.split('-')
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  if (isEditing && editingItem) {
    return (
      <div className="min-h-screen bg-night-blue p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Modifier le parcours</h1>
            <p className="text-light-blue">Ajoutez ou modifiez vos expériences éducatives et professionnelles</p>
          </div>

          <div className="card animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-6">
              {editingItem.id ? 'Modifier une expérience' : 'Ajouter une expérience'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-medium mb-2">Type *</label>
                <select
                  value={editingItem.type}
                  onChange={(e) => setEditingItem({...editingItem, type: e.target.value as Education['type']})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                >
                  <option value="scolaire">Scolaire</option>
                  <option value="universitaire">Universitaire</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="formation">Formation</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Titre *</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                  placeholder="Titre du diplôme ou du poste"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Institution *</label>
                <input
                  type="text"
                  value={editingItem.institution}
                  onChange={(e) => setEditingItem({...editingItem, institution: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                  placeholder="Nom de l'établissement ou de l'entreprise"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Localisation *</label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                  placeholder="Ville, Pays"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Date de début *</label>
                <input
                  type="month"
                  value={editingItem.startDate}
                  onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Date de fin</label>
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    value={editingItem.endDate}
                    onChange={(e) => setEditingItem({...editingItem, endDate: e.target.value})}
                    disabled={editingItem.current}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange disabled:opacity-50"
                  />
                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      checked={editingItem.current}
                      onChange={(e) => setEditingItem({...editingItem, current: e.target.checked, endDate: e.target.checked ? '' : editingItem.endDate})}
                      className="w-4 h-4 text-orange focus:ring-orange focus:ring-offset-0"
                    />
                    En cours
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange resize-none"
                rows={3}
                placeholder="Description du cursus, des responsabilités ou des compétences acquises"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Compétences acquises</label>
              <input
                type="text"
                value={editingItem.skills?.join(', ') || ''}
                onChange={(e) => setEditingItem({...editingItem, skills: e.target.value.split(',').map(s => s.trim())})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange"
                placeholder="React, Node.js, TypeScript (séparées par des virgules)"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSaveEducation}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-night-blue p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Gestion du Parcours</h1>
          <p className="text-light-blue text-lg">Gérez vos expériences éducatives et professionnelles</p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'all', label: 'Tout', icon: <BookOpen size={18} /> },
            { id: 'scolaire', label: 'Scolaire', icon: <GraduationCap size={18} /> },
            { id: 'universitaire', label: 'Universitaire', icon: <BookOpen size={18} /> },
            { id: 'professionnel', label: 'Professionnel', icon: <Briefcase size={18} /> },
            { id: 'formation', label: 'Formation', icon: <Award size={18} /> }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-orange text-white'
                  : 'bg-white/10 text-light-blue hover:bg-white/20 hover:text-white'
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Bouton d'ajout */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddEducation}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter une expérience
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {filteredEducation.map((item, index) => (
            <div key={item.id} className={`card hover-lift animate-fade-in ${getTypeColor(item.type)} border`}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-light-blue font-medium">{item.institution}</p>
                      <p className="text-light-blue text-sm">{item.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEducation(item)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(item.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-orange font-medium">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                    {item.current && (
                      <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        En cours
                      </span>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-white mb-3">{item.description}</p>
                  )}
                  
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEducation.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light-blue text-lg">
              {activeFilter === 'all' 
                ? 'Aucune expérience dans votre parcours pour le moment.'
                : `Aucune expérience de type "${activeFilter}" dans votre parcours.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
