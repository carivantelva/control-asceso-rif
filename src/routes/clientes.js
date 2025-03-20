const express = require('express');
const Cliente = require('../models/Cliente');
const router = express.Router();

// Obtener todas las tarjetas
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.send(clientes);
  } catch (error) {
    res.status(500).send("Error al obtener las tarjetas");
  }
});

// Registrar nuevo cliente
router.post('/', async (req, res) => {
  const { nombre, tarjetaId, saldo } = req.body;
  const cliente = new Cliente({ nombre, tarjetaId, saldo });
  await cliente.save();
  res.send(cliente);
});

// Recargar saldo
router.post('/recargar', async (req, res) => {
  const { tarjetaId, monto } = req.body;
  const cliente = await Cliente.findOne({ tarjetaId });
  if (!cliente) return res.status(404).send('Tarjeta no encontrada');
  cliente.saldo += monto;
  await cliente.save();
  res.send(cliente);
});

// Verificar saldo y estado de tarjeta
router.get('/estado/:tarjetaId', async (req, res) => {
  const cliente = await Cliente.findOne({ tarjetaId: req.params.tarjetaId });
  if (!cliente) return res.status(404).send('Tarjeta no encontrada');
  res.send({ saldo: cliente.saldo, activo: cliente.saldo > 0 });
});

// Borrar tarjeta
router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.send("Tarjeta borrada correctamente");
  } catch (error) {
    res.status(500).send("Error al borrar la tarjeta");
  }
});

// Recargar saldo
router.post('/recargar', async (req, res) => {
  const { tarjetaId, monto } = req.body;

  // Convertir el monto a número
  const montoRecarga = parseFloat(monto);

  if (isNaN(montoRecarga) || montoRecarga <= 0) {
    return res.status(400).send('Monto inválido');
  }

  const cliente = await Cliente.findOne({ tarjetaId });
  if (!cliente) return res.status(404).send('Tarjeta no encontrada');

  // Convertir el saldo actual a número y sumar el monto
  cliente.saldo = parseFloat(cliente.saldo) + montoRecarga;
  await cliente.save();

  res.send(cliente);
});

// Modificar saldo de una tarjeta
router.put('/modificar-saldo', async (req, res) => {
  const { tarjetaId, nuevoSaldo } = req.body;

  // Convertir el nuevo saldo a número
  const saldoNumerico = parseFloat(nuevoSaldo);

  if (isNaN(saldoNumerico)) { // Aquí estaba el error
    return res.status(400).send('El saldo debe ser un número válido');
  }

  const cliente = await Cliente.findOne({ tarjetaId });
  if (!cliente) return res.status(404).send('Tarjeta no encontrada');

  // Actualizar el saldo
  cliente.saldo = saldoNumerico;
  await cliente.save();

  res.send(cliente);
});



module.exports = router;