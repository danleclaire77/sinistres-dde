# 💧 Gestionnaire de Sinistres — Dégâts des Eaux

Application web personnelle pour gérer vos sinistres dégâts des eaux.
Conçue pour Dan Leclaire — SCI Grand Miroir, Quai Mullenheim, Faubourg National.

---

## 🚀 Installation (5 minutes)

### Prérequis
- [Node.js](https://nodejs.org) version 18 ou supérieure

### Étapes

```bash
# 1. Décompressez le dossier et ouvrez un terminal dedans
cd dde-sinistres

# 2. Installez les dépendances
npm install

# 3. Lancez l'application
npm start
```

L'application est disponible sur **http://localhost:3000**

---

## 💾 Données

Toutes vos données sont sauvegardées dans le fichier `data.json` à la racine du dossier.
→ Vous pouvez le sauvegarder sur votre Google Drive à tout moment.
→ Le bouton **Export** dans l'appli télécharge aussi ce fichier.

---

## 📱 Accès depuis votre téléphone (même réseau WiFi)

1. Sur votre ordinateur, lancez `npm start`
2. Notez l'adresse IP de votre ordinateur (ex: 192.168.1.42)
3. Sur votre téléphone (même WiFi) : ouvrez `http://192.168.1.42:3000`

---

## 🔒 Pour un accès permanent en ligne (optionnel)

Vous pouvez déployer cette application sur :
- **Railway.app** (gratuit, simple)
- **Render.com** (gratuit)
- **Votre NAS Synology** si vous en avez un

---

## 📂 Structure

```
dde-sinistres/
├── server.js       ← Serveur Node.js
├── data.json       ← Vos données (généré automatiquement)
├── package.json
├── public/
│   └── index.html  ← L'application web
└── README.md
```

---

## ✨ Fonctionnalités

- **Sinistres** : création, modification, suivi par propriété
- **Acteurs** : assureurs, syndic, plombiers, voisins, locataires...
- **Relances** : planification avec urgence et alertes automatiques
- **Historique** : timeline de chaque sinistre
- **Modèles** : 6 lettres types prêtes à l'emploi
- **Export** : backup JSON à tout moment
