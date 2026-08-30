const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// ✅ Récupérer toutes les catégories
router.get("/", categoryController.getAll);

module.exports = router;
