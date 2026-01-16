const { Op } = require("sequelize");
const Artisan = require("../models/Artisan");
const Category = require("../models/category");
const Ville = require("../models/ville");
const Departement = require("../models/departement");
const Specialite = require("../models/specialite");

/* =====================
   RELATIONS COMMUNES
===================== */

const includeRelations = [
  {
    model: Category,
    as: "categorie",
    attributes: ["id", "nom", "slug"],
  },
  {
    model: Ville,
    as: "ville_obj",
    attributes: ["id", "nom"],
    include: [
      {
        model: Departement,
        as: "departement", // ✅ ALIAS CORRECT
        attributes: ["id", "code", "nom"],
      },
    ],
  },
  {
    model: Specialite,
    as: "specialite_obj",
    attributes: ["id", "nom"],
  },
];

/* =====================
   TOUS LES ARTISANS
===================== */

exports.getAll = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: includeRelations,
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getAll artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   TOP ARTISANS
===================== */

exports.getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      order: [["note", "DESC"]],
      limit: 3,
      include: includeRelations,
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getTopArtisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   RECHERCHE PAR NOM
===================== */

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || !query.trim()) return res.json([]);

    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: `%${query}%` } },
      include: includeRelations,
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur search artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   FILTRES AVANCÉS
===================== */

exports.filter = async (req, res) => {
  try {
    const { categorie_id, departement_id, ville_id, specialite_id } = req.query;

    const where = {};
    if (categorie_id) where.categorie_id = categorie_id;
    if (ville_id) where.ville_id = ville_id;
    if (specialite_id) where.specialite_id = specialite_id;

    const villeInclude = {
      model: Ville,
      as: "ville_obj",
      attributes: ["id", "nom"],
      include: [
        {
          model: Departement,
          as: "departement", // ✅
          attributes: ["id", "code", "nom"],
        },
      ],
    };

    // 🔹 Filtre par département via la ville
    if (departement_id) {
      villeInclude.include[0].where = { id: departement_id };
    }

    const artisans = await Artisan.findAll({
      where,
      include: [
        {
          model: Category,
          as: "categorie",
          attributes: ["id", "nom", "slug"],
        },
        villeInclude,
        {
          model: Specialite,
          as: "specialite_obj",
          attributes: ["id", "nom"],
        },
      ],
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur filtre artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   UN ARTISAN
===================== */

exports.getOne = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: includeRelations,
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.status(200).json(artisan);
  } catch (error) {
    console.error("Erreur getOne artisan :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   FILTRES SIMPLES
===================== */

const filterBy = (field) => async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { [field]: req.params.id },
      include: includeRelations,
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error(`Erreur filter ${field} :`, error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getByCategorie = filterBy("categorie_id");
exports.getByVille = filterBy("ville_id");
exports.getBySpecialite = filterBy("specialite_id");


