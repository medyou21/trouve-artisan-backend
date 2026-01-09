const express = require("express");
const router = express.Router();

// exemple
router.post("/", (req, res) => res.json({ message: "Formulaire contact reçu" }));

module.exports = router;  // ✅ Important !
