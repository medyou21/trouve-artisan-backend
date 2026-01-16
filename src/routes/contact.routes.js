const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

/**
 * POST /api/contact
 * Envoi d'un message via le formulaire de contact
 */
router.post("/", contactController.sendMail);

module.exports = router;
