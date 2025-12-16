# Odillon - Ingénierie d'Entreprises

Site web officiel du cabinet Odillon spécialisé en ingénierie d'entreprises.

## Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI réutilisables
- **Framer Motion** - Animations fluides et professionnelles
- **Lucide React** - Icônes modernes
- **Supabase** - Backend as a Service (authentification, base de données, stockage)
- **Radix UI** - Primitives UI accessibles (via shadcn/ui)
- **date-fns** - Manipulation de dates
- **react-fast-marquee** - Animations de défilement

## Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Compte Supabase (pour la gestion de photos)

### Installation

```bash
npm install
```

### Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
ADMIN_EMAIL=votre-email@odillon.com
```

> 📖 **Note** : Consultez [`docs/DEMARRAGE_RAPIDE_SUPABASE.md`](./docs/DEMARRAGE_RAPIDE_SUPABASE.md) pour la configuration complète de Supabase.

### Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm start
```

## Fonctionnalités

### Interface utilisateur
- ✅ Design ultra professionnel et moderne
- ✅ Animations subtiles et performantes
- ✅ Responsive sur tous les devices
- ✅ Navigation fluide avec scroll smooth
- ✅ Formulaire de contact
- ✅ SEO optimisé
- ✅ Performance optimisée
- ✅ Indicateur de progression de scroll
- ✅ Bouton retour en haut de page
- ✅ Calendrier des événements du Gabon

### Pages disponibles
- 🏠 **Accueil** (`/`) - Page principale avec toutes les sections
- 📋 **Services** (`/services`) - Détails des services proposés
- 🎯 **Expertise** (`/expertise`) - Domaines d'expertise détaillés
- 👥 **À propos** (`/a-propos`) - Présentation du cabinet
- 📞 **Contact** (`/contact`) - Formulaire de contact

### Administration
- 🔐 **Système d'authentification** - Connexion sécurisée via Supabase
- 📸 **Gestion de photos** (`/admin/photos`) - Interface d'administration pour gérer les photos du hero
- 🎨 **Thématiques mensuelles** - Gestion des campagnes de sensibilisation (Octobre Rose, Novembre Bleu, etc.)
- 📤 **Upload de fichiers** - Upload et gestion des photos via Supabase Storage

## 📚 Documentation

La documentation complète du projet se trouve dans le dossier [`docs/`](./docs/) :

