# 📁 Portfolio Manager

Application CRUD complète en MERN Stack (avec PostgreSQL) pour gérer vos projets de portfolio avec upload d'images sur Cloudinary.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=radixui&logoColor=white)


## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancer l'application](#-lancer-lapplication)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Utilisation](#-utilisation)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)

## 🎯 Aperçu

Portfolio Manager est une application web permettant de gérer facilement vos projets de portfolio. Elle offre une interface intuitive pour :
- Créer, modifier et supprimer des projets
- Uploader des captures d'écran sur Cloudinary
- Gérer les technologies utilisées avec autocomplete intelligent
- Authentification sécurisée avec JWT

**Interface responsive** construite avec Tailwind CSS et Shadcn UI pour une expérience utilisateur moderne.

## ✨ Fonctionnalités

### Authentification
- ✅ Inscription avec validation des données
- ✅ Connexion sécurisée avec JWT
- ✅ Protection des routes

### Gestion des projets
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Upload multiple d'images (jusqu'à 10 par projet)
- ✅ Stockage des images sur Cloudinary
- ✅ Vue en grille ou tableau
- ✅ Page de détails du projet

### Interface utilisateur
- ✅ Design moderne et responsive
- ✅ Composants Shadcn UI
- ✅ Notifications toast
- ✅ Confirmations de suppression
- ✅ États de chargement
- ✅ Validation des formulaires en temps réel

## 🛠 Technologies utilisées

### Backend
| Technologie | Version | Description |
|------------|---------|-------------|
| Node.js | 22.x | Runtime JavaScript |
| Express | 5.x | Framework web |
| TypeScript | 5.x | Typage statique |
| Prisma | 7.x | ORM moderne |
| JWT | 9.x | Authentification |
| Bcryptjs | 3.x | Hashage des mots de passe |
| Cloudinary | 2.x | Stockage d'images |
| Multer | 2.x | Upload de fichiers |

