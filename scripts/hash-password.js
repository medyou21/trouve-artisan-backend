const bcrypt = require("bcrypt");

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error("Le mot de passe doit contenir au moins 8 caractères.");
  process.exit(1);
}

bcrypt.hash(password, 12).then(console.log);
