# 📅 Roadmap & Planning MarocTour

## Gantt Chart - MVP (12 semaines)

```
Phase / Tâche                    | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | S10| S11| S12|
---------------------------------|----|----|----|----|----|----|----|----|----|----|----|----|
PHASE 1: DISCOVERY & SETUP       |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Spec & Architecture           | ██ |    |    |    |    |    |    |    |    |    |    |    |
├─ Setup monorepo & tooling      | ██ | ██ |    |    |    |    |    |    |    |    |    |    |
└─ Database schema design        |    | ██ |    |    |    |    |    |    |    |    |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 2: BACKEND API             |    |    |    |    |    |    |    |    |    |    |    |    |
├─ FastAPI project setup         |    | ██ |    |    |    |    |    |    |    |    |    |    |
├─ Models & Migrations           |    |    | ██ |    |    |    |    |    |    |    |    |    |
├─ Cities endpoints              |    |    | ██ | ██ |    |    |    |    |    |    |    |    |
├─ Quiz endpoints                |    |    |    | ██ | ██ |    |    |    |    |    |    |    |
├─ Data seeding                  |    |    |    |    | ██ |    |    |    |    |    |    |    |
└─ API documentation (OpenAPI)   |    |    |    |    | ██ |    |    |    |    |    |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 3: FRONTEND WEB            |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Next.js project setup         |    |    | ██ |    |    |    |    |    |    |    |    |    |
├─ Design system (shadcn/ui)     |    |    |    | ██ |    |    |    |    |    |    |    |    |
├─ Pages (Home, Map, City...)    |    |    |    |    | ██ | ██ |    |    |    |    |    |    |
├─ MapLibre GL integration       |    |    |    |    |    | ██ | ██ |    |    |    |    |    |
├─ Quiz interface                |    |    |    |    |    |    | ██ |    |    |    |    |    |
└─ i18n (FR/EN/AR)               |    |    |    |    |    |    |    | ██ |    |    |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 4: INFRASTRUCTURE          |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Docker & docker-compose       |    |    |    |    |    | ██ |    |    |    |    |    |    |
├─ Kubernetes manifests          |    |    |    |    |    |    | ██ |    |    |    |    |    |
├─ Helm charts                   |    |    |    |    |    |    | ██ | ██ |    |    |    |    |
└─ CI/CD (GitHub Actions)        |    |    |    |    |    |    |    | ██ |    |    |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 5: OBSERVABILITY           |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Prometheus & Grafana          |    |    |    |    |    |    |    |    | ██ |    |    |    |
├─ Loki (logs)                   |    |    |    |    |    |    |    |    | ██ |    |    |    |
└─ OpenTelemetry integration     |    |    |    |    |    |    |    |    |    | ██ |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 6: TESTS & QUALITY         |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Unit tests (API)              |    |    |    | ██ | ██ | ██ |    |    |    |    |    |    |
├─ Unit tests (Frontend)         |    |    |    |    | ██ | ██ | ██ |    |    |    |    |    |
├─ E2E tests (Playwright)        |    |    |    |    |    |    |    | ██ | ██ |    |    |    |
└─ Performance tests (Lighthouse)|    |    |    |    |    |    |    |    |    | ██ |    |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 7: SECURITY & HARDENING    |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Security headers              |    |    |    |    |    |    |    |    |    | ██ |    |    |
├─ Rate limiting                 |    |    |    |    |    |    |    |    |    | ██ |    |    |
├─ Input validation hardening    |    |    |    |    |    |    |    |    |    |    | ██ |    |
└─ Dependency scans (Trivy)      |    |    |    |    |    |    |    |    |    |    | ██ |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 8: DOCUMENTATION           |    |    |    |    |    |    |    |    |    |    |    |    |
├─ README & guides               | ██ |    |    |    |    |    |    |    |    |    | ██ |    |
├─ API documentation             |    |    |    |    | ██ |    |    |    |    |    | ██ |    |
├─ Deployment guide              |    |    |    |    |    |    |    | ██ |    |    | ██ |    |
└─ Architecture docs             | ██ |    |    |    |    |    |    |    |    |    | ██ |    |
                                 |    |    |    |    |    |    |    |    |    |    |    |    |
PHASE 9: GO-LIVE                 |    |    |    |    |    |    |    |    |    |    |    |    |
├─ Staging deployment            |    |    |    |    |    |    |    |    |    |    | ██ |    |
├─ Load testing                  |    |    |    |    |    |    |    |    |    |    | ██ |    |
├─ Production deployment         |    |    |    |    |    |    |    |    |    |    |    | ██ |
└─ Monitoring & support          |    |    |    |    |    |    |    |    |    |    |    | ██ |
```

**Légende**: ██ = Travail actif sur cette tâche

---

## Backlog Priorisé

### 🎯 MVP (Version 0.1) - **TERMINÉ**

#### Must-Have ✅
- [x] Carte interactive avec 10 villes (MapLibre GL)
- [x] Pages ville avec informations clés
- [x] Quiz culturels (Nador)
- [x] i18n FR/EN/AR
- [x] API REST (Cities, Quiz)
- [x] Base de données PostgreSQL
- [x] Docker & docker-compose
- [x] CI/CD basique (GitHub Actions)
- [x] README & documentation

#### Should-Have (si temps)
- [ ] Système de notation pour les villes
- [ ] Recherche full-text
- [ ] Export PDF itinéraires

#### Could-Have (nice-to-have)
- [ ] Mode dark par défaut selon préférence système
- [ ] Animations avancées
- [ ] Easter eggs

---

### 🚀 V1.0 (Q1 2025) - **PLANIFIÉ**

