'use client'

import { useState } from 'react'
import { Save, Download, Upload } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function AdminSync() {
  const { personalInfo, projects, skills, education, savePersonalInfo, saveProjects, saveSkills, saveEducation } = usePortfolio()
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const exportData = () => {
    setIsExporting(true)
    try {
      const data = {
        personalInfo,
        projects,
        skills,
        education,
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'portfolio-data.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      console.log('✅ Données exportées avec succès')
    } catch (error) {
      console.error('❌ Erreur lors de l\'export:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsSaving(true)
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          
          if (data.personalInfo) savePersonalInfo(data.personalInfo)
          if (data.projects) saveProjects(data.projects)
          if (data.skills) saveSkills(data.skills)
          if (data.education) saveEducation(data.education)
          
          console.log('✅ Données importées avec succès')
          alert('Données importées avec succès !')
        } catch (error) {
          console.error('❌ Erreur lors du parsing JSON:', error)
          alert('Erreur: Le fichier n\'est pas un JSON valide')
        }
      }
      reader.readAsText(file)
    } catch (error) {
      console.error('❌ Erreur lors de l\'import:', error)
      alert('Erreur lors de l\'import des données')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Synchronisation des Données</h3>
      <p className="text-light-blue mb-6">
        Exportez vos modifications pour les sauvegarder, puis importez-les avant de déployer sur Vercel.
      </p>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={exportData}
          disabled={isExporting}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Download size={18} />
          )}
          {isExporting ? 'Exportation...' : 'Exporter les données'}
        </button>
        
        <label className="btn-secondary flex items-center gap-2 cursor-pointer">
          <Upload size={18} />
          Importer les données
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <h4 className="text-white font-medium mb-2">📋 Instructions pour le déploiement :</h4>
        <ol className="text-light-blue text-sm space-y-1 list-decimal list-inside">
          <li>Faites vos modifications dans l'admin</li>
          <li>Cliquez sur "Exporter les données" pour télécharger le fichier JSON</li>
          <li>Placez ce fichier dans le dossier du projet</li>
          <li>Exécutez la synchronisation avant le déploiement</li>
          <li>Déployez sur Vercel</li>
        </ol>
      </div>
    </div>
  )
}
