const Ville = require("../models/ville");
const Departement = require("../models/departement");

// ✅ Tous les villes (avec le département)
exports.getAll = async (req, res) => {
  try {
    const villes = await Ville.findAll({
      attributes: ["id", "nom", "departement_id"],
      include: [
        {
          model: Departement,
          as: "departement_obj",
          attributes: ["id", "code", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });
    res.status(200).json(villes);
  } catch (error) {
    console.error("Erreur getAll villes :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Ville par ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const ville = await Ville.findByPk(id, {
      attributes: ["id", "nom", "departement_id"],
      include: [
        {
          model: Departement,
          as: "departement_obj",
          attributes: ["id", "code", "nom"],
        },
      ],
    });
    if (!ville) return res.status(404).json({ message: "Ville non trouvée" });
    res.status(200).json(ville);
  } catch (error) {
    console.error("Erreur getOne ville :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Toutes les villes d'un département
exports.getByDepartement = async (req, res) => {
  try {
    const { departement_id } = req.params;
    const villes = await Ville.findAll({
      where: { departement_id },
      attributes: ["id", "nom", "departement_id"],
      order: [["nom", "ASC"]],
    });
    res.status(200).json(villes);
  } catch (error) {
    console.error("Erreur getByDepartement villes :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
