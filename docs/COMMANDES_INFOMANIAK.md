# 🚀 Commandes à exécuter sur Infomaniak

**Date**: 2025-11-02
**Objectif**: Configurer le site en mode PRODUCTION

---

## 📋 Étape 1 : Accéder à la console Infomaniak

Dans le manager Infomaniak, accédez à la section **Consoles** de votre site `odillon.fr`.

---

## ⛔ Étape 2 : Arrêter l'application en développement

```bash
# Arrêter le processus actuel
# (cliquez sur le bouton "Arrêter" dans l'interface Infomaniak)
```

---

## 📦 Étape 3 : Créer le fichier de configuration

Dans la console SSH d'Infomaniak :

```bash
# Vérifier où vous êtes
pwd

# Créer le fichier .env.local pour la production
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://wicstfeflqkacazsompx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpY3N0ZmVmbHFrYWNhenNvbXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDQxNDQsImV4cCI6MjA3NzU4MDE0NH0._qTcFT7wjwbY1IZRI9ySrfp_AFiqPzIAoWMEDl0aTEI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpY3N0ZmVmbHFrYWNhenNvbXB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjAwNDE0NCwiZXhwIjoyMDc3NTgwMTQ0fQ.BXGRJDtV2XeFMXOK_jXxd9PKl7gky2MNw-Nhj9Fwkdk
ADMIN_EMAIL=dereckdanel@odillon.fr
NEXT_PUBLIC_SITE_URL=https://odillon.fr
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
EOF

# Vérifier que le fichier a bien été créé
cat .env.local
```

---

## 🏗️ Étape 4 : Builder l'application

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Builder pour la production
npm run build
```

**⏱️ Attendez**: Le build peut prendre 2-5 minutes.

---

## ▶️ Étape 5 : Démarrer en mode PRODUCTION

### Option A : Via l'interface Infomaniak (recommandé)

1. Retournez dans l'interface Infomaniak
2. Cherchez le bouton **"Redémarrer"** ou **"Démarrer"**
3. Assurez-vous que la commande de démarrage est `npm start` (et PAS `npm run dev`)

### Option B : Via la console

```bash
# Démarrer en production
npm start
```

---

## ✅ Étape 6 : Vérifier que tout fonctionne

```bash
# Vérifier les logs
# (dans l'interface Infomaniak, section Consoles)
```

Vous devriez voir :
```
✓ Ready in XXXms
Network: http://172.16.31.4:3000
Local: http://localhost:3000
```

---

## 🌐 Étape 7 : Tester le site

Ouvrez votre navigateur et visitez :

1. **https://odillon.fr** - Page d'accueil
2. **https://odillon.fr/admin/login** - Page admin
3. Testez la connexion avec votre email Supabase

---

## 🔍 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs

# Ou dans la console Infomaniak
# (cherchez l'onglet "Logs")
```

### "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Port déjà utilisé

```bash
# Trouver le processus qui utilise le port
lsof -i :3000

# Ou tuer tous les processus node
pkill -f node

# Puis redémarrer
npm start
```

---

## 📝 Notes importantes

- ⚠️ **NE JAMAIS** utiliser `npm run dev` en production
- ⚠️ **TOUJOURS** builder avec `npm run build` avant de démarrer
- ⚠️ Le fichier `.env.local` ne doit PAS être commité dans Git
- ✅ Les variables `NEXT_PUBLIC_*` sont accessibles côté client
- ✅ Les autres variables sont UNIQUEMENT côté serveur

---

## 🔄 Pour les mises à jour futures

```bash
# Se connecter en SSH
ssh votre-user@odillon.fr

# Aller dans le dossier du site
cd /chemin/vers/site

# Récupérer les dernières modifications
git pull origin master

# Réinstaller si nécessaire
npm install

# Rebuilder
npm run build

# Redémarrer via l'interface Infomaniak
# OU via PM2 si installé
pm2 restart odillon-site
```

---

**Besoin d'aide ?** Consultez le support Infomaniak ou vos logs d'erreur !
