/* require("dotenv").config(); // Charge les variables d'environnement
const connectDB = require("./src/config/db"); // Fonction de connexion à MongoDB
const app = require("./src/app"); // Express app déjà configuré

// Connexion à MongoDB
connectDB();

// Définition du port
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`API MongoDB sur http://localhost:${PORT}`);
});
 */

require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log("✅ MariaDB connecté");
    app.listen(PORT, () =>
      console.log(`🚀 API sur http://0.0.0.0:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erreur DB", err));
