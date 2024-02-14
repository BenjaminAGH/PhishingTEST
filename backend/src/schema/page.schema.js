"use strict";

const Joi = require("joi");

/**
 * Esquema de validacion para el cuerpo de la solicitud de mail.
 * @constant {Object}
 */
const pageBodySchema = Joi.object({
  email: Joi.string()
  .required()
  .min(10)
  .pattern(new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]+$"))
  .messages({
    "string.empty": "El correo no puede estar vacio.",
    "any.required": "El correo es obligatoria.",
    "string.min": "El correo debe tener al menos 10 caracteres.",
  }),
  password: Joi.string()
  .required()
  .messages({
    "string.empty": "La contraseña no puede estar vacio.",
    "any.required": "La contraseña es obligatoria.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});


module.exports = { pageBodySchema };