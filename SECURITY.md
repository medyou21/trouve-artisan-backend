# Sécurité de Trouve-Artisan

## Mesures appliquées

- Authentification administrateur par mot de passe haché avec bcrypt.
- JWT signé, rôle `admin` et durée de validité de deux heures.
- Validation et normalisation des entrées avec `express-validator`.
- Liste blanche des champs acceptés pour prévenir le mass assignment.
- Requêtes SQL paramétrées via Sequelize.
- Helmet, liste blanche CORS, limite de taille JSON et rate limiting.
- Secrets stockés dans `.env`, qui est exclu du dépôt.

## Configuration

Copier `.env.example` vers `.env`, renseigner les variables et générer
l’empreinte du mot de passe administrateur avec :

```bash
node scripts/hash-password.js "un-mot-de-passe-long"
```

Ne jamais publier le fichier `.env`. Tout secret déjà partagé doit être remplacé.

## Contrôles avant déploiement

```bash
npm test
npm audit
```
