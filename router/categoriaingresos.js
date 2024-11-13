const express = require('express');
const router = express.Router();

// Rutas para gestionar categorías de ingresos
router.get('/', (req, res) => {
  res.send('Listado de categorías de ingresos');
});

router.post('/', (req, res) => {
  const { id, nombreCategoria, descripcion, fecha } = req.body;

  // Validación básica de los campos
  if (!id || !nombreCategoria || !descripcion || !fecha) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
   // Aquí se procesaría la lógica para almacenar los datos en la base de datos
   res.status(201).send('Categoría de ingreso registrada con éxito');
});

module.exports = router;