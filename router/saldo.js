const express = require('express');
const router = express.Router();

// Simulador de datos de saldo
let saldo = 1000.0;

// Ruta para obtener el saldo actual
router.get('/saldo', (req, res) => {
  res.json({ saldo });
});

// Ruta para actualizar el saldo (por ejemplo, agregar o restar)
router.post('/saldo', (req, res) => {
  const { monto } = req.body;
  if (typeof monto !== 'number') {
    return res.status(400).json({ error: 'El monto debe ser un número' });
  }
  saldo += monto;
  res.json({ saldo });
});

module.exports = router;
