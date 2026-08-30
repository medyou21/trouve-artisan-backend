const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const { artisanRules, validateRequest } = require("../middleware/validators");

// ✅ Tous les artisans
router.get("/", artisanController.getAll);

// ✅ Top artisans
router.get("/top", artisanController.getTopArtisans);

// ✅ Recherche par nom
router.get("/search", artisanController.search);

// ✅ Artisans par catégorie
router.get("/categorie/:id", artisanController.getByCategorie);

// ✅ Artisans par département
router.get("/departement/:id", artisanController.getByDepartement);

// ✅ Artisans par ville
router.get("/ville/:id", artisanController.getByVille);

// ✅ Artisans par spécialité
router.get("/specialite/:id", artisanController.getBySpecialite);

// Administration sécurisée : création, modification et suppression
router.post("/", authenticateAdmin, artisanRules, validateRequest, artisanController.create);
router.put("/:id", authenticateAdmin, artisanRules, validateRequest, artisanController.update);
router.delete("/:id", authenticateAdmin, artisanController.remove);

// ✅ Un artisan par ID (TOUJOURS À LA FIN)
router.get("/:id", artisanController.getOne);

module.exports = router;
