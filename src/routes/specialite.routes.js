const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialite.controller");

// ✅ Toutes les spécialités
router.get("/", specialiteController.getAll);

// ✅ Spécialité par ID
router.get("/:id", specialiteController.getOne);

module.exports = router;
