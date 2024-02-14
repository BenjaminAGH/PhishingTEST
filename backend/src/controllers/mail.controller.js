"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const MailService = require("../services/mail.service");
const { mailBodySchema } = require("../schema/mail.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las citas
 * @param {Object} req - Objeto de petici  n
 * @param {Object} res - Objeto de respuesta
 */
async function getMail(req, res) {
  try {
    const [mail, errorMail] = await MailService.getMail();
    if (errorMail) return respondError(req, res, 404, errorMail);

    mail.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, mail);
  } catch (error) {
    handleError(error, "mail.controller -> getMail");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Obtiene una cita por id
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getMailByCaseId(req, res) {
  try {
    const { caseId } = req.params;
    const [mail, errorMail] = await MailService.getMailByCaseId(caseId);
    if (errorMail) return respondError(req, res, 404, errorMail);

    respondSuccess(req, res, 200, mail);
  } catch (error) {
    handleError(error, "mail.controller -> getMailByCaseId");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva cita
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function postMail(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = mailBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newMail, mailError] = await MailService.postMail(body, req);

    if (mailError) return respondError(req, res, 400, mailError);
    if (!newMail) {
      return respondError(req, res, 400, "No se creo el mail");
    }

    respondSuccess(req, res, 201, newMail);
    } catch (error) {
      handleError(error, "mail.controller -> postMail");
      respondError(req, res, 500, "No se creo el mail");
  }
}

/**
 * Edita las variables de inicio de sesión
 * @param {String} id ID of the mail
 * @param {String} userEntered User entered value
 * @param {String} passEntered Password entered value
 * @returns {Promise} Promesa con el objeto de mail actualizado
 */
async function putLogin(req, res){
  try {
    const { id } = req.params;
    const { userEntered, passEntered } = req.body;
    const [mail, errorMail] = await MailService.putLogin(id, userEntered, passEntered);
    if (errorMail) return respondError(req, res, 404, errorMail);

    respondSuccess(req, res, 200, mail);

  } catch (error) {
    handleError(error, "mail.controller -> putLogin");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Elimina una cita
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function deleteMail(req, res) {
  try {
    const { id } = req.params;
    const [mail, errorMail] = await MailService.deleteMail(id);
    if (errorMail) return respondError(req, res, 404, errorMail);

    respondSuccess(req, res, 200, mail);
  } catch (error) {
    handleError(error, "mail.controller -> deleteMail");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  getMail,
  getMailByCaseId,
  postMail,
  putLogin,
  deleteMail,
};
