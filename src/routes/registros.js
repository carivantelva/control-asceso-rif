// routes/registros.js - Rutas para registrar entradas y salidas
const express = require('express');
const Registro = require('../models/Registro');
const Cliente = require('../models/Cliente');
const router = express.Router();

// Registrar entrada
router.post('/entrada', async (req, res) => {
  const { tarjetaId } = req.body;
  const cliente = await Cliente.findOne({ tarjetaId });
  if (!cliente || cliente.saldo <= 0) return res.status(403).send('Acceso denegado');

  const registro = new Registro({ tarjetaId, tipo: 'entrada' });
  await registro.save();
  res.send(registro);
});

// Registrar salida
router.post('/salida', async (req, res) => {
  const { tarjetaId } = req.body;
  const registro = new Registro({ tarjetaId, tipo: 'salida' });
  await registro.save();
  res.send(registro);
});

// Obtener historial de accesos
router.get('/', async (req, res) => {
  const registros = await Registro.find();
  res.send(registros);
});

module.exports = router;