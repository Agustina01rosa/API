const express = require('express');
const router = express.Router();

// Rutas para consultar y actualizar saldo
router.get('/', (req, res) => {
  res.send('Consulta de saldo');
});

router.put('/', (req, res) => {
  res.send('Saldo actualizado');
});

module.exports = router;
