const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
    return res.status(503).json({ message: "Administration non configurée" });
  }

  const validEmail = email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
  const validPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const token = jwt.sign(
    { sub: process.env.ADMIN_EMAIL, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h", issuer: "trouve-artisan-api" }
  );
  return res.status(200).json({ token, expiresIn: 7200 });
};
