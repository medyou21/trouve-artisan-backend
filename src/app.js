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

const express = require("express");
const cors = require("cors");

const artisanRoutes = require("./routes/artisan.routes");
const categoryRoutes = require("./routes/category.routes");


const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ status: 'API OK 🚀' });
});
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
