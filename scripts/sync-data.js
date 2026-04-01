const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données
const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');

// Fonction pour mettre à jour les données par défaut
function updateDefaultData() {
  console.log('🔄 Synchronisation des données pour le déploiement...');
  
  // Lire le fichier actuel
  let content = fs.readFileSync(dataPath, 'utf8');
  
  // Simuler les données de localStorage (à remplacer avec vos vraies données)
  const mockData = {
    name: "Soualo Michel",
    title: "Développeur Web Full Stack",
    email: "soualomichel91@gmail.com",
    phone: "+224620157184",
    location: "Conakry, Guinée",
    bio: "Passionné par le développement web depuis plusieurs années, je me spécialise dans la création d'applications modernes et performantes avec React, Next.js et Node.js. Toujours en veille technologique, j'aime relever de nouveaux défis techniques."
  };
  
  // Mettre à jour defaultPersonalInfo
  const personalInfoRegex = /export const defaultPersonalInfo: PersonalInfo = \{[\s\S]*?\};/;
  const newPersonalInfo = `export const defaultPersonalInfo: PersonalInfo = {
  name: "${mockData.name}",
  title: "${mockData.title}",
  email: "${mockData.email}",
  phone: "${mockData.phone}",
  location: "${mockData.location}",
  bio: "${mockData.bio}",
  profilePhoto: ""
}`;
  
  content = content.replace(personalInfoRegex, newPersonalInfo);
  
  // Écrire le fichier mis à jour
  fs.writeFileSync(dataPath, content);
  console.log('✅ Données synchronisées avec succès !');
  console.log('📝 Informations personnelles mises à jour:');
  console.log(`   - Nom: ${mockData.name}`);
  console.log(`   - Titre: ${mockData.title}`);
  console.log(`   - Email: ${mockData.email}`);
  console.log(`   - Téléphone: ${mockData.phone}`);
  console.log(`   - Localisation: ${mockData.location}`);
}

// Exécuter la synchronisation
updateDefaultData();
