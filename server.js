require("dotenv").config();
const app = require("./src/app"); // Express app
const sequelize = require("./src/config/db"); // instance Sequelize

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    // 🔹 Vérifier la connexion à la DB
    await sequelize.authenticate();
    console.log("✅ Database connection OK");

    // 🔹 Synchronisation des tables (⚠️ uniquement en dev !)
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
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

startServer();