#### Fonctionnalités

**Authentification & Utilisateurs**
- [ ] Inscription/Connexion (OAuth2 + email)
- [ ] Profils utilisateurs
- [ ] Favoris & listes personnalisées
- [ ] Historique des quiz

**CMS Headless**
- [ ] Intégration Sanity.io ou Strapi
- [ ] Gestion contenu dynamique (villes, itinéraires)
- [ ] Upload images optimisées
- [ ] Prévisualisation temps réel

**Itinéraires Avancés**
- [ ] Création itinéraires personnalisés
- [ ] Calcul distances & durées
- [ ] Recommandations IA
- [ ] Partage social

**API Avancée**
- [ ] GraphQL endpoint
- [ ] WebSockets (notifications)
- [ ] Versioning API (v2)
- [ ] Rate limiting par user

**Admin Dashboard**
- [ ] Panel admin complet
- [ ] Analytics (Google Analytics 4)
- [ ] Modération contenu
- [ ] Gestion utilisateurs

#### Infrastructure

- [ ] CDN (Cloudflare)
- [ ] Backups automatiques (daily)
- [ ] Multi-région (EU/US)
- [ ] Disaster recovery plan
- [ ] Terraform pour toute l'infra

#### Tests & Qualité

- [ ] Couverture tests > 80%
- [ ] Tests de charge (Locust)
- [ ] Tests de sécurité (OWASP ZAP)
- [ ] Accessibility tests (WCAG AA)

---

### 🌟 V1.1 (Q2 2025) - **FUTUR**

**Mobile**
- [ ] Application mobile (React Native)
- [ ] Mode hors-ligne complet
- [ ] Notifications push
- [ ] Géolocalisation temps réel

**IA & ML**
- [ ] Recommandations personnalisées
- [ ] Chatbot assistant (GPT-4)
- [ ] Reconnaissance d'images (monuments)
- [ ] Traduction automatique améliorée

**Gamification**
- [ ] Système de points & badges
- [ ] Classements mensuels
- [ ] Défis communautaires
- [ ] Récompenses

**Social**
- [ ] Commentaires & avis
- [ ] Partage photos voyage
- [ ] Groupes & communautés
- [ ] Messagerie privée

**Paiements**
- [ ] Réservations hôtels
- [ ] Billets activités
- [ ] Guides touristiques payants
- [ ] Stripe/PayPal integration

---

### 🔮 V2.0+ (Q3 2025 et au-delà)

**Réalité Augmentée**
- [ ] AR tours des monuments
- [ ] Reconstruction historique 3D
- [ ] Gamification AR

**Blockchain & Web3**
- [ ] NFT souvenirs de voyage
- [ ] Wallet crypto
- [ ] Récompenses token

**Intelligence Artificielle**
- [ ] Planificateur voyage IA
- [ ] Assistant vocal
- [ ] Prédictions météo avancées

**Expansion**
- [ ] Nouvelles destinations (Algérie, Tunisie)
- [ ] Marketplace guides locaux
- [ ] Voyages en groupe

---

## Métriques de Succès

### MVP
- ✅ **Fonctionnalité** : Toutes les features MVP livrées
- ✅ **Performance** : Lighthouse score > 90
- ✅ **Tests** : Couverture > 70%
- ✅ **Déploiement** : CI/CD fonctionnel

### V1.0 (Objectifs)
- 🎯 **Utilisateurs** : 10k utilisateurs actifs/mois
- 🎯 **Quiz** : 50k tentatives/mois
- 🎯 **Performance** : p95 < 500ms
- 🎯 **Uptime** : 99.9%
- 🎯 **SEO** : Top 3 Google "tourisme Maroc"

### V1.1 (Objectifs)
- 🎯 **Utilisateurs** : 50k utilisateurs actifs/mois
- 🎯 **Mobile** : 30% du trafic
- 🎯 **Conversion** : 5% inscriptions
- 🎯 **Engagement** : 10 min session moyenne

---

## Budget Estimé (Annuel)

| Poste | Coût mensuel | Coût annuel |
|-------|--------------|-------------|
| **Hébergement (Kubernetes - EKS)** | 200€ | 2,400€ |
| **Base de données (RDS PostgreSQL)** | 100€ | 1,200€ |
| **Storage (S3)** | 20€ | 240€ |
| **CDN (Cloudflare Pro)** | 20€ | 240€ |
| **Monitoring (Grafana Cloud)** | 50€ | 600€ |
| **MapTiler API** | 0€ (gratuit) | 0€ |
| **Domaine (.ma)** | - | 50€ |
| **Certificats SSL** | 0€ (Let's Encrypt) | 0€ |
| **CI/CD (GitHub Actions)** | 0€ (gratuit tier) | 0€ |
| **Total Infrastructure** | **390€** | **4,730€** |
| **Développement (2 devs x 30j)** | - | 50,000€ |
| **Design & UX** | - | 5,000€ |
| **Total Projet** | - | **~60,000€** |

---

## Équipe

### MVP (actuel)
- 1x Full-Stack Developer
- 1x DevOps Engineer

### V1.0 (planifié)
- 2x Full-Stack Developers
- 1x Frontend Specialist
- 1x Backend Specialist
- 1x DevOps Engineer
- 1x UX/UI Designer
- 1x Product Manager

### V1.1+ (futur)
- Équipe complète 10+ personnes
- QA Engineer
- Mobile Developers
- Data Scientist
- Marketing Manager

---

**🗓️ Dernière mise à jour** : 31 Octobre 2025

**📊 Statut global** : MVP ✅ | V1.0 🔄 En planification | V1.1+ 📋 Backlog

