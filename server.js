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

/* require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");


sequelize.authenticate()
  .then(() => {
    console.log("✅ MariaDB connecté");
    app.listen(PORT, () =>
      console.log(`🚀 API sur http://0.0.0.0:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erreur DB", err));
 */

/* 
  require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = require("./src/app"); // Express app déjà configuré
const { connectDB } = require("./src/config/db");

const app = express();
app.use(cors({
  origin: [
    "https://trouve-artisan-frontend.vercel.app",
    "https://trouve-artisan-frontend-git-f-2f7041-mohameds-projects-8c8684ce.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); //url frontend
app.use(express.json());



// Connectez la DB puis démarrez le serveur
connectDB().finally(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on 0.0.0.0:${PORT}`);
  });
}); */

/* require("dotenv").config();
const { connectDB } = require("./src/config/db");
const app = require("./src/app"); // app corrigé

connectDB().finally(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on 0.0.0.0:${PORT}`);
  });
});
 */

require("dotenv").config();
const sequelize = require("./src/config/db"); // ← juste l'instance Sequelize
const app = require("./src/app"); 

// Synchroniser la DB (crée les tables si elles n'existent pas)
sequelize.sync()
  .then(() => {
    console.log("✅ Database connected and tables are ready");

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on 0.0.0.0:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Unable to connect to the database:", err);
  });
