const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB,       // nom de la base
  process.env.MYSQL_ADDON_USER,     // utilisateur
  process.env.MYSQL_ADDON_PASSWORD, // mot de passe
  {
    host: process.env.MYSQL_ADDON_HOST, // hôte Clever Cloud
    port: process.env.MYSQL_ADDON_PORT, // port Clever Cloud
    dialect: "mysql",
    logging: false, // désactive les logs SQL
  }
);

// Test de la connexion
sequelize.authenticate()
  .then(() => console.log("✅ Connexion DB OK"))
  .catch(err => console.error("❌ Erreur DB:", err));

module.exports = sequelize;
