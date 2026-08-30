const express = require("express");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const { validateRequest } = require("../middleware/validators");

const router = express.Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post(
  "/login",
  loginLimiter,
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8, max: 128 }),
  validateRequest,
  authController.login
);

module.exports = router;
