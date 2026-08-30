const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const { contactRules, validateRequest } = require("../middleware/validators");

/**
 * POST /api/contact
 * Envoi d'un message via le formulaire de contact
 */
router.post("/", contactRules, validateRequest, contactController.sendMail);

module.exports = router;
