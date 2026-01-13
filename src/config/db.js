/* // src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur MongoDB :", error);
    process.exit(1);
  }
};

module.exports = connectDB; */


// src/config/db.js
const { Sequelize } = require("sequelize");

// Utilisation des variables fournies par Clever Cloud
const sequelize = new Sequelize(
  process.env.MYSQL_ADDON_DB,         // nom de la base
  process.env.MYSQL_ADDON_USER,       // utilisateur
  process.env.MYSQL_ADDON_PASSWORD,   // mot de passe
  {
    host: process.env.MYSQL_ADDON_HOST,  // hôte
    port: process.env.MYSQL_ADDON_PORT,  // port (optionnel, 3306 par défaut)
    dialect: "mysql",                    // ou "mariadb" si vous utilisez MariaDB
    logging: false,
  }
);

// Fonction pour tester la connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1); // quitte le processus si la DB ne se connecte pas
  }
};

module.exports = { sequelize, connectDB };

