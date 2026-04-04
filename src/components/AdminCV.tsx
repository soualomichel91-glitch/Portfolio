'use client'

import { useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Save, Upload, User, Mail, Phone, MapPin, Globe, Award, BookOpen, Briefcase, Heart } from 'lucide-react'

export default function AdminCV() {
  const { personalInfo, savePersonalInfo } = usePortfolio()
  const [isLoading, setIsLoading] = useState(false)
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await savePersonalInfo(localPersonalInfo)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsLoading(false)
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestion du CV</h2>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Photo de profil */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <User size={20} />
          Photo de profil
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col items-center px-8">
              {localPersonalInfo.profilePhoto ? (
                <div className="relative group">
                  <div className="w-32 h-32 bg-white rounded-lg p-4">
                    <img
                      src={localPersonalInfo.profilePhoto}
                      alt="Photo de profil"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <button
                    onClick={() => setLocalPersonalInfo({...localPersonalInfo, profilePhoto: ''})}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Upload size={16} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer group">
                  <div className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center border-2 border-gray-300 hover:border-orange transition-all duration-200">
                    <div className="text-center">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-gray-400 text-xs">Photo</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-light-blue text-sm text-center">
              Format recommandé : carré, minimum 200x200px
            </p>
          </div>

          <div className="space-y-4 md:col-span-2 pl-10">
            {/* Nom complet */}
            <div>
              <label className="block text-white font-medium mb-2">Nom complet</label>
              <input
                type="text"
                value={localPersonalInfo.name || ''}
                onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, name: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                placeholder="Jean Dupont"
              />
            </div>

            {/* Titre professionnel */}
            <div>
              <label className="block text-white font-medium mb-2">Titre professionnel</label>
              <input
                type="text"
                value={localPersonalInfo.title || ''}
                onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, title: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                placeholder="Développeur Web Full Stack"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                <input
                  type="email"
                  value={localPersonalInfo.email || ''}
                  onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-white font-medium mb-2">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                <input
                  type="tel"
                  value={localPersonalInfo.phone || ''}
                  onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            {/* Localisation */}
            <div>
              <label className="block text-white font-medium mb-2">Localisation</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                <input
                  type="text"
                  value={localPersonalInfo.location || ''}
                  onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                  placeholder="Paris, France"
                />
              </div>
            </div>

            {/* Site web/Portfolio */}
            <div>
              <label className="block text-white font-medium mb-2">Site web / Portfolio</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                <input
                  type="url"
                  value={localPersonalInfo.website || ''}
                  onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, website: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                  placeholder="https://jeandupont.fr"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-white font-medium mb-2">LinkedIn</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" size={18} />
                <input
                  type="url"
                  value={localPersonalInfo.linkedin || ''}
                  onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, linkedin: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                  placeholder="https://linkedin.com/in/jeandupont"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biographie */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <BookOpen size={20} />
          Biographie
        </h3>
        <div>
          <label className="block text-white font-medium mb-2">Résumé professionnel</label>
          <textarea
            value={localPersonalInfo.bio || ''}
            onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, bio: e.target.value})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange resize-none"
            rows={6}
            placeholder="Développeur web passionné avec X années d'expérience dans la création d'applications modernes et performantes..."
          />
          <p className="text-light-blue text-sm mt-2">
            Ce texte apparaîtra dans la section "À propos" de votre CV et sur votre portfolio
          </p>
        </div>
      </div>

      {/* Langues */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Globe size={20} />
          Langues
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Langue 1</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localPersonalInfo.languages?.[0]?.name || ''}
                onChange={(e) => {
                  const languages = [...(localPersonalInfo.languages || [])]
                  languages[0] = {...languages[0], name: e.target.value}
                  setLocalPersonalInfo({...localPersonalInfo, languages})
                }}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                placeholder="Français"
              />
              <select
                value={localPersonalInfo.languages?.[0]?.level || ''}
                onChange={(e) => {
                  const languages = [...(localPersonalInfo.languages || [])]
                  languages[0] = {...languages[0], level: e.target.value}
                  setLocalPersonalInfo({...localPersonalInfo, languages})
                }}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
              >
                <option value="">Niveau</option>
                <option value="Langue maternelle">Langue maternelle</option>
                <option value="Courant">Courant</option>
                <option value="Professionnel">Professionnel</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Débutant">Débutant</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Langue 2</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localPersonalInfo.languages?.[1]?.name || ''}
                onChange={(e) => {
                  const languages = [...(localPersonalInfo.languages || [])]
                  languages[1] = {...languages[1], name: e.target.value}
                  setLocalPersonalInfo({...localPersonalInfo, languages})
                }}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
                placeholder="Anglais"
              />
              <select
                value={localPersonalInfo.languages?.[1]?.level || ''}
                onChange={(e) => {
                  const languages = [...(localPersonalInfo.languages || [])]
                  languages[1] = {...languages[1], level: e.target.value}
                  setLocalPersonalInfo({...localPersonalInfo, languages})
                }}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
              >
                <option value="">Niveau</option>
                <option value="Langue maternelle">Langue maternelle</option>
                <option value="Courant">Courant</option>
                <option value="Professionnel">Professionnel</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Débutant">Débutant</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Centres d'intérêt */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Heart size={20} />
          Centres d'intérêt
        </h3>
        <div>
          <label className="block text-white font-medium mb-2">Intérêts (séparés par des virgules)</label>
          <input
            type="text"
            value={localPersonalInfo.interests?.join(', ') || ''}
            onChange={(e) => setLocalPersonalInfo({...localPersonalInfo, interests: e.target.value.split(',').map(i => i.trim())})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange"
            placeholder="Développement web, Photographie, Lecture, Voyage..."
          />
          <p className="text-light-blue text-sm mt-2">
            Ces intérêts apparaîtront dans la section "Centres d'intérêt" de votre CV
          </p>
        </div>
      </div>

      {/* Aperçu du CV */}
      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Award size={20} />
          Aperçu du CV
        </h3>
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="text-center text-light-blue mb-6">
            <p className="font-medium">Votre CV sera généré avec le style bicolore moderne</p>
            <p className="text-sm mt-2">Colonne gauche : Photo, contact, langues, compétences</p>
            <p className="text-sm">Colonne droite : Expériences, formations, biographie</p>
          </div>
          
          {/* Aperçu miniature du style CV */}
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-36 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              {/* Colonne gauche (noire) */}
              <div className="absolute left-0 top-0 w-20 h-full bg-black flex flex-col items-center py-2 px-1">
                {/* Photo avec espaces */}
                <div className="w-12 h-12 bg-white rounded p-2 mb-2">
                  {localPersonalInfo.profilePhoto ? (
                    <img
                      src={localPersonalInfo.profilePhoto}
                      alt="Photo"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">SM</span>
                    </div>
                  )}
                </div>
                {/* Informations miniatures */}
                <div className="text-white text-xs text-center px-1">
                  <div className="w-1 h-1 bg-white rounded-full mx-auto mb-1"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-auto mb-1"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-auto mb-1"></div>
                </div>
              </div>
              {/* Colonne droite (blanche) */}
              <div className="absolute left-20 top-0 right-0 h-full bg-white p-2">
                <div className="text-xs font-bold text-gray-800 mb-1">
                  {localPersonalInfo.name || 'VOTRE NOM'}
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {localPersonalInfo.title || 'Votre titre'}
                </div>
                <div className="w-full h-px bg-gray-300 mb-1"></div>
                <div className="text-xs text-gray-700">
                  <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                  <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => window.open('/', '_blank')}
              className="btn-secondary flex items-center gap-2"
            >
              <Briefcase size={18} />
              Voir l'aperçu sur le site
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
