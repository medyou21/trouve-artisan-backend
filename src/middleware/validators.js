const { body, validationResult } = require("express-validator");

const optionalUrl = { options: { protocols: ["http", "https"], require_protocol: true } };

exports.artisanRules = [
  body("nom").trim().isLength({ min: 2, max: 150 }).escape(),
  body("note").optional().isFloat({ min: 0, max: 5 }).toFloat(),
  body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body("site_web").optional({ checkFalsy: true }).isURL(optionalUrl),
  body("a_propos").optional({ checkFalsy: true }).trim().isLength({ max: 3000 }).escape(),
  body("image").optional({ checkFalsy: true }).trim().isLength({ max: 255 }),
  body("top").optional().isBoolean().toBoolean(),
  body("specialite_id").isInt({ min: 1 }).toInt(),
  body("ville_id").isInt({ min: 1 }).toInt(),
];

exports.contactRules = [
  body("nom").trim().isLength({ min: 2, max: 100 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("objet").trim().isLength({ min: 2, max: 150 }).escape(),
  body("message").trim().isLength({ min: 10, max: 3000 }).escape(),
  body("artisan_id").optional().isInt({ min: 1 }).toInt(),
];

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Données invalides", errors: errors.array() });
  }
  return next();
};
