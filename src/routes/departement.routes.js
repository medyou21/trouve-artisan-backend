const express = require("express");
const router = express.Router();
const departementController = require("../controllers/departement.controller");

// ✅ Tous les départements
router.get("/", departementController.getAll);

// ✅ Département par ID
router.get("/:id", departementController.getOne);

module.exports = router;
