const mongoose = require("mongoose");

const specialiteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
});

module.exports = mongoose.model("Specialite", specialiteSchema);
