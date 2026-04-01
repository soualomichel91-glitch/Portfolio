const fs = require('fs');
const path = require('path');

// Chemin vers les fichiers
const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
const jsonPath = path.join(__dirname, '..', 'portfolio-data.json');

function syncFromJson() {
  console.log('🔄 Synchronisation depuis le fichier JSON...');
  
  try {
    // Vérifier si le fichier JSON existe
    if (!fs.existsSync(jsonPath)) {
      console.log('❌ Fichier JSON non trouvé. Veuillez dabord exporter les données depuis l\'admin.');
      console.log('📍 Chemin attendu:', jsonPath);
      return;
    }
    
    // Lire le fichier JSON
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log('📖 Fichier JSON lu avec succès');
    
    // Lire le fichier data.ts actuel
    let content = fs.readFileSync(dataPath, 'utf8');
    
    // Mettre à jour les informations personnelles
    if (jsonData.personalInfo) {
      const personalInfo = jsonData.personalInfo;
      const personalInfoRegex = /export const defaultPersonalInfo: PersonalInfo = \{[\s\S]*?^\}/m;
      const newPersonalInfo = `export const defaultPersonalInfo: PersonalInfo = {
  name: "${personalInfo.name || 'Soualo Michel'}",
  title: "${personalInfo.title || 'Développeur Web Full Stack'}",
  email: "${personalInfo.email || 'soualomichel91@gmail.com'}",
  phone: "${personalInfo.phone || '+224620157184'}",
  location: "${personalInfo.location || 'Conakry, Guinée'}",
  bio: "${personalInfo.bio || 'Passionné par le développement web'}",
  profilePhoto: "${personalInfo.profilePhoto || ''}"
}`;
      
      content = content.replace(personalInfoRegex, newPersonalInfo);
      console.log('✅ Informations personnelles mises à jour');
    }
    
    // Mettre à jour les projets
    if (jsonData.projects && Array.isArray(jsonData.projects)) {
      const projectsRegex = /export const defaultProjects: Project\[] = \[[\s\S]*?\];/m;
      const projectsString = jsonData.projects.map(p => `  {
    id: ${p.id},
    title: "${p.title}",
    description: "${p.description}",
    technologies: ${JSON.stringify(p.technologies)},
    github: "${p.github}",
    demo: "${p.demo}"
  }`).join(',\n');
      
      const newProjects = `export const defaultProjects: Project[] = [
${projectsString}
]`;
      
      content = content.replace(projectsRegex, newProjects);
      console.log('✅ Projets mis à jour');
    }
    
    // Mettre à jour les compétences
    if (jsonData.skills && Array.isArray(jsonData.skills)) {
      const skillsRegex = /export const defaultSkills: Skill\[] = \[[\s\S]*?\];/m;
      const skillsString = jsonData.skills.map(s => `  { id: ${s.id}, name: "${s.name}", category: "${s.category}", level: ${s.level} }`).join(',\n');
      
      const newSkills = `export const defaultSkills: Skill[] = [
${skillsString}
]`;
      
      content = content.replace(skillsRegex, newSkills);
      console.log('✅ Compétences mises à jour');
    }
    
    // Mettre à jour le parcours
    if (jsonData.education && Array.isArray(jsonData.education)) {
      const educationRegex = /export const defaultEducation: Education\[] = \[[\s\S]*?\];/m;
      const educationString = jsonData.education.map(e => `  {
    id: ${e.id},
    type: '${e.type}',
    title: '${e.title}',
    institution: '${e.institution}',
    location: '${e.location}',
    startDate: '${e.startDate}',
    endDate: '${e.endDate}',
    description: ${e.description ? `'${e.description}'` : 'undefined'},
    current: ${e.current || false},
    skills: ${JSON.stringify(e.skills || [])}
  }`).join(',\n');
      
      const newEducation = `export const defaultEducation: Education[] = [
${educationString}
]`;
      
      content = content.replace(educationRegex, newEducation);
      console.log('✅ Parcours mis à jour');
    }
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(dataPath, content, 'utf8');
    
    console.log('🎉 Synchronisation terminée avec succès !');
    console.log('📝 Les données ont été mises à jour dans src/lib/data.ts');
    console.log('🚀 Vous pouvez maintenant déployer sur Vercel');
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    process.exit(1);
  }
}

// Exécuter la synchronisation
syncFromJson();
