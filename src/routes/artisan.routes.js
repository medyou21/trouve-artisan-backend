/* const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");
const Artisan = require("../models/Artisan");

// ✅ Tous les artisans
router.get("/", artisanController.getAll);

// ✅ Artisans Top
router.get("/top", artisanController.getTopArtisans);

// ✅ Artisans par catégorie (AVANT :id)
router.get("/categorie/:categorie", async (req, res) => {
  try {
    const artisans = await Artisan.find({
      Catégorie: req.params.categorie,
    });
    res.json(artisans);
  } catch (err) {
    console.error("Erreur catégorie :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Barre de recherche (AVANT :id)
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) return res.json([]);

  try {
    const artisans = await Artisan.find({
      Nom: { $regex: query, $options: "i" } // recherche insensible à la casse
    });
    res.json(artisans);
  } catch (err) {
    console.error("Erreur recherche :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Un artisan par ID (TOUJOURS EN DERNIER)
router.get("/:id", artisanController.getOne);

module.exports = router;
 */

/* const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");

router.get("/", artisanController.getAll);
router.get("/top", artisanController.getTopArtisans);
router.get("/search", artisanController.search);
router.get("/categorie/:categorie", artisanController.getByCategorie);
router.get("/:id", artisanController.getOne);

module.exports = router; */


const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");
const Artisan = require("../models/Artisan");
const { Op } = require("sequelize");

// ✅ Tous les artisans
router.get("/", artisanController.getAll);

// ✅ Top artisans
router.get("/top", artisanController.getTopArtisans);

// ✅ Artisans par catégorie
router.get("/categorie/:categorie", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: {
        categorie: req.params.categorie,
      },
    });
    res.json(artisans);
  } catch (err) {
    console.error("Erreur catégorie :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Recherche par nom
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);

  try {
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    res.json(artisans);
  } catch (err) {
    console.error("Erreur recherche :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Un artisan par ID (TOUJOURS À LA FIN)
router.get("/:id", artisanController.getOne);

module.exports = router;
