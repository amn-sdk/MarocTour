#!/bin/bash

# Configuration
# Note: Ensure you have run 'docker login' if images are private, though pulling public is fine.
# Note: Ensure you have run 'minikube start' and 'kubectl config use-context minikube'.

echo "🚀 Starting Manual Deployment to Minikube..."

# 1. Update Image Tags (Using 'latest' or a specific tag if you built one locally)
# In CI we use GITHUB_SHA, here we'll assume 'latest' or ask user, but let's default to latest for simplicity 
# OR better: fetch the last git commit like CI does.
TAG=$(git rev-parse HEAD)
echo "📦 Using Image Tag: $TAG"

# We need to construct the full image name like in CI
USERNAME="aminesaddik" # Replace with your dockerhub username if different, or retrieve from logic
# Warning: This username is hardcoded for the script, ensure it matches your DockerHub.

echo "🔧 Updating Deployment Manifests with tag $TAG..."
# Create backup of yamls to avoid dirty git or simple sed in place
# We will use temporary files to apply to avoid modifying source
mkdir -p k8s/tmp
cp k8s/*.yaml k8s/tmp/

sed -i "" "s|IMAGE_BACKEND|$USERNAME/maroctour-backend:$TAG|g" k8s/tmp/backend-deployment.yaml
sed -i "" "s|IMAGE_FRONTEND|$USERNAME/maroctour-frontend:$TAG|g" k8s/tmp/frontend-deployment.yaml

# 2. Apply Manifests
echo "apply k8s configuration..."
kubectl apply -f k8s/tmp/configmap.yaml
kubectl apply -f k8s/tmp/secret.yaml
kubectl apply -f k8s/tmp/postgres-deployment.yaml
kubectl apply -f k8s/tmp/postgres-service.yaml
kubectl apply -f k8s/tmp/backend-deployment.yaml
kubectl apply -f k8s/tmp/backend-service.yaml
kubectl apply -f k8s/tmp/frontend-deployment.yaml
kubectl apply -f k8s/tmp/frontend-service.yaml

# 3. Check Rollout
echo "⏳ Waiting for rollout..."
kubectl rollout status deployment/backend-deployment
kubectl rollout status deployment/frontend-deployment

# Cleanup
rm -rf k8s/tmp

echo "✅ Deployment Complete! Access your app via 'minikube service frontend-loadbalancer'"
