/* const Artisan = require("../models/Artisan");

// 🔹 Tous les artisans
exports.getAll = async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Un artisan par ID
exports.getOne = async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: "ID invalide" });
  }
};

// 🔥 Artisans du mois (Top)
exports.getTopArtisans = async (req, res) => {
  try {
    // ✅ top est un Boolean
    const artisans = await Artisan.find({ Top: true }).limit(3);
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ⭐ Option alternative : meilleurs notés
exports.getBestRated = async (req, res) => {
  try {
    const artisans = await Artisan.find()
      .sort({ note: -1 }) // note minuscule
      .limit(3);

    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
 */

const { Op } = require("sequelize");
const Artisan = require("../models/Artisan");

// Tous
exports.getAll = async (req, res) => {
  const artisans = await Artisan.findAll();
  res.json(artisans);
};



// Top artisans
exports.getTopArtisans = async (req, res) => {
  const artisans = await Artisan.findAll({ where: { top: true } });
  res.json(artisans);
};

// Par catégorie
exports.getByCategorie = async (req, res) => {
  const artisans = await Artisan.findAll({
    where: { categorie: req.params.categorie },
  });
  res.json(artisans);
};

// Recherche
exports.search = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);

  const artisans = await Artisan.findAll({
    where: {
      nom: { [Op.like]: `%${query}%` },
    },
  });

  res.json(artisans);
};
// Par ID
exports.getOne = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    // ✅ NORMALISATION DES CHAMPS
    const normalized = {
      id: artisan.id,
      nom: artisan.nom,
      specialite: artisan.specialite,
      categorie: artisan.categorie, 
      ville: artisan.ville,
      departement: artisan.departement || "",
      note: Number(artisan.note) || 0,
      image: artisan.image || "/images/placeholder.jpg",
      email: artisan.email || "",
      site_web: artisan.site_web || "",
      a_propos: artisan.a_propos || "",
    };

    res.json(normalized);
  } catch (err) {
    console.error("Erreur getOne artisan :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
