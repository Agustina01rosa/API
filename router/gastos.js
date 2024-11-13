const express = require('express');
const router = express.Router();

// Rutas para gestionar gastos
router.get('/', (req, res) => {
  res.send('Listado de gastos');
});

router.post('/', (req, res) => {
  const { id, fecha, monto, descripcion, categoria, metodoPago, usuario } = req.body;

  // Validación básica de los campos
  if (!id || !fecha || !monto || !descripcion || !categoria || !metodoPago || !usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Verificación de categorías y métodos de pago válidos
  const categoriasValidas = ['comidas/bebidas', 'electronica', 'cuentas/servicios', 'indumentaria', 'transporte', 'suscripción', 'otro'];
  const metodosPagoValidos = ['fisico', 'online'];

  if (!categoriasValidas.includes(categoria)) {
    return res.status(400).send('Categoría no válida');
  }
  if (!metodosPagoValidos.includes(metodoPago)) {
    return res.status(400).send('Método de pago no válido');
  }

  // Aquí se procesaría la lógica para almacenar los datos en la base de datos
  res.status(201).send('Gasto registrado con éxito');
});

module.exports = router;