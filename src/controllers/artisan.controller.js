const { Op } = require("sequelize");
const Artisan = require("../models/Artisan");

/**
 * Récupérer tous les artisans
 */
exports.getAll = async (req, res) => {
  try {
    const artisans = await Artisan.findAll();
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getAll artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupérer les artisans mis en avant
 */
exports.getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getTopArtisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupérer les artisans par catégorie
 */
exports.getByCategorie = async (req, res) => {
  try {
    const { categorie } = req.params;

    if (!categorie) {
      return res.status(400).json({ message: "Catégorie manquante" });
    }

    const artisans = await Artisan.findAll({
      where: { categorie },
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur getByCategorie :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Recherche d'artisans par nom
 */
exports.search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.status(200).json(artisans);
  } catch (error) {
    console.error("Erreur search artisans :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupérer un artisan par ID
 */
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const artisan = await Artisan.findByPk(id);

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    // Normalisation des champs (API stable)
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

    res.status(200).json(normalized);
  } catch (error) {
    console.error("Erreur getOne artisan :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
