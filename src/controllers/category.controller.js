const Category = require("../models/category");

exports.getAll = async (_req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "nom", "slug"],
      order: [["nom", "ASC"]],
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur getAll catégories :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
