# 🚀 Guide de Déploiement MarocTour

Ce guide couvre le déploiement de MarocTour sur différentes plateformes et environnements.

## Table des matières

1. [Prérequis](#prérequis)
2. [Déploiement Local (Docker Compose)](#déploiement-local-docker-compose)
3. [Déploiement Kubernetes Local (Minikube)](#déploiement-kubernetes-local-minikube)
4. [Déploiement Production (Cloud)](#déploiement-production-cloud)
5. [Configuration des Secrets](#configuration-des-secrets)
6. [Monitoring et Observabilité](#monitoring-et-observabilité)
7. [Rollback et Récupération](#rollback-et-récupération)

---

## Prérequis

### Outils requis

- **Docker** 24+ & **Docker Compose** 2+
- **Kubernetes** 1.28+ (Minikube pour local)
- **Helm** 3.12+
- **kubectl** 1.28+
- **Git**
- **Clé API MapTiler** (gratuite : https://www.maptiler.com/)

### Vérification

```bash
docker --version
docker-compose --version
kubectl version --client
helm version
```

---

## Déploiement Local (Docker Compose)

Idéal pour le développement et les tests locaux.

### 1. Cloner le repository

```bash
git clone https://github.com/votre-org/MarocTour.git
cd MarocTour
```

### 2. Configurer les variables d'environnement

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local
# Éditer apps/web/.env.local et ajouter votre clé MapTiler

# Backend
cp apps/api/.env.example apps/api/.env
# Éditer apps/api/.env si nécessaire
```

### 3. Démarrer les services

```bash
# Démarrer tous les services (PostgreSQL, Redis, MinIO, Prometheus, Grafana, Loki)
docker-compose up -d

# Vérifier que tout tourne
docker-compose ps

# Voir les logs
docker-compose logs -f
```

### 4. Initialiser la base de données

```bash
cd apps/api

# Appliquer les migrations
docker-compose exec -it api alembic upgrade head

# Peupler avec les données initiales
docker-compose exec -it api python scripts/seed.py
```

### 5. Accéder à l'application

- **Frontend** : http://localhost:3000
- **API Docs** : http://localhost:8000/docs
- **Grafana** : http://localhost:3001 (admin/admin)
- **Prometheus** : http://localhost:9090
- **MinIO Console** : http://localhost:9001 (minioadmin/minioadmin)

### 6. Arrêter les services

```bash
# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer également les volumes (⚠️ perte de données)
docker-compose down -v
```

---

## Déploiement Kubernetes Local (Minikube)

### 1. Démarrer Minikube

```bash
# Démarrer Minikube avec ressources adéquates
minikube start --cpus=4 --memory=8192 --disk-size=20g

# Activer les addons
minikube addons enable ingress
minikube addons enable metrics-server

# Vérifier le cluster
kubectl cluster-info
kubectl get nodes
```

### 2. Créer le namespace

```bash
kubectl create namespace maroctour
kubectl config set-context --current --namespace=maroctour
```

### 3. Créer les secrets

```bash
# Créer un fichier de secrets
cat <<EOF > secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: maroctour-secrets
  namespace: maroctour
type: Opaque
stringData:
  database-url: postgresql://maroctour:maroctour@maroctour-postgresql:5432/maroctour
  jwt-secret: super-secret-jwt-key-change-in-production-min-32-chars
  maptiler-key: VOTRE_CLE_MAPTILER_ICI
  minio-access-key: minioadmin
  minio-secret-key: minioadmin
EOF

# Appliquer
kubectl apply -f secrets.yaml

# Nettoyer (ne pas commit ce fichier!)
rm secrets.yaml
```

### 4. Installer avec Helm

```bash
# Ajouter les repos Helm nécessaires
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Installer MarocTour
helm install maroctour ./infra/helm/maroctour \
  --namespace maroctour \
  --create-namespace \
  --wait

# Vérifier le déploiement
kubectl get pods
kubectl get services
kubectl get ingress
```

### 5. Initialiser la base de données

```bash
# Trouver le pod API
API_POD=$(kubectl get pod -l app=maroctour-api -o jsonpath="{.items[0].metadata.name}")

# Appliquer les migrations
kubectl exec -it $API_POD -- alembic upgrade head

# Seed data
kubectl exec -it $API_POD -- python scripts/seed.py
```

### 6. Accéder à l'application

```bash
# Port-forward les services
kubectl port-forward svc/maroctour-web 3000:3000
kubectl port-forward svc/maroctour-api 8000:8000

# Ou utiliser Minikube tunnel (pour ingress)
minikube tunnel
# Puis accéder via http://maroctour.local (ajouter à /etc/hosts)
```

### 7. Voir les logs

```bash
# Logs du frontend
kubectl logs -f deployment/maroctour-web

# Logs du backend
kubectl logs -f deployment/maroctour-api

# Tous les logs d'un pod
kubectl logs -f <pod-name> --all-containers
```

### 8. Mettre à jour

```bash
# Mettre à jour les images
helm upgrade maroctour ./infra/helm/maroctour \
  --namespace maroctour \
  --set web.image.tag=new-version \
  --set api.image.tag=new-version

# Rollback si problème
helm rollback maroctour
```

### 9. Nettoyer

```bash
# Désinstaller l'application
helm uninstall maroctour --namespace maroctour

# Supprimer le namespace
kubectl delete namespace maroctour

# Arrêter Minikube
minikube stop

# Supprimer Minikube
minikube delete
```

---

## Déploiement Production (Cloud)

### Choix de la plateforme

- **AWS EKS** (Elastic Kubernetes Service)
- **GCP GKE** (Google Kubernetes Engine)
- **Azure AKS** (Azure Kubernetes Service)
- **DigitalOcean Kubernetes**

### Prérequis Production

1. **Cluster Kubernetes** configuré et accessible
2. **Registry privé** (GHCR, ECR, GCR, etc.)
3. **DNS** configuré (domaine propre)
4. **Certificats SSL** (Let's Encrypt via cert-manager)
5. **Monitoring** (Prometheus + Grafana)
6. **Logs centralisés** (Loki / ELK)

### Étapes générales

#### 1. Préparer l'infrastructure

```bash
# Exemple AWS avec terraform
cd infra/terraform/aws
terraform init
terraform plan
terraform apply

# Configurer kubectl
aws eks update-kubeconfig --name maroctour-cluster --region eu-west-1
```

#### 2. Installer cert-manager (pour TLS)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Créer un ClusterIssuer Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@maroctour.ma
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

#### 3. Installer NGINX Ingress Controller

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

#### 4. Créer les secrets de production

```bash
# Utiliser des secrets sécurisés!
kubectl create secret generic maroctour-secrets \
  --from-literal=database-url="postgresql://user:pass@db-endpoint:5432/maroctour" \
  --from-literal=jwt-secret="$(openssl rand -base64 32)" \
  --from-literal=maptiler-key="VOTRE_CLE" \
  --from-literal=minio-access-key="$(openssl rand -base64 16)" \
  --from-literal=minio-secret-key="$(openssl rand -base64 32)" \
  --namespace maroctour
```

#### 5. Déployer avec Helm

```bash
# Créer un fichier values-production.yaml
cat <<EOF > values-production.yaml
global:
  environment: production

web:
  replicaCount: 5
  image:
    repository: ghcr.io/votre-org/maroctour-web
    tag: "v1.0.0"
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi

api:
  replicaCount: 10
  image:
    repository: ghcr.io/votre-org/maroctour-api
    tag: "v1.0.0"
  resources:
    limits:
      cpu: 2000m
      memory: 2Gi
    requests:
      cpu: 1000m
      memory: 1Gi

postgresql:
  enabled: false  # Utiliser une DB managée (RDS, Cloud SQL, etc.)

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: maroctour.ma
      paths:
        - path: /
          service: maroctour-web
        - path: /api
          service: maroctour-api
  tls:
    - secretName: maroctour-tls
      hosts:
        - maroctour.ma
EOF

# Déployer
helm install maroctour ./infra/helm/maroctour \
  --namespace maroctour \
  --create-namespace \
  --values values-production.yaml
```

#### 6. Configurer le DNS

```bash
# Récupérer l'IP publique de l'ingress
kubectl get ingress -n maroctour

# Créer un enregistrement A dans votre DNS
# maroctour.ma -> <EXTERNAL-IP>
```

#### 7. Vérifier le déploiement

```bash
# Vérifier les pods
kubectl get pods -n maroctour

# Vérifier les services
kubectl get services -n maroctour

# Tester HTTPS
curl -I https://maroctour.ma
```

---

## Configuration des Secrets

### Utiliser Sealed Secrets (recommandé)

```bash
# Installer kubeseal
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Créer un secret sealed
kubectl create secret generic maroctour-secrets \
  --from-literal=jwt-secret="my-secret" \
  --dry-run=client -o yaml | \
  kubeseal -o yaml > sealed-secret.yaml

# Appliquer (peut être commité dans Git)
kubectl apply -f sealed-secret.yaml
```

### Utiliser un gestionnaire de secrets externe

- **HashiCorp Vault**
- **AWS Secrets Manager**
- **Azure Key Vault**
- **GCP Secret Manager**

---

## Monitoring et Observabilité

### Installer Prometheus & Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Port-forward Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# Accéder à Grafana : http://localhost:3000
# Login: admin / prom-operator
```

### Dashboards importants

- **Application Metrics** : ID Grafana 3662
- **Kubernetes Cluster** : ID 7249
- **NGINX Ingress** : ID 9614

### Alertes recommandées

```yaml
# Exemple d'alerte Prometheus
groups:
  - name: maroctour-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        annotations:
          summary: "Taux d'erreur élevé"
```

---

## Rollback et Récupération

### Rollback Helm

```bash
# Voir l'historique
helm history maroctour -n maroctour

# Rollback vers version précédente
helm rollback maroctour -n maroctour

# Rollback vers version spécifique
helm rollback maroctour 2 -n maroctour
```

### Rollback Kubernetes

```bash
# Voir l'historique d'un deployment
kubectl rollout history deployment/maroctour-api -n maroctour

# Rollback
kubectl rollout undo deployment/maroctour-api -n maroctour

# Rollback vers révision spécifique
kubectl rollout undo deployment/maroctour-api --to-revision=2 -n maroctour
```

### Backup Base de données

```bash
# Backup PostgreSQL
kubectl exec -it <postgres-pod> -- pg_dump -U maroctour maroctour > backup.sql

# Restore
kubectl exec -i <postgres-pod> -- psql -U maroctour maroctour < backup.sql
```

---

## Checklist Production

- [ ] Secrets sécurisés (pas de valeurs en clair)
- [ ] TLS/HTTPS activé (Let's Encrypt)
- [ ] Rate limiting configuré
- [ ] CORS correctement configuré
- [ ] Base de données managée (RDS, Cloud SQL)
- [ ] Backups automatiques (DB, volumes)
- [ ] Monitoring actif (Prometheus, Grafana)
- [ ] Logs centralisés (Loki, ELK)
- [ ] Alertes configurées (PagerDuty, Slack)
- [ ] Auto-scaling configuré (HPA)
- [ ] Resource limits et requests définis
- [ ] Health checks (liveness, readiness)
- [ ] DNS configuré
- [ ] CDN configuré (Cloudflare)
- [ ] Tests de charge effectués
- [ ] Plan de disaster recovery
- [ ] Documentation à jour

---

**📞 Support**

En cas de problème, contacter l'équipe DevOps : devops@maroctour.ma

