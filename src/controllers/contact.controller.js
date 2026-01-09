// controllers/contact.controller.js
const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  const { nom, email, objet, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: process.env.MAIL_RECEIVER,
    subject: objet,
    text: `${nom} (${email}) : ${message}`,
  });

  res.json({ message: "Message envoyé" });
};
