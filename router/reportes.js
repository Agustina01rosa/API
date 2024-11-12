const express = require('express');
const router = express.Router();

// Rutas para generar reportes
router.get('/', (req, res) => {
  res.send('Generar reporte');
});

module.exports = router;
