"use strict";
const mongoose = require("mongoose");

const { DB_URL } = require("./configEnv.js");
const { handleError } = require("../utils/errorHandler");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Establece la conexión con la base de datos.
 * @async
 * @function setupDB
 * @throws {Error} Si no se puede conectar a la base de datos.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se establece la conexión con la base de datos.
 */
async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}

module.exports = { setupDB };
