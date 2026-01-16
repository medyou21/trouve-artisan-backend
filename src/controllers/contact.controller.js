// controllers/contact.controller.js
const nodemailer = require("nodemailer");

/**
 * Envoi d'un message via le formulaire de contact
 */
exports.sendMail = async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;

    // Validation basique des champs
    if (!nom || !email || !objet || !message) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    // Création du transporteur
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Contenu du mail
    const mailOptions = {
      from: `"${nom}" <${email}>`,
      to: process.env.MAIL_RECEIVER,
      subject: objet,
      text: `Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Envoi du mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur envoi mail :", error);

    // Gestion plus détaillée des erreurs Nodemailer
    const errMsg =
      error.response && error.response.includes("Invalid login")
        ? "Erreur d'authentification du mail"
        : "Erreur lors de l'envoi du message";

    res.status(500).json({ message: errMsg });
  }
};
