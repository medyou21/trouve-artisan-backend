const nodemailer = require("nodemailer");
const Artisan = require("../models/Artisan");

/**
 * Envoi d'un message via le formulaire de contact
 * Le destinataire est dynamique selon l'artisan
 */
exports.sendMail = async (req, res) => {
  try {
    const { nom, email, objet, message, artisan_id } = req.body;

    // Validation basique
    if (!nom || !email || !objet || !message || !artisan_id) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires, y compris l'artisan_id" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    // Récupération du destinataire depuis la DB via artisan_id
    const artisan = await Artisan.findByPk(artisan_id);
    if (!artisan || !artisan.email) {
      return res.status(400).json({ message: "Aucun email trouvé pour cet artisan" });
    }
    const receiverEmail = artisan.email;

    // Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    //  logger: true,
      //debug: true,
    });

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

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur envoi mail :", error);
    let errMsg = "Erreur lors de l'envoi du message";

    if (error.code === "EAUTH") {
      errMsg = "Erreur d'authentification SMTP : utilisateur ou mot de passe incorrect";
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      errMsg = "Impossible de se connecter au serveur SMTP : vérifie host/port";
    }

    res.status(500).json({ message: errMsg });
  }
};
