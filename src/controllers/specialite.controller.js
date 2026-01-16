const Specialite = require("../models/specialite");

// ✅ Toutes les spécialités
exports.getAll = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      attributes: ["id", "nom"],
      order: [["nom", "ASC"]],
    });
    res.status(200).json(specialites);
  } catch (error) {
    console.error("Erreur getAll specialites :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Spécialité par ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const specialite = await Specialite.findByPk(id, {
      attributes: ["id", "nom"],
    });
    if (!specialite) return res.status(404).json({ message: "Spécialité non trouvée" });
    res.status(200).json(specialite);
  } catch (error) {
    console.error("Erreur getOne specialite :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
