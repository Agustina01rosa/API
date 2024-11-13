const express = require('express');
const router = express.Router();

// Rutas para gestión de usuarios
router.get('/', (req, res) => {
  res.send('Listado de usuarios');
});

router.post('/', (req, res) => {
  const { nombre, apellido, dni, correo, contraseña, telefono, direccion } = req.body;

  // Validación básica de los campos
  if (!nombre || !apellido || !dni || !correo || !contraseña || !telefono || !direccion) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Aquí se procesaría la lógica para almacenar los datos en la base de datos
  res.status(201).send('Usuario creado con éxito');
});

module.exports = router;