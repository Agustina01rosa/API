const express = require('express');
const router = express.Router();

// Rutas para gestión de usuarios
router.get('/', (req, res) => {
  res.send('Listado de usuarios');
});
router.post('/', (req, res) => {
  res.send('Usuario creado');
});

module.exports = router;
