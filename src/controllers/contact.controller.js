// controllers/contact.controller.js
const nodemailer = require("nodemailer");
const Artisan = require("../models/Artisan");

/**
 * Envoi d'un message via le formulaire de contact
 * Le destinataire peut être dynamique selon l'artisan
 */
exports.sendMail = async (req, res) => {
  try {
    const { nom, email, objet, message, artisan_id } = req.body;

    // Validation basique
    if (!nom || !email || !objet || !message) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    // Récupération du destinataire depuis la DB si artisan_id fourni
    let receiverEmail = process.env.MAIL_RECEIVER; // fallback
    if (artisan_id) {
      const artisan = await Artisan.findByPk(artisan_id);
      if (artisan && artisan.email) {
        receiverEmail = artisan.email;
      }
    }

    if (!receiverEmail) {
      return res.status(400).json({ message: "Aucun destinataire trouvé" });
    }

    // Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465, // SSL si port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Mot de passe d'application
      },
    });

    const mailOptions = {
      from: `"${nom}" <${email}>`,
      to: receiverEmail, // dynamique
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
    console.error("Stack :", error.stack);

    let errMsg = "Erreur lors de l'envoi du message";

    if (error.response && error.response.includes("Invalid login")) {
      errMsg = "Erreur d'authentification : vérifie ton mot de passe d'application Gmail";
    } else if (error.code === "EAUTH") {
      errMsg = "Erreur d'authentification SMTP : utilisateur ou mot de passe incorrect";
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      errMsg = "Impossible de se connecter au serveur SMTP : vérifie host/port";
    }

    res.status(500).json({ message: errMsg });
  }
};
