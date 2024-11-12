const express = require('express');
const router = express.Router();

// Rutas para gestionar gastos
router.get('/', (req, res) => {
  res.send('Listado de gastos');
});

router.post('/', (req, res) => {
  res.send('Gasto registrado');
});

module.exports = router;
