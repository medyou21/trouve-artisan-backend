const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");

// ✅ Tous les artisans
router.get("/", artisanController.getAll);

// ✅ Top artisans
router.get("/top", artisanController.getTopArtisans);

// ✅ Recherche par nom
router.get("/search", artisanController.search);

// ✅ Artisans par catégorie
router.get("/categorie/:id", artisanController.getByCategorie);

// ✅ Artisans par département
//router.get("/departement/:id", artisanController.getByDepartement);

// ✅ Artisans par ville
router.get("/ville/:id", artisanController.getByVille);

// ✅ Artisans par spécialité
router.get("/specialite/:id", artisanController.getBySpecialite);

// ✅ Un artisan par ID (TOUJOURS À LA FIN)
router.get("/:id", artisanController.getOne);

module.exports = router;
