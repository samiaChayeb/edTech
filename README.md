# 🎓 EdTech Platform

Plateforme éducative complète avec cours vidéo, classes virtuelles, chat temps réel, partage de documents et paiement en ligne.

## 🏗️ Architecture

```
edtech-platform/
├── apps/
│   ├── backend/          # NestJS API (port 4000)
│   │   ├── prisma/       # Schéma BDD + seeds
│   │   └── src/
│   │       ├── auth/     # JWT + refresh tokens + RBAC
│   │       ├── users/    # Gestion utilisateurs
│   │       ├── courses/  # CRUD cours + leçons + upload vidéo
│   │       ├── classrooms/ # Salles virtuelles
│   │       ├── documents/  # Upload/download fichiers
│   │       ├── payments/   # Stripe (mock en dev)
│   │       ├── gateway/    # WebSocket chat (Socket.io)
│   │       └── prisma/     # Service Prisma global
│   └── frontend/         # Next.js App Router (port 3000)
│       └── src/
│           ├── app/      # Pages (auth, dashboard, classrooms)
│           └── lib/      # API client, auth context
├── docker-compose.yml    # PostgreSQL + Redis
├── .env.example
└── README.md
```

## 🔐 Sécurité

| Fonctionnalité | Implémentation |
|---|---|
| Auth | JWT access + refresh tokens |
| RBAC | 3 rôles : ADMIN, PROFESSOR, STUDENT |
| Validation | class-validator (whitelist, forbidNonWhitelisted) |
| XSS | Helmet headers |
| Rate limiting | @nestjs/throttler (60 req/min) |
| Mots de passe | bcrypt (10 rounds) |
| CORS | Configurable via .env |

## 📊 Schéma Base de Données

- **User** – inscription, rôles, refresh tokens
- **Course** – CRUD par professeurs, statut (DRAFT/PUBLISHED/ARCHIVED)
- **Lesson** – vidéos par cours, ordonnées
- **Enrollment** – inscriptions étudiants aux cours
- **Classroom** – salles virtuelles avec participants
- **Message** – chat temps réel par salle
- **Document** – fichiers uploadés (PDF, DOC, images)
- **Payment** – transactions Stripe (mock en dev)

## 🚀 Lancer le projet en local

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- npm 9+

### 1. Cloner et configurer

```bash
git clone <repo-url> edtech-platform
cd edtech-platform
cp .env.example .env
```

### 2. Démarrer les services Docker

```bash
npm run docker:up
# → PostgreSQL sur localhost:5432
# → Redis sur localhost:6379
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Initialiser la base de données

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
cd ../..
```

### 5. Lancer en développement

```bash
npm run dev
# → Backend : http://localhost:4000
# → Frontend : http://localhost:3000
# → Swagger : http://localhost:4000/api/docs
```

### Comptes de test (seed)

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | admin@edtech.local | Password123! |
| Professeur | prof@edtech.local | Password123! |
| Étudiant | student@edtech.local | Password123! |

## 📡 API Endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Inscription | ❌ |
| POST | /api/auth/login | Connexion | ❌ |
| POST | /api/auth/refresh | Rafraîchir tokens | 🔑 Refresh |
| POST | /api/auth/logout | Déconnexion | 🔑 |
| GET | /api/users | Lister utilisateurs | 🔑 Admin |
| GET | /api/courses | Lister cours publiés | ❌ |
| POST | /api/courses | Créer un cours | 🔑 Prof/Admin |
| POST | /api/courses/:id/enroll | S'inscrire à un cours | 🔑 |
| POST | /api/courses/lessons/:id/video | Upload vidéo | 🔑 Prof/Admin |
| GET | /api/classrooms | Lister salles | 🔑 |
| POST | /api/classrooms | Créer salle | 🔑 Prof/Admin |
| POST | /api/classrooms/:id/join | Rejoindre salle | 🔑 |
| POST | /api/documents/upload | Upload document | 🔑 |
| GET | /api/documents/:id/download | Télécharger document | 🔑 |
| POST | /api/payments/course/:id | Payer un cours | 🔑 |

## 🔌 WebSocket (Socket.io)

Namespace : `/chat`

| Événement | Direction | Payload |
|---|---|---|
| joinRoom | Client → Server | `{ classroomId }` |
| leaveRoom | Client → Server | `{ classroomId }` |
| sendMessage | Client → Server | `{ classroomId, userId, content }` |
| newMessage | Server → Client | Message complet |
| userJoined | Server → Client | `{ socketId }` |
| userLeft | Server → Client | `{ socketId }` |

## ☁️ Guide de déploiement futur

### Option 1 : VPS (DigitalOcean, Hetzner, OVH)
1. Installer Docker sur le VPS
2. Pousser le code avec `git push`
3. Adapter `.env` avec les vrais secrets
4. `docker-compose -f docker-compose.prod.yml up -d`
5. Configurer un reverse proxy Nginx + SSL (Let's Encrypt)

### Option 2 : Cloud managed
- **Frontend** : Vercel (Next.js natif)
- **Backend** : Railway, Render, ou Fly.io
- **BDD** : Supabase PostgreSQL ou Neon
- **Redis** : Upstash
- **Fichiers** : AWS S3 / Cloudflare R2
- **Stripe** : Passer de mock à clés live

### Checklist avant production
- [ ] Changer tous les secrets JWT dans `.env`
- [ ] Configurer CORS strictement
- [ ] Activer HTTPS
- [ ] Remplacer le mock Stripe par les vraies clés
- [ ] Migrer le stockage fichiers vers S3/R2
- [ ] Ajouter des tests (Jest)
- [ ] Configurer CI/CD (GitHub Actions)
- [ ] Mettre en place le monitoring (Sentry)

## 📝 Licence

MIT