### Frontend
| Technologie | Version | Description |
|------------|---------|-------------|
| React | 19.x | Library UI |
| TypeScript | 5.x | Typage statique |
| Vite | 7.x | Build tool |
| React Router | 7.x | Navigation |
| Tailwind CSS | 4.x | Framework CSS |
| Shadcn UI | - | Composants UI |
| React Hook Form | 7.x | Gestion des formulaires |
| Zod | 4.x | Validation de schémas |
| Axios | 1.x | Client HTTP |
| React Hot Toast | 2.x | Notifications |
| Date-fns | 4.x | Manipulation de dates |

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v22 ou supérieur) - [Télécharger](https://nodejs.org/)
- **PostgreSQL** (v18 ou supérieur) - [Télécharger](https://www.postgresql.org/download/)
- **npm** ou **yarn** (inclus avec Node.js)
- **Compte Cloudinary** - [S'inscrire gratuitement](https://cloudinary.com/users/register/free)

### Vérifier les versions installées

```bash
node --version  # devrait afficher v18.x.x ou supérieur
npm --version   # devrait afficher 9.x.x ou supérieur
psql --version  # devrait afficher PostgreSQL 14.x ou supérieur
```

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/pnzaou/portfolio-manager.git
cd portfolio-manager
```

### 2. Installer les dépendances du Backend

```bash
cd server
npm install
```

### 3. Installer les dépendances du Frontend

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### 1. Configuration de PostgreSQL

Créez une base de données PostgreSQL :

```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE portfolio_db;

-- Créer un utilisateur (optionnel mais recommandé)
CREATE USER portfolio_user WITH PASSWORD 'votre_mot_de_passe_securise';

-- Donner tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;

-- Quitter
\q
```

### 2. Configuration de Cloudinary

1. Créez un compte sur [Cloudinary](https://cloudinary.com)
2. Accédez à votre Dashboard
3. Notez vos identifiants :
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Variables d'environnement Backend

Créez un fichier `.env` dans le dossier `backend/` :

```bash
cd backend
cp .env.example .env
```

Éditez le fichier `.env` :

```env
# Database - Remplacez par vos vraies valeurs
DATABASE_URL="postgresql://portfolio_user:votre_mot_de_passe_securise@localhost:5432/portfolio_db?schema=public"

# JWT Secret - Générez une clé aléatoire sécurisée
JWT_SECRET="votre_secret_jwt_tres_securise_ici"

# Server
PORT=5000
NODE_ENV=development

# Cloudinary - Remplacez par vos vraies valeurs
CLOUDINARY_CLOUD_NAME="votre_cloud_name"
CLOUDINARY_API_KEY="votre_api_key"
CLOUDINARY_API_SECRET="votre_api_secret"

# CORS (optionnel)
FRONTEND_URL="http://localhost:5173"
```

**💡 Générer un JWT Secret sécurisé :**

```bash
# Avec Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Ou avec OpenSSL
openssl rand -hex 64
```

### 4. Variables d'environnement Frontend

Créez un fichier `.env` dans le dossier `frontend/` :

```bash
cd ../frontend
cp .env.example .env
```

Éditez le fichier `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Migration de la base de données

Retournez dans le dossier backend et exécutez les migrations Prisma :

```bash
cd ../backend

# Créer les tables dans la base de données
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate
```

**✅ Vérification :** Vous devriez voir les tables `User`, `Project`, `Image`, et `Technology` créées dans votre base de données.

## 🎬 Lancer l'application

### Mode Développement

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

✅ Vous devriez voir : `✅ Serveur démarré sur le port 5000`

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

L'application démarre sur `http://localhost:5173`

✅ Vous devriez voir :
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Accéder à l'application

Ouvrez votre navigateur et accédez à : **http://localhost:5173**

## 📂 Structure du projet

```
portfolio-manager/
├── server/                      # API Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── cloudinary.ts    # Configuration Cloudinary
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts      # Logique d'authentification
│   │   │   └── project.controller.ts   # Logique CRUD projets
│   │   ├── middleware/
│   │   │   ├── auth.ts          # Middleware JWT
│   │   │   └── upload.ts        # Middleware Multer
│   │   ├── routes/
│   │   │   ├── auth.routes.ts   # Routes auth
│   │   │   └── project.routes.ts # Routes projets
│   │   ├── types/
│   │   │   └── index.ts         # Types TypeScript
│   │   └── server.ts            # Point d'entrée
│   ├── prisma/
│   │   └── schema.prisma        # Schéma de la base de données
│   ├── .env                     # Variables d'environnement (à créer)
│   ├── .env.example             # Exemple de variables
│   ├── package.json
│   └── tsconfig.json
│
├── client/                     # Application React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Composants Shadcn UI
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   ├── ProjectList.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx
│   │   │       └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ProjectDetail.tsx
│   │   ├── lib/
│   │   │   ├── api.ts           # Configuration Axios
│   │   │   └── utils.ts         # Utilitaires
│   │   ├── schemas/
│   │   │   └── project.schema.ts # Validation Zod
│   │   ├── types/
│   │   │   └── index.ts         # Types TypeScript
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Context d'authentification
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env                     # Variables d'environnement (à créer)
│   ├── .env.example             # Exemple de variables
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Inscription
Créer un nouveau compte utilisateur.

```http
POST /auth/register
```

**Body (JSON):**
```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Response (201):**
```json
{
  "message": "Utilisateur créé avec succès",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "jean.dupont@example.com",
    "name": "Jean Dupont"
  }
}
```

#### 2. Connexion
Se connecter à un compte existant.

```http
POST /auth/login
```

**Body (JSON):**
```json
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Response (200):**
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "jean.dupont@example.com",
    "name": "Jean Dupont"
  }
}
```

---

### Projects Endpoints

**⚠️ Toutes les routes suivantes nécessitent un token JWT dans le header :**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. Lister tous les projets
Récupérer tous les projets de l'utilisateur connecté.

```http
GET /projects
```

**Response (200):**
```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "Mon Super Projet",
      "description": "Description du projet...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "userId": "uuid",
      "images": [
        {
          "id": "uuid",
          "url": "https://res.cloudinary.com/...",
          "publicId": "portfolio-projects/xxx"
        }
      ],
      "technologies": [
        {
          "id": "uuid",
          "name": "React",
          "projectId": "uuid"
        }
      ]
    }
  ]
}
```

#### 4. Récupérer un projet
Obtenir les détails d'un projet spécifique.

```http
GET /projects/:id
```

**Response (200):**
```json
{
  "project": {
    "id": "uuid",
    "name": "Mon Super Projet",
    "description": "Description complète...",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "images": [...],
    "technologies": [...]
  }
}
```

#### 5. Créer un projet
Créer un nouveau projet avec images et technologies.

```http
POST /projects
Content-Type: multipart/form-data
```

**Body (FormData):**
```
name: "Nouveau Projet"
description: "Description du projet..."
technologies: ["React", "TypeScript", "Node.js"]
images: [File, File, File]  // Jusqu'à 10 images
```

**Response (201):**
```json
{
  "message": "Projet créé avec succès",
  "project": {
    "id": "uuid",
    "name": "Nouveau Projet",
    "description": "Description du projet...",
    "images": [...],
    "technologies": [...]
  }
}
```

#### 6. Modifier un projet
Mettre à jour un projet existant.

```http
PUT /projects/:id
Content-Type: multipart/form-data
```

**Body (FormData):**
```
name: "Projet Modifié" (optionnel)
description: "Nouvelle description..." (optionnel)
technologies: ["Vue", "Laravel"] (optionnel)
images: [File, File] (optionnel - nouvelles images à ajouter)
```

**Response (200):**
```json
{
  "message": "Projet mis à jour avec succès",
  "project": {
    // Projet mis à jour
  }
}
```

#### 7. Supprimer un projet
Supprimer un projet et toutes ses images.

```http
DELETE /projects/:id
```

**Response (200):**
```json
{
  "message": "Projet supprimé avec succès"
}
```

#### 8. Supprimer une image
Supprimer une image spécifique d'un projet.

```http
DELETE /projects/image/:imageId
```

**Response (200):**
```json
{
  "message": "Image supprimée avec succès"
}
```

#### 9. Lister les technologies
Obtenir toutes les technologies utilisées par l'utilisateur.

```http
GET /projects/technologies
```

**Response (200):**
```json
{
  "technologies": [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS"
  ]
}
```

---

### Codes d'erreur courants

| Code | Signification | Exemple |
|------|---------------|---------|
| 400 | Bad Request | Données manquantes ou invalides |
| 401 | Unauthorized | Token manquant ou invalide |
| 404 | Not Found | Ressource introuvable |
| 500 | Server Error | Erreur interne du serveur |

**Exemple d'erreur 401 :**
```json
{
  "message": "Token invalide"
}
```

## 📱 Utilisation

### 1. Créer un compte

1. Accédez à l'application : `http://localhost:5173`
2. Cliquez sur **"S'inscrire"**
3. Remplissez le formulaire :
   - Nom complet
   - Email
   - Mot de passe (minimum 6 caractères)
   - Confirmation du mot de passe
4. Cliquez sur **"S'inscrire"**

### 2. Se connecter

1. Sur la page de connexion
2. Entrez votre email et mot de passe
3. Cliquez sur **"Se connecter"**

### 3. Créer un projet

1. Sur le Dashboard, cliquez sur **"Nouveau projet"**
2. Remplissez le formulaire :
   - **Nom du projet** : Titre de votre projet
   - **Description** : Décrivez votre projet en détail
   - **Technologies** : 
     - Sélectionnez dans la liste déroulante
     - Ou cliquez sur "Autre" pour saisir une nouvelle technologie
   - **Images** : Cliquez sur la zone ou glissez-déposez jusqu'à 10 images
3. Cliquez sur **"Créer le projet"**

### 4. Modifier un projet

1. Sur le Dashboard, cliquez sur l'icône **✏️ (Edit)** d'un projet
2. Modifiez les informations souhaitées
3. Pour supprimer une image existante, survolez-la et cliquez sur **✕**
4. Cliquez sur **"Mettre à jour"**

### 5. Voir les détails d'un projet

1. Cliquez sur **"👁️ Voir"** ou sur la carte du projet
2. Visualisez toutes les informations
3. Cliquez sur une image pour la voir en plein écran
4. Supprimez des images individuellement avec le bouton **✕**

### 6. Supprimer un projet

1. Sur le Dashboard, cliquez sur l'icône **🗑️ (Supprimer)**
2. Confirmez la suppression dans la boîte de dialogue
3. Le projet et toutes ses images seront supprimés définitivement

## 🌐 Déploiement

### Backend (Railway, Render, ou Heroku)

#### Option 1 : Railway

1. Créez un compte sur [Railway](https://railway.app)
2. Créez un nouveau projet PostgreSQL
3. Créez un nouveau service Node.js
4. Connectez votre repo GitHub
5. Ajoutez les variables d'environnement
6. Railway détectera automatiquement votre `package.json` et déploiera

**Variables d'environnement Railway :**
```env
DATABASE_URL=postgresql://...  # Fourni automatiquement par Railway
JWT_SECRET=votre_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
NODE_ENV=production
```

#### Option 2 : Render

1. Créez un compte sur [Render](https://render.com)
2. Créez une base de données PostgreSQL
3. Créez un Web Service
4. Connectez votre repo GitHub
5. Configurez :
   - **Build Command:** `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `cd backend && npm start`
6. Ajoutez les variables d'environnement

### Frontend (Vercel ou Netlify)

#### Option 1 : Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre repo GitHub
3. Configurez :
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Ajoutez la variable d'environnement :
   ```env
   VITE_API_URL=https://votre-api.railway.app/api
   ```

#### Option 2 : Netlify

1. Créez un compte sur [Netlify](https://netlify.com)
2. Importez votre repo GitHub
3. Configurez :
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Ajoutez la variable d'environnement

### Configuration CORS en production

Mettez à jour votre backend `server.ts` :

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## 🔧 Scripts disponibles

### Backend

```bash
npm run dev      # Lancer en mode développement avec hot-reload
npm run build    # Compiler TypeScript en JavaScript
npm start        # Lancer en production (après build)
```

### Frontend

```bash
npm run dev      # Lancer en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build de production
npm run lint     # Linter le code
```

## 👨‍💻 Auteur

**Emmanuel** - Développeur Full Stack MERN

- GitHub: [@pnzaou](https://github.com/pnzaou)
- LinkedIn: [Perrin Emmanuel Nzaou](https://www.linkedin.com/in/perrin-emmanuel-nzaou-37941b307/)

## 🙏 Remerciements

- [Shadcn UI](https://ui.shadcn.com/) pour les composants UI
- [Cloudinary](https://cloudinary.com) pour le stockage d'images
- [Prisma](https://www.prisma.io/) pour l'ORM
- La communauté open source

---

⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !