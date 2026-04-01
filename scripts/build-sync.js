const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données
const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');

// Fonction pour synchroniser les données depuis un fichier JSON temporaire ou utiliser les valeurs par défaut
function syncForBuild() {
  console.log('🔄 Synchronisation des données pour le build...');
  
  try {
    // Vérifier s'il existe un fichier de synchronisation
    const syncFilePath = path.join(__dirname, '..', 'sync-data.json');
    
    let personalInfo = {
      name: "Soualo Michel",
      title: "Développeur Web Full Stack",
      email: "soualomichel91@gmail.com",
      phone: "+224620157184",
      location: "Conakry, Guinée",
      bio: "Passionné par le développement web depuis plusieurs années, je me spécialise dans la création d'applications modernes et performantes avec React, Next.js et Node.js. Toujours en veille technologique, j'aime relever de nouveaux défis techniques.",
      profilePhoto: ""
    };
    
    // Si le fichier de sync existe, utiliser ces données
    if (fs.existsSync(syncFilePath)) {
      const syncData = JSON.parse(fs.readFileSync(syncFilePath, 'utf8'));
      if (syncData.personalInfo) {
        personalInfo = { ...personalInfo, ...syncData.personalInfo };
        console.log('✅ Données personnelles chargées depuis sync-data.json');
      }
    }
    
    // Lire le fichier actuel
    let content = fs.readFileSync(dataPath, 'utf8');
    
    // Mettre à jour defaultPersonalInfo
    const personalInfoRegex = /export const defaultPersonalInfo: PersonalInfo = \{[\s\S]*?^\}/m;
    const newPersonalInfo = `export const defaultPersonalInfo: PersonalInfo = {
  name: "${personalInfo.name}",
  title: "${personalInfo.title}",
  email: "${personalInfo.email}",
  phone: "${personalInfo.phone}",
  location: "${personalInfo.location}",
  bio: "${personalInfo.bio}",
  profilePhoto: "${personalInfo.profilePhoto || ''}"
}`;
    
    // Remplacer dans le contenu
    content = content.replace(personalInfoRegex, newPersonalInfo);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(dataPath, content, 'utf8');
    
    console.log('✅ Données synchronisées avec succès pour le build !');
    console.log(`📝 Nom: ${personalInfo.name}`);
    console.log(`📝 Email: ${personalInfo.email}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    process.exit(1);
  }
}

// Exécuter la synchronisation
syncForBuild();
