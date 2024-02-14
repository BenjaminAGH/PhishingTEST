"use strict";

const Joi = require("joi");

/**
 * Esquema de validacion para el cuerpo de la solicitud de mail.
 * @constant {Object}
 */
const mailBodySchema = Joi.object({
   name: Joi.string()
   .required()
   .messages({
    "string.empty": "El nombre no puede estar vacio.",
    "any.required": "El nombre es obligatoria.",
  }),
  from: Joi.string()
  .required()
  .messages({
    "string.empty": "El remitente no puede estar vacio.",
    "any.required": "El remitente es obligatoria.",
  }),
  email: Joi.string()
  .required()
  .min(5)
  .messages({
    "string.empty": "El correo no puede estar vacio.",
    "any.required": "El correo es obligatoria.",
    "string.min": "El correo debe tener al menos 5 caracteres.",
  }),
  subject: Joi.string()
  .required()
  .messages({
    "string.empty": "El asunto no puede estar vacio.",
    "any.required": "El asunto es obligatoria.",
  }),
  text: Joi.string()
  .required()
  .messages({
    "string.empty": "El texto no puede estar vacio.",
    "any.required": "El texto es obligatoria.",
  }),
  html: Joi.string()
  .required()
  .messages({
    "string.empty": "El html no puede estar vacio.",
    "any.required": "El html es obligatoria.",
  }),
  caseId: Joi.string()
  .required()
  .messages({
    "string.empty": "El id no puede estar vacio.",
    "any.required": "El id es obligatoria.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});


module.exports = { mailBodySchema };