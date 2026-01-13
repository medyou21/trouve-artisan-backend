/* // src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONT_URL }));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;



 */
/* 
const express = require("express");
const cors = require("cors");

const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");


const app = express();
app.get('/', (req, res) => {
  res.json({ status: 'API OK 🚀' });
});
app.use(cors());
app.use(express.json());

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app; */

// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

// Sécurité HTTP headers
app.use(helmet());

// ✅ CORS pour plusieurs domaines Vercel
const allowedOrigins = [
  "https://trouve-artisan-frontend-mohameds-projects-8c8684ce.vercel.app/",
"https://trouve-artisan-frontend-git-main-mohameds-projects-8c8684ce.vercel.app/"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman ou serveur
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("CORS not allowed"));
  },
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per IP
  })
);

// Routes
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API OK 🚀" });
})
module.exports = app;
