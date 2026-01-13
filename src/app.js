// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

// 🔹 Sécurité HTTP headers
app.use(helmet());

// 🔹 CORS : autorise plusieurs domaines (Vercel + localhost pour dev)
const allowedOrigins = [
  "https://trouve-artisan-frontend-mohameds-projects-8c8684ce.vercel.app",
  "https://trouve-artisan-frontend-git-main-mohameds-projects-8c8684ce.vercel.app",
  "http://localhost:5173", // si dev local avec Vite
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman ou serveur
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// 🔹 Parser JSON
app.use(express.json());

// 🔹 Limiteur de requêtes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requêtes par IP
  })
);

// 🔹 Routes API
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);

// 🔹 Route racine pour test
app.get("/", (req, res) => {
  res.json({ status: "API OK 🚀" });
});

module.exports = app;
