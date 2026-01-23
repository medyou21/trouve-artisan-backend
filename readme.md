 🛠️ Trouve-Artisan – Backend API

Backend REST API du projet **Trouve-Artisan**, une plateforme permettant de rechercher des artisans par **catégorie, ville, département et spécialité**, et de les contacter via un formulaire.

Développé avec **Node.js, Express, Sequelize et MySQL**.

---

## 🚀 Technologies utilisées
- Node.js
- Express.js
- Sequelize ORM
- MySQL / MariaDB
- dotenv
- cors
- helmet
- express-rate-limit
- morgan
- nodemailer (formulaire de contact)

---

## 📁 Structure du projet

backend/
│
├── src/
│ ├── app.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── artisan.controller.js
│ │ ├── category.controller.js
│ │ ├── ville.controller.js
│ │ ├── departement.controller.js
│ │ ├── specialite.controller.js
│ │ └── contact.controller.js
│ ├── models/
│ │ ├── Artisan.js
│ │ ├── category.js
│ │ ├── ville.js
│ │ ├── departement.js
│ │ └── specialite.js
│ └── routes/
│ ├── artisan.routes.js
│ ├── category.routes.js
│ ├── ville.routes.js
│ ├── departement.routes.js
│ ├── specialite.routes.js
│ └── contact.routes.js
│
├── server.js
├── .env
├── package.json
└── README-backend.md


---

## ⚙️ Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/TON_REPO/backend-trouve-artisan.git
cd backend-trouve-artisan
2️⃣ Installer les dépendances
npm install
3️⃣ Configuration des variables d’environnement
Créer un fichier .env :

PORT=8080
NODE_ENV=development

DB_HOST=localhost
DB_NAME=trouve_artisan
DB_USER=root
DB_PASSWORD=motdepasse

FRONT_URL=http://localhost:5173
4️⃣ Lancer le serveur
# Développement
npm run dev

# Production
npm start
Serveur accessible sur : http://localhost:8080

🌐 Endpoints API
Artisans
Méthode	Endpoint	Description
GET	/api/artisans	Tous les artisans
GET	/api/artisans/top	Artisans mis en avant
GET	/api/artisans/search?query=	Recherche par nom
GET	/api/artisans/:id	Détail d’un artisan
Catégories
| GET | /api/categories |

Villes
| GET | /api/villes |
| GET | /api/villes/departement/:id |

Départements
| GET | /api/departements |

Spécialités
| GET | /api/specialites |

Contact
| POST | /api/contact |

Le formulaire envoie désormais artisan_id pour identifier le destinataire.

🔐 Sécurité
Helmet : sécurisation des headers HTTP

CORS : accès restreint au frontend autorisé

Rate Limit : protection contre les attaques bruteforce

Validation Sequelize sur les modèles

🧪 Tests rapides
curl http://localhost:8080/api/artisans
curl http://localhost:8080/api/categories
🚀 Déploiement
Compatible avec :

Clever Cloud

Railway

VPS (Docker ou PM2)

⚠️ Important : ne pas utiliser sequelize.sync({ alter: true }) en production, uniquement en développement.

📌 Auteur
👤 Mohamed Hamdi
💼 Développeur Web & Ingénieur Systèmes
📍 France

📄 Licence : Projet open-source, libre d’utilisation à des fins pédagogiques ou professionnelles.