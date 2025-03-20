// models/Cliente.js - Esquema del Cliente
const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  tarjetaId: { type: String, unique: true },
  saldo: { type: Number, default: 0 },
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);