// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// Routes
const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");
const villeRoutes = require("./routes/ville.routes");
const departementRoutes = require("./routes/departement.routes");
const specialiteRoutes = require("./routes/specialite.routes");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// 🔹 Logs HTTP (uniquement en dev)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 🔹 Sécurité HTTP headers
app.use(helmet());

// 🔹 CORS : autorisation de certains domaines
const allowedOrigins = [
  process.env.FRONT_URL,
  "https://trouve-artisan-frontend-mohameds-projects-8c8684ce.vercel.app",
  "https://trouve-artisan-frontend-git-main-mohameds-projects-8c8684ce.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / serveur
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// 🔹 Parser JSON
app.use(express.json({ limit: "20kb" }));

// 🔹 Limiteur de requêtes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par IP
    message: { message: "Trop de requêtes, réessayez plus tard" },
  })
);

// 🔹 Routes API
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/villes", villeRoutes);
app.use("/api/departements", departementRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// 🔹 Route racine
app.get("/", (req, res) => {
  res.status(200).json({ status: "API OK 🚀" });
});

// 🔹 Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur globale :", err.message);
  if (process.env.NODE_ENV === "development") console.error(err.stack);

  if (err.message === "CORS not allowed") {
    return res.status(403).json({ message: "Origine non autorisée" });
  }
  res.status(500).json({ message: "Erreur serveur" });
});

module.exports = app;
