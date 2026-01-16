require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    // ✅ Test connexion DB
    await sequelize.authenticate();
    console.log("✅ Database connection OK");

    // ⚠️ Synchronisation AUTO uniquement en DEV
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("🛠️ Tables synchronisées (DEV uniquement)");
    }

    // 🚀 Lancement serveur
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
