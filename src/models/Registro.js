// models/Registro.js - Esquema de Registro de Accesos
const mongoose = require('mongoose'); // Importar mongoose

const RegistroSchema = new mongoose.Schema({
  tarjetaId: String,
  fecha: { type: Date, default: Date.now },
  tipo: String // 'entrada' o 'salida'
});

module.exports = mongoose.model('Registro', RegistroSchema);