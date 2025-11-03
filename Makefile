.PHONY: help install dev build test clean docker-up docker-down migrate seed

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Affiche cette aide
	@echo "$(CYAN)MarocTour - Commandes disponibles$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Installe toutes les dépendances
	@echo "$(CYAN)Installation des dépendances...$(NC)"
	cd apps/web && pnpm install
	cd apps/api && pip install -r requirements.txt

dev: ## Lance l'environnement de développement
	@echo "$(CYAN)Démarrage en mode développement...$(NC)"
	docker-compose up -d postgres redis minio
	@echo "$(YELLOW)Lancez 'make dev-web' et 'make dev-api' dans des terminaux séparés$(NC)"

dev-web: ## Lance le frontend Next.js
	cd apps/web && pnpm dev

dev-api: ## Lance le backend FastAPI
	cd apps/api && uvicorn app.main:app --reload --port 8000

build: ## Build les images Docker
	@echo "$(CYAN)Build des images Docker...$(NC)"
	docker build -t maroctour-web:latest -f apps/web/Dockerfile apps/web
	docker build -t maroctour-api:latest -f apps/api/Dockerfile apps/api

test: ## Lance tous les tests
	@echo "$(CYAN)Exécution des tests...$(NC)"
	cd apps/web && pnpm test
	cd apps/api && pytest

test-e2e: ## Lance les tests E2E
	cd apps/web && pnpm test:e2e

lint: ## Vérifie le code (linting)
	@echo "$(CYAN)Vérification du code...$(NC)"
	cd apps/web && pnpm lint
	cd apps/api && ruff check . && black --check .

format: ## Formate le code
	@echo "$(CYAN)Formatage du code...$(NC)"
	cd apps/web && pnpm lint --fix
	cd apps/api && black . && ruff check . --fix

docker-up: ## Démarre tous les services Docker
	docker-compose up -d

docker-down: ## Arrête tous les services Docker
	docker-compose down

docker-logs: ## Affiche les logs Docker
	docker-compose logs -f

migrate: ## Applique les migrations de base de données
	cd apps/api && alembic upgrade head

seed: ## Peuple la base de données
	cd apps/api && python scripts/seed.py

clean: ## Nettoie les fichiers générés
	@echo "$(CYAN)Nettoyage...$(NC)"
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".next" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	@echo "$(GREEN)Nettoyage terminé!$(NC)"

setup: install docker-up migrate seed ## Installation complète du projet
	@echo "$(GREEN)✓ Installation terminée!$(NC)"
	@echo "$(YELLOW)Lancez 'make dev' pour démarrer$(NC)"

status: ## Affiche le statut des services
	@echo "$(CYAN)Statut des services Docker:$(NC)"
	@docker-compose ps

