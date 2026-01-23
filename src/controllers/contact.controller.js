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

    // 🔹 Validation basique
    if (!nom || !email || !objet || !message) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    // 🔹 Détermination du destinataire
    let receiverEmail = process.env.MAIL_RECEIVER; // fallback statique
    if (artisan_id) {
      const artisan = await Artisan.findByPk(artisan_id);
      if (artisan?.email) {
        receiverEmail = artisan.email;
      } else {
        console.warn(
          artisan
            ? `Artisan ID=${artisan_id} n'a pas d'email. Utilisation du fallback.`
            : `Artisan ID=${artisan_id} introuvable. Utilisation du fallback.`
        );
      }
    }

    if (!receiverEmail) {
      return res.status(400).json({ message: "Aucun destinataire trouvé" });
    }

    console.log(`📧 Envoi du mail à : ${receiverEmail}`);

    // 🔹 Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: parseInt(process.env.SMTP_PORT, 10) === 465, // SSL si port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    // 🔹 Options du mail
    const mailOptions = {
      from: `"${nom}" <${email}>`,
      to: receiverEmail,
      subject: objet,
      text: `Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // 🔹 Envoi du mail
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail envoyé avec succès :", info.messageId);

    return res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur envoi mail :", error);
    console.error("Stack :", error.stack);

    let errMsg = "Erreur lors de l'envoi du message";

    // 🔹 Gestion des erreurs SMTP/Gmail
    if (error.response && error.response.includes("Invalid login")) {
      errMsg = "Erreur d'authentification : vérifie ton mot de passe d'application Gmail";
    } else if (error.code === "EAUTH") {
      errMsg = "Erreur d'authentification SMTP : utilisateur ou mot de passe incorrect";
    } else if (["ECONNECTION", "ETIMEDOUT"].includes(error.code)) {
      errMsg = "Impossible de se connecter au serveur SMTP : vérifie host/port";
    }

    return res.status(500).json({ message: errMsg });
  }
};
