//user: "soportealejandromardones@gmail.com",
//pass: "riwm yajz jlbg suvx",
const nodemailer = require("nodemailer");

/**
 * Envia un correo electronico
 * @param {Object} mail - Objeto del mail
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function sendEmail(mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "soportealejandromardones@gmail.com",
        pass: "riwm yajz jlbg suvx",
      },
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electronico enviado: " + info.response);
  } catch (error) {
    console.error("Error al enviar el correo electr  nico: " + error.message);
    throw error;
  }
}

module.exports = { sendEmail };