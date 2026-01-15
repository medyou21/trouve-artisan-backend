// controllers/contact.controller.js
const nodemailer = require("nodemailer");

/**
 * Envoi d'un message via le formulaire de contact
 */
exports.sendMail = async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;

    // Validation des champs obligatoires
    if (!nom || !email || !objet || !message) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Envoi du mail
    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: process.env.MAIL_RECEIVER,
      subject: objet,
      text: `Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`,
    });

    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur envoi mail :", error);
    res.status(500).json({
      message: "Erreur lors de l'envoi du message",
    });
  }
};
