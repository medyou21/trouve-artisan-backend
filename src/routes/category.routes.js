const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// ✅ Récupérer toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["nom", "ASC"]],
      attributes: ["id", "nom", "slug"], // ne renvoyer que les champs utiles
    });

    if (!categories.length) {
      return res.status(200).json({ message: "Aucune catégorie disponible", data: [] });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur API categories :", error);
    res.status(500).json({ message: "Erreur serveur categories" });
  }
});

module.exports = router;
