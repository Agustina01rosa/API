const express = require('express');
const router = express.Router();

// Rutas para gestionar ingresos
router.get('/', (req, res) => {
  res.send('Listado de ingresos');
});

router.post('/', (req, res) => {
  res.send('Ingreso registrado');
});

module.exports = router;
