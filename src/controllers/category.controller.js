const Category = require("../models/category");

/**
 * Récupérer toutes les catégories d’artisans
 */
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur getAll categories :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
