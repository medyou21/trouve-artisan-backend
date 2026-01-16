const { Op } = require("sequelize");
const Artisan = require("../models/Artisan");
const Category = require("../models/category");
const Ville = require("../models/ville");
const Departement = require("../models/departement");
const Specialite = require("../models/Specialite");

// ✅ Tous les artisans (avec relations)
exports.getAll = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        { model: Category, as: "categorie", attributes: ["id", "nom", "slug"] },
        { model: Ville, as: "ville_obj", attributes: ["id", "nom"] },
        { model: Departement, as: "departement_obj", attributes: ["id", "code", "nom"] },
        { model: Specialite, as: "specialite_obj", attributes: ["id", "nom"] },
      ],
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getAll artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Recherche par nom
exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") return res.status(200).json([]);

    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: `%${query}%` } },
      include: [
        { model: Category, as: "categorie", attributes: ["id", "nom", "slug"] },
        { model: Ville, as: "ville_obj", attributes: ["id", "nom"] },
        { model: Departement, as: "departement_obj", attributes: ["id", "code", "nom"] },
        { model: Specialite, as: "specialite_obj", attributes: ["id", "nom"] },
      ],
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur search artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Filtrer par catégorie, département, ville ou spécialité
exports.filter = async (req, res) => {
  try {
    const { categorie_id, departement_id, ville_id, specialite_id } = req.query;

    const where = {};
    if (categorie_id) where.categorie_id = categorie_id;
    if (departement_id) where.departement_id = departement_id;
    if (ville_id) where.ville_id = ville_id;
    if (specialite_id) where.specialite_id = specialite_id;

    const artisans = await Artisan.findAll({
      where,
      include: [
        { model: Category, as: "categorie", attributes: ["id", "nom", "slug"] },
        { model: Ville, as: "ville_obj", attributes: ["id", "nom"] },
        { model: Departement, as: "departement_obj", attributes: ["id", "code", "nom"] },
        { model: Specialite, as: "specialite_obj", attributes: ["id", "nom"] },
      ],
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur filtre artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Artisan par ID
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const artisan = await Artisan.findByPk(id, {
      include: [
        { model: Category, as: "categorie", attributes: ["id", "nom", "slug"] },
        { model: Ville, as: "ville_obj", attributes: ["id", "nom"] },
        { model: Departement, as: "departement_obj", attributes: ["id", "code", "nom"] },
        { model: Specialite, as: "specialite_obj", attributes: ["id", "nom"] },
      ],
    });
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });
    res.status(200).json(artisan);
  } catch (error) {
    console.error("Erreur getOne artisan :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
