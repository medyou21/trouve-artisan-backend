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
    model: Ville,
    as: "ville",
    attributes: ["id", "nom"],
    include: [
      {
        model: Departement,
        as: "departement",
        attributes: ["id", "code", "nom"],
      },
    ],
  },
  {
    model: Specialite,
    as: "specialite_obj",
    attributes: ["id", "nom", "categorie_id"],
    include: [{ model: Category, as: "categorie", attributes: ["id", "nom", "slug"] }],
  },
];

/* =====================
   TOUS LES ARTISANS
===================== */
exports.getAll = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({ include: includeRelations });
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
   FILTRE PAR CATÉGORIE / VILLE / SPÉCIALITÉ / DÉPARTEMENT
===================== */
exports.filter = async (req, res) => {
  try {
    const { categorie_id, departement_id, ville_id, specialite_id } = req.query;

    const where = {};
    if (ville_id) where.ville_id = ville_id;
    if (specialite_id) where.specialite_id = specialite_id;

    const villeInclude = {
      model: Ville,
      as: "ville",
      attributes: ["id", "nom"],
      include: [
        {
          model: Departement,
          as: "departement",
          attributes: ["id", "code", "nom"],
        },
      ],
    };

    if (departement_id) {
      villeInclude.include[0].where = { id: departement_id };
    }

    const artisans = await Artisan.findAll({
      where,
      include: [
        villeInclude,
        {
          model: Specialite,
          as: "specialite_obj",
          attributes: ["id", "nom", "categorie_id"],
          where: categorie_id ? { categorie_id } : undefined,
          include: [{ model: Category, as: "categorie", attributes: ["id", "nom", "slug"] }],
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
   ARTISAN PAR ID
===================== */
exports.getOne = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, { include: includeRelations });
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });
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

exports.getByCategorie = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          as: "specialite_obj",
          required: true,
          where: { categorie_id: req.params.id },
          include: [{ model: Category, as: "categorie", attributes: ["id", "nom", "slug"] }],
        },
        {
          model: Ville,
          as: "ville",
          attributes: ["id", "nom"],
          include: [{ model: Departement, as: "departement", attributes: ["id", "code", "nom"] }],
        },
      ],
    });
    return res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur filtre catégorie :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
exports.getByVille = filterBy("ville_id");
exports.getBySpecialite = filterBy("specialite_id");

// 🔹 filtre par departement
exports.getByDepartement = async (req, res) => {
  try {
    const { id: departement_id } = req.params;

    if (!departement_id) {
      return res.status(400).json({ message: "ID du département requis" });
    }

    // Filtre sur le département via la relation ville -> departement
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Ville,
          as: "ville",
          attributes: ["id", "nom"],
          required: true, // L’artisan doit avoir une ville
          include: [
            {
              model: Departement,
              as: "departement",
              attributes: ["id", "code", "nom"],
              required: true, // La ville doit avoir ce département
            },
          ],
        },
        {
          model: Specialite,
          as: "specialite_obj",
          attributes: ["id", "nom", "categorie_id"],
          include: [{ model: Category, as: "categorie", attributes: ["id", "nom", "slug"] }],
        },
      ],
      where: {
        "$ville.departement.id$": departement_id, // Filtre directement sur la relation imbriquée
      },
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getByDepartement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* =====================
   ADMINISTRATION CRUD
===================== */
exports.create = async (req, res) => {
  try {
    const artisan = await Artisan.create(pickArtisanFields(req.body));
    const created = await Artisan.findByPk(artisan.id, { include: includeRelations });
    return res.status(201).json(created);
  } catch (error) {
    console.error("Erreur create artisan :", error);
    return res.status(400).json({ message: "Données artisan invalides" });
  }
};

exports.update = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });

    await artisan.update(pickArtisanFields(req.body));
    const updated = await Artisan.findByPk(artisan.id, { include: includeRelations });
    return res.status(200).json(updated);
  } catch (error) {
    console.error("Erreur update artisan :", error);
    return res.status(400).json({ message: "Données artisan invalides" });
  }
};

function pickArtisanFields(body) {
  const allowed = ["nom", "note", "image", "email", "site_web", "a_propos", "top", "specialite_id", "ville_id"];
  return Object.fromEntries(allowed.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
}

exports.remove = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });

    await artisan.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Erreur delete artisan :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
