import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { notificationEmailTemplate } from "../templates/notificationEmail";
import { confirmationEmailTemplate } from "../templates/confirmationEmail";

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // Mail de notification que tu reçois
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `📬 Nouveau message de ${name}`,
      html: notificationEmailTemplate(name, email, message),
    });

    // Mail de confirmation envoyé à l'expéditeur
    await transporter.sendMail({
      from: `"Perrin Emmanuel" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "✅ Message bien reçu !",
      html: confirmationEmailTemplate(name),
    });

    return res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
};