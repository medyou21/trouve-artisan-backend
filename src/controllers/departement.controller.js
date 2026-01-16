const Departement = require("../models/departement");

// ✅ Tous les départements
exports.getAll = async (req, res) => {
  try {
    const departements = await Departement.findAll({
      attributes: ["id", "code", "nom"],
      order: [["nom", "ASC"]],
    });
    res.status(200).json(departements);
  } catch (error) {
    console.error("Erreur getAll departements :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Département par ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const departement = await Departement.findByPk(id, {
      attributes: ["id", "code", "nom"],
    });
    if (!departement) return res.status(404).json({ message: "Département non trouvé" });
    res.status(200).json(departement);
  } catch (error) {
    console.error("Erreur getOne departement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
