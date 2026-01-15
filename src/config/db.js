/**
 * Configuration de la connexion à la base de données
 * via Sequelize (MySQL / MariaDB)
 */

const { Sequelize } = require("sequelize");

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB,        // Nom de la base de données
  process.env.MYSQL_ADDON_USER,      // Utilisateur
  process.env.MYSQL_ADDON_PASSWORD,  // Mot de passe
  {
    host: process.env.MYSQL_ADDON_HOST, // Hôte Clever Cloud
    port: process.env.MYSQL_ADDON_PORT, // Port Clever Cloud
    dialect: "mysql",

    /**
     * Active les logs SQL uniquement en développement
     */
    logging: process.env.NODE_ENV === "development" ? console.log : false,

    /**
     * Options globales des modèles
     */
    define: {
      timestamps: true,
      underscored: true,
    },

    /**
     * Pool de connexions
     */
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test de la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données établie avec succès");
  })
  .catch((error) => {
    console.error("❌ Impossible de se connecter à la base de données :", error);
  });

module.exports = sequelize;
