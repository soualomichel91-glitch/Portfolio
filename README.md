# Portfolio - Soualo Michel

Portfolio dynamique réalisé avec Next.js, TypeScript et Tailwind CSS.

## 🎨 Charte Graphique
- **Bleu nuit** : `#0d1b2a` (fond principal)
- **Orange** : `#f77f00` (accents et actions)
- **Blanc** : `#ffffff` (texte et éléments clairs)

## 🚀 Fonctionnalités

### Portfolio Public
- Page d'accueil avec présentation personnelle
- Section projets avec galerie dynamique
- Compétences classées par catégorie avec barres de progression
- Formulaire de contact fonctionnel
- Design responsive et moderne

### Administration
- Gestion des projets (ajout, modification, suppression)
- Gestion des compétences avec niveaux
- Modification des informations personnelles
- Stockage des données en localStorage

## 🛠 Technologies

- **Frontend** : Next.js 15, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Data Management** : localStorage (client-side)

## 📁 Structure du Projet

```
src/
├── app/
│   ├── admin/          # Page d'administration
│   ├── globals.css     # Styles globaux
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Page d'accueil
├── components/         # Composants React
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── hooks/
│   └── usePortfolio.ts # Hook personnalisé pour la gestion des données
└── lib/
    └── data.ts         # Types et données par défaut
```

## 🎯 Utilisation

### Démarrer le projet

```bash
# Installation des dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Accéder aux pages

- **Portfolio** : `http://localhost:3000`
- **Administration** : `http://localhost:3000/admin`

## 💡 Personnalisation

### Modifier les couleurs
Éditez `tailwind.config.js` pour ajuster la charte graphique :

```javascript
theme: {
  extend: {
    colors: {
      'night-blue': '#0d1b2a',    // Bleu nuit
      'orange': '#f77f00',        // Orange
      'white': '#ffffff',          // Blanc
      // ... autres couleurs
    }
  }
}
```

### Gérer le contenu

1. Accédez à la page `/admin`
2. Utilisez les formulaires pour :
   - Ajouter/modifier des projets
   - Gérer les compétences
   - Mettre à jour vos informations

Les données sont sauvegardées automatiquement dans le localStorage du navigateur.

## 🌟 Caractéristiques

- ✅ Design moderne avec charte graphique cohérente
- ✅ Interface d'administration intuitive
- ✅ Données dynamiques et persistantes
- ✅ Responsive design
- ✅ Animations et transitions fluides
- ✅ Code TypeScript typé
- ✅ Composants réutilisables

## 📝 Notes

- Les données sont stockées localement (localStorage)
- Pour un déploiement en production, envisagez une base de données
- Le formulaire de contact est une simulation (pas d'envoi d'email réel)
