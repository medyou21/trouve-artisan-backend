const express = require("express");
const router = express.Router();
const villeController = require("../controllers/ville.controller");

// ✅ Toutes les villes
router.get("/", villeController.getAll);

// ✅ Une ville par ID
router.get("/:id", villeController.getOne);

// ✅ Toutes les villes d'un département
router.get("/departement/:departement_id", villeController.getByDepartement);

module.exports = router;
