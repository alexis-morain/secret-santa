# 🎅 Secret Santa Generator

Bienvenue sur le **Secret Santa Generator**, une application web moderne, festive et responsive pour organiser facilement vos échanges de cadeaux entre amis, famille ou collègues.

Ce projet a été conçu pour offrir une expérience utilisateur fluide, sans inscription, sans base de données, et avec une ambiance visuelle immersive "Nuit Polaire".

🔗 **[Tester le projet](https://secret-santa-tau-sage.vercel.app/)**

## ✨ Fonctionnalités

* **🎨 Design Immersif :** Thème sombre "Nuit Polaire" avec effet de neige tombant au premier plan (CSS pur).
* **🛠️ Interface Admin Complète :**
    * Ajout et suppression dynamique des participants.
    * Configuration des détails de l'événement (Date, Lieu, Budget, Notes).
    * Algorithme de tirage au sort intelligent (empêche de se tirer soi-même).
* **🔗 Partage Simplifié :** Génération de liens uniques pour chaque participant. Aucune base de données n'est utilisée ; les données sont encodées et sécurisées directement dans l'URL.
* **🎁 Page de Révélation (Reveal) :** Une page dédiée pour les invités avec animation d'ouverture de cadeau et affichage des détails de l'événement.
* **📱 100% Responsive :** Fonctionne parfaitement sur mobile et ordinateur.

## 🚀 Technologies Utilisées

Ce projet est une Single Page Application (SPA) construite avec :

* **[React.js](https://react.dev/)** - Bibliothèque JavaScript pour l'interface utilisateur.
* **[Vite](https://vitejs.dev/)** - Outil de build ultra-rapide.
* **CSS3** - Animations personnalisées (Keyframes), Glassmorphism, Flexbox.
* **Vercel** - Déploiement et hébergement.

## 📂 Structure du Projet

* `/src` : Contient tout le code source React.
    * `App.jsx` : Logique principale (Admin) et routage simple.
    * `Reveal.jsx` : Page de révélation du cadeau.
    * `santaLogic.js` : Algorithme de mélange (Fisher-Yates) et attribution.
    * `App.css` : Styles globaux, animations de neige et design des cartes.

## 🛡️ Comment ça marche techniquement ?

L'application est **stateless** (sans état serveur).
1.  L'organisateur saisit les informations.
2.  Lors du tirage, l'application génère un objet JSON contenant : le nom du donneur, le nom du receveur, et les infos de l'événement.
3.  Cet objet est converti en chaîne de caractères, puis encodé en **Base64** pour créer une URL unique.
4.  Lorsque l'invité ouvre le lien, l'application décode l'URL pour afficher les informations.

## 👤 Auteur

Projet réalisé avec ❤️ par **Alexis Morain**.

* [Mon LinkedIn](https://www.linkedin.com/in/alexis-morain/)

---
*Joyeuses Fêtes ! 🎄*