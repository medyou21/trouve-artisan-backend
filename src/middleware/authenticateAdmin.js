const jwt = require("jsonwebtoken");

module.exports = function authenticateAdmin(req, res, next) {
  const authorization = req.get("Authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentification requise" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Accès administrateur requis" });
    }
    req.user = payload;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Jeton invalide ou expiré" });
  }
};
