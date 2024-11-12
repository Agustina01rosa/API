const express = require('express');
const router = express.Router();

// Rutas para consultar balance general
router.get('/', (req, res) => {
  res.send('Consulta de balance general');
});

module.exports = router;
