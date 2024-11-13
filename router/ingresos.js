const express = require('express');
const router = express.Router();

// Rutas para gestionar ingresos
router.get('/', (req, res) => {
  res.send('Listado de ingresos');
});

router.post('/', (req, res) => {
  const { id, fecha, descripcion, categoria, metodoPago, usuario } = req.body;

  // Validación básica de los campos
  if (!id || !fecha || !descripcion || !categoria || !metodoPago || !usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Aquí se procesaría la lógica para almacenar los datos en la base de datos
  res.status(201).send('Ingreso registrado con éxito');
});

module.exports = router;