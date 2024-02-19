"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticacion */
const mailController = require("../controllers/mail.controller.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para las citas
router.get("/", mailController.getMail);
router.get("/:caseId", mailController.getMailByCaseId);
router.post("/", mailController.postMail);
router.put("/login/:id", mailController.putLogin);
router.delete("/:id", mailController.deleteMail);
router.get('/pixel', (req, res) => {
  res.sendFile(__dirname + '/pixel.png');
});

// Exporta el enrutador
module.exports = router;