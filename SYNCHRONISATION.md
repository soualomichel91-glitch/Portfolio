# Synchronisation des Données du Portfolio

## 📋 Problème

Les modifications faites dans l'interface d'administration sont sauvegardées dans le `localStorage` du navigateur, mais Vercel utilise un build statique qui ne peut pas accéder au `localStorage`. Les données ne sont donc pas visibles sur la version déployée.

## 🔄 Solution

Un système de synchronisation a été mis en place pour exporter les données de l'admin vers le fichier `data.ts` avant le déploiement.

## 🚀 Processus de Déploiement

### Étape 1: Faire vos modifications
1. Allez sur `/admin` dans votre navigateur
2. Modifiez vos informations personnelles, projets, compétences et parcours
3. Toutes les modifications sont automatiquement sauvegardées dans le localStorage

### Étape 2: Exporter les données
1. Dans l'admin, allez dans l'onglet "Paramètres"
2. Cliquez sur "Exporter les données" dans le composant de synchronisation
3. Un fichier `portfolio-data.json` sera téléchargé

### Étape 3: Synchroniser avant le déploiement
1. Placez le fichier `portfolio-data.json` à la racine du projet
2. Exécutez la commande de synchronisation :
   ```bash
   npm run sync-from-json
   ```
   Ou utilisez le script complet :
   ```bash
   npm run build-sync
   ```

### Étape 4: Déployer
1. Poussez vos modifications sur GitHub :
   ```bash
   git add .
   git commit -m "Mise à jour des données du portfolio"
   git push origin main
   ```
2. Vercel déploiera automatiquement avec les nouvelles données

## 🛠️ Scripts Disponibles

- `npm run sync-data` : Synchronise les données par défaut
- `npm run sync-from-json` : Synchronise depuis le fichier JSON exporté
- `npm run build-sync` : Synchronise puis build le projet

## 📁 Fichiers de Synchronisation

- `scripts/sync-data.js` : Script de synchronisation principal
- `scripts/sync-from-json.js` : Script pour synchroniser depuis le JSON exporté
- `src/components/AdminSync.tsx` : Composant d'administration pour l'export/import
- `src/hooks/usePortfolio.ts` : Hook qui gère le localStorage et les données par défaut

## ✅ Vérification

Après synchronisation, vérifiez que le fichier `src/lib/data.ts` contient bien vos données mises à jour dans les constantes `defaultPersonalInfo`, `defaultProjects`, `defaultSkills` et `defaultEducation`.

## 🔧 Dépannage

### Les données n'apparaissent pas sur Vercel
1. Vérifiez que vous avez bien exporté les données depuis l'admin
2. Assurez-vous que le fichier `portfolio-data.json` est à la racine du projet
3. Exécutez `npm run sync-from-json` avant de déployer
4. Vérifiez le contenu de `src/lib/data.ts` après synchronisation

### Erreur lors de la synchronisation
1. Vérifiez que le fichier JSON est valide
2. Assurez-vous que tous les champs requis sont présents
3. Consultez les logs d'erreur pour plus de détails

## 📝 Notes

- Les données sont sauvegardées localement dans le navigateur
- L'export JSON contient toutes vos données (personnelles, projets, compétences, parcours)
- La synchronisation met à jour les valeurs par défaut utilisées par le build statique
- Le processus doit être répété à chaque modification avant déploiement