### Guides essentiels
- 📖 **[Index de la documentation](./docs/INDEX_DOCUMENTATION.md)** - Point d'entrée complet
- 👋 **[Lisez en premier](./docs/LIRE_EN_PREMIER.md)** - Guide de démarrage rapide
- 🚀 **[Démarrage rapide](./docs/DEMARRAGE_RAPIDE.md)** - Pour démarrer immédiatement
- 🎉 **[Présentation](./docs/PRESENTATION.md)** - Vue d'ensemble du projet
- ✨ **[Fonctionnalités](./docs/FONCTIONNALITES.md)** - Liste détaillée des features
- 📘 **[Guide d'utilisation](./docs/GUIDE_UTILISATION.md)** - Guide complet

### Supabase et administration
- 🗄️ **[Démarrage rapide Supabase](./docs/DEMARRAGE_RAPIDE_SUPABASE.md)** - Configuration Supabase en 15 min
- 🔐 **[Intégration Supabase complète](./docs/INTEGRATION_SUPABASE_COMPLETE.md)** - Détails techniques
- 📸 **[Système de gestion de photos](./docs/SYSTEME_GESTION_PHOTOS.md)** - Guide d'utilisation
- 🎨 **[Intégration admin photos](./docs/INTEGRATION_ADMIN_PHOTOS.md)** - Interface d'administration

### Déploiement
- 🚀 **[Guide déploiement Vercel](./docs/GUIDE_DEPLOIEMENT_VERCEL.md)** - Déploiement sur Vercel
- 🌐 **[Déploiement Infomaniak](./docs/GUIDE_DEPLOIEMENT_INFOMANIAK_NODEJS.md)** - Déploiement sur Infomaniak

## Structure du projet

```
├── app/                           # Pages Next.js (App Router)
│   ├── a-propos/                  # Page À propos
│   ├── admin/                     # Zone d'administration
│   │   ├── login/                 # Page de connexion
│   │   ├── photos/               # Gestion des photos
│   │   └── layout.tsx             # Layout protégé
│   ├── api/                       # Routes API
│   │   ├── photos/                # API gestion photos
│   │   └── upload/                # API upload fichiers
│   ├── auth/                      # Authentification
│   │   └── callback/              # Callback OAuth
│   ├── contact/                   # Page Contact
│   ├── expertise/                 # Page Expertise
│   ├── services/                  # Page Services
│   ├── globals.css                # Styles globaux
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Page d'accueil
│   └── fonts.ts                   # Configuration des polices
├── components/
│   ├── layout/                    # Composants de structure
│   │   ├── header.tsx              # Header standard
│   │   ├── header-pro.tsx          # Header professionnel
│   │   └── footer.tsx              # Footer
│   ├── magicui/                   # Composants d'animation
│   │   ├── animated-gradient.tsx
│   │   ├── blur-fade.tsx
│   │   ├── fade-in.tsx
│   │   ├── scroll-progress.tsx
│   │   └── scroll-to-top.tsx
│   ├── pages/                     # Composants de pages
│   ├── sections/                  # Sections de la page
│   │   ├── hero.tsx               # Section hero
│   │   ├── services-home.tsx      # Services (accueil)
│   │   ├── expertise-home.tsx     # Expertise (accueil)
│   │   ├── about-home.tsx         # À propos (accueil)
│   │   ├── contact-home.tsx       # Contact (accueil)
│   │   └── trusted-by-home.tsx    # Partenaires
│   └── ui/                        # Composants shadcn/ui
│       ├── background-slideshow.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (36 composants)
├── lib/
│   ├── supabase/                  # Configuration Supabase
│   │   ├── client.ts              # Client navigateur
│   │   ├── server.ts              # Client serveur
│   │   └── middleware.ts          # Middleware
│   ├── utils.ts                   # Utilitaires
│   ├── gabon-events.ts            # Événements du Gabon
│   └── photo-themes.ts            # Thématiques photos
├── supabase/
│   ├── migrations/                # Migrations SQL
│   └── schema.sql                 # Schéma de base de données
├── scripts/                       # Scripts utilitaires
│   ├── init-supabase.mjs         # Initialisation Supabase
│   ├── create-admin-user.mjs     # Création utilisateur admin
│   └── test-supabase-connection.mjs
├── docs/                          # Documentation complète
├── public/                        # Fichiers statiques
│   ├── images/                    # Images
│   ├── icons/                     # Icônes
│   └── fonts/                     # Polices personnalisées
└── middleware.ts                  # Middleware Next.js
```

## Domaines d'expertise

1. **Gouvernance** - Structuration et règles de bonne gouvernance
2. **Juridique** - Service juridique externalisé complet
3. **Finances** - Conseil financier et levée de fonds
4. **Administration & RH** - Gestion complète des ressources humaines

## Contact

- **Téléphone** : +241 11747574
- **Email** : contact@odillon.fr
- **Adresse** : BP- 13262 Libreville, Gabon
- **Site web** : www.odillon.fr

## Scripts disponibles

Le projet inclut plusieurs scripts utilitaires dans le dossier `scripts/` :

- `init-supabase.mjs` - Initialise la configuration Supabase
- `create-admin-user.mjs` - Crée un utilisateur administrateur
- `test-supabase-connection.mjs` - Teste la connexion à Supabase
- `configure-storage.mjs` - Configure le bucket de stockage
- `add-test-photo.mjs` - Ajoute une photo de test

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase | ✅ Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique anonyme Supabase | ✅ Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase | ✅ Oui (admin) |
| `ADMIN_EMAIL` | Email de l'administrateur | ✅ Oui (admin) |

> ⚠️ **Important** : Ne commitez jamais le fichier `.env.local` ! Il est déjà dans `.gitignore`.

## License

© 2024 Odillon - Ingénierie d'Entreprises. Tous droits réservés.

