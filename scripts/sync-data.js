const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données
const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');

// Fonction pour mettre à jour les données par défaut
function updateDefaultData() {
  try {
    console.log('🔄 Synchronisation des données pour le déploiement...');
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Fichier non trouvé: ${dataPath}`);
    }
    
    // Lire le fichier actuel
    let content = fs.readFileSync(dataPath, 'utf8');
    console.log('📖 Fichier lu avec succès');
    
    // Vos données actuelles
    const mockData = {
      name: "Soualo Michel",
      title: "Développeur Web Full Stack",
      email: "soualomichel91@gmail.com",
      phone: "+224620157184",
      location: "Conakry, Guinée",
      bio: "Passionné par le développement web depuis plusieurs années, je me spécialise dans la création d'applications modernes et performantes avec React, Next.js et Node.js. Toujours en veille technologique, j'aime relever de nouveaux défis techniques."
    };
    
    // Mettre à jour defaultPersonalInfo avec regex plus précis
    const personalInfoRegex = /export const defaultPersonalInfo: PersonalInfo = \{[\s\S]*?^\}/m;
    const newPersonalInfo = `export const defaultPersonalInfo: PersonalInfo = {
  name: "${mockData.name}",
  title: "${mockData.title}",
  email: "${mockData.email}",
  phone: "${mockData.phone}",
  location: "${mockData.location}",
  bio: "${mockData.bio}",
  profilePhoto: ""
}`;
    
    // Vérifier si le regex a trouvé une correspondance
    if (!personalInfoRegex.test(content)) {
      throw new Error('Pattern defaultPersonalInfo non trouvé dans le fichier');
    }
    
    // Remplacer dans le contenu
    content = content.replace(personalInfoRegex, newPersonalInfo);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(dataPath, content, 'utf8');
    
    console.log('✅ Données synchronisées avec succès !');
    console.log('📝 Informations personnelles mises à jour:');
    console.log(`   - Nom: ${mockData.name}`);
    console.log(`   - Titre: ${mockData.title}`);
    console.log(`   - Email: ${mockData.email}`);
    console.log(`   - Téléphone: ${mockData.phone}`);
    console.log(`   - Localisation: ${mockData.location}`);
    
    // Vérifier que le fichier a bien été modifié
    const updatedContent = fs.readFileSync(dataPath, 'utf8');
    if (updatedContent.includes(mockData.email)) {
      console.log('✅ Vérification: Fichier correctement mis à jour');
    } else {
      throw new Error('Le fichier n\'a pas été correctement mis à jour');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    process.exit(1);
  }
}

// Exécuter la synchronisation
updateDefaultData();
