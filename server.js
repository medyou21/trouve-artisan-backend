// server.js
require("dotenv").config();              // Charge les variables d'environnement
const app = require("./src/app");        // Import de l'instance Express
const sequelize = require("./src/config/db"); // Import de Sequelize

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    // 🔹 Vérifie la connexion à la DB
    await sequelize.authenticate();
    console.log("✅ Database connection OK");

    // 🔹 Synchronisation automatique des tables (⚠️ uniquement en dev)
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true }); // ajuste les tables aux modèles
      console.log("✅ Tables synchronisées (dev mode)");
    }

    // 🔹 Démarrage du serveur
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Impossible de connecter la DB :", err);
    process.exit(1); // Quitte le process si DB indisponible
  }
}

// Lancer le serveur
startServer();
