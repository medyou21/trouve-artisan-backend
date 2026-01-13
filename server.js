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
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API OK 🚀"));

// Connectez la DB puis démarrez le serveur
connectDB().finally(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on 0.0.0.0:${PORT}`);
  });
});
