const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// POST formulaire contact
router.post("/", contactController.sendMail);

module.exports = router;
