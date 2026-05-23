# 🚀 Guide de Déploiement Gratuit - EdTech Platform

## 1. Préparer la Base de Données (Neon)

### Étapes :
1. Allez sur [neon.tech](https://neon.tech)
2. Inscrivez-vous avec votre compte GitHub
3. Créez un nouveau projet PostgreSQL
4. Copiez votre `DATABASE_URL` (ressemble à : `postgresql://user:pass@host/db`)

---

## 2. Déployer le Backend (Render)

### Prérequis :
- Votre code pushé sur GitHub
- `DATABASE_URL` de Neon

### Étapes :

1. **Allez sur** [render.com](https://render.com)
2. **Connectez** votre compte GitHub
3. **Créez un nouveau service** :
   - Type: `Web Service`
   - Repository: Votre repo EdTech
   - Root Directory: `apps/backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`

4. **Configurez les variables d'environnement** :
   ```
   DATABASE_URL = [Votre URL Neon]
   JWT_SECRET = [Générez une clé aléatoire sécurisée]
   JWT_EXPIRATION = 3600
   JWT_REFRESH_SECRET = [Générez une autre clé]
   JWT_REFRESH_EXPIRATION = 604800
   MAIL_HOST = smtp.gmail.com
   MAIL_PORT = 587
   MAIL_USER = [Votre email]
   MAIL_PASSWORD = [Votre mot de passe d'app Gmail]
   MAIL_FROM = noreply@votreappli.com
   ```

5. **Après déploiement**, notez votre URL : `https://your-app.onrender.com`

---

## 3. Déployer le Frontend (Vercel)

### Étapes :

1. **Allez sur** [vercel.com](https://vercel.com)
2. **Connectez** votre compte GitHub
3. **Importez** votre repository
4. **Sélectionnez** le répertoire racine : `apps/frontend`
5. **Configurez les variables d'environnement** :
   ```
   NEXT_PUBLIC_API_URL = https://your-app.onrender.com
   ```

6. **Cliquez sur "Deploy"** - c'est automatique ! 🎉

---

## 4. Configurer les Variables d'Environnement en Local

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=votre_secret_ici
JWT_REFRESH_SECRET=votre_secret_ici
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://votre-frontend-vercel.vercel.app
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-app.onrender.com
```

---

## 5. Initialiser la Base de Données

Une fois le backend déployé sur Render :

1. Allez dans **Render Dashboard** → Votre service
2. Ouvrez **Shell**
3. Exécutez :
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

---

## 6. Limites du Plan Gratuit ⚠️

| Service | Limite |
|---------|--------|
| **Neon** | 3GB storage, 1 projet |
| **Render** | 750 heures/mois, "hibernation" après 15min d'inactivité |
| **Vercel** | 100GB bandwidth/mois, déploiements illimités |

### Astuce : Pour éviter hibernation Render
Utilisez un service comme [Uptime Robot](https://uptimerobot.com) (gratuit) pour faire des requêtes HTTP chaque 5 min.

---

## 7. Commandes Utiles

```bash
# Générer les migrations
npm run db:generate

# Exécuter les migrations
npm run db:migrate

# Seed la base avec données de test
npm run db:seed

# Build en production
npm run build

# Vérifier les erreurs
npm run lint
```

---

## 8. Troubleshooting

### ❌ Backend redémarre constamment ?
- Vérifiez `DATABASE_URL` dans Render
- Vérifiez les logs : Dashboard → Logs

### ❌ Frontend montre "Cannot connect to API" ?
- Vérifiez `NEXT_PUBLIC_API_URL` dans Vercel
- Vérifiez CORS dans NestJS

### ❌ Base de données "out of memory" ?
- Upgrader Neon (version payante)
- Ou utiliser [Railway](https://railway.app) (crédit gratuit $5/mois)

---

## Alternative : Railway (Plus simple mais limité)

[Railway](https://railway.app) offre **$5 crédit gratuit/mois** :
- Déploiement full-stack en un clic
- Support PostgreSQL inclus
- Vraiment facile pour démarrer

