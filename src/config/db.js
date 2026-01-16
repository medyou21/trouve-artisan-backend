/**
 * Configuration Sequelize
 * MySQL / MariaDB (Clever Cloud)
 */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB,       // Nom de la base
  process.env.MYSQL_ADDON_USER,     // Utilisateur
  process.env.MYSQL_ADDON_PASSWORD, // Mot de passe
  {
    host: process.env.MYSQL_ADDON_HOST,
    port: process.env.MYSQL_ADDON_PORT,
    dialect: "mysql",

    /** Encodage recommandé */
    dialectOptions: {
      charset: "utf8mb4",
    },

    /** Fuseau horaire */
    timezone: "+01:00",

    /** Logs SQL */
    logging: process.env.NODE_ENV === "development" ? console.log : false,

    /** Options globales des modèles */
    define: {
      timestamps: true,        // created_at / updated_at
      underscored: true,       // snake_case
      freezeTableName: true,   // empêche la pluralisation automatique
    },

    /** Pool de connexions */
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Test de connexion
 */
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL établie avec succès");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error.message);
  }
})();

module.exports = sequelize;
