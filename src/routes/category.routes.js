const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["nom", "ASC"]],
    });
    res.json(categories);
  } catch (error) {
    console.error("Erreur API categories :", error);
    res.status(500).json({ message: "Erreur serveur categories" });
  }
});

module.exports = router;
