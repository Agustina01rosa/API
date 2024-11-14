const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/ingresos.json';

const readData = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
  const ingresos = readData();
  res.json(ingresos);
});
router.post('/agregar', (req, res) => {
  const { id, fecha, descripcion, categoria, metodoPago, usuario } = req.body;
  if (!id || !fecha || !descripcion || !categoria || !metodoPago || !usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const ingresos = readData();
  const newIngreso = { id, fecha, descripcion, categoria, metodoPago, usuario };
  ingresos.push(newIngreso);
  writeData(ingresos);
  res.status(201).send('Ingreso registrado con éxito');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const ingresos = readData();
  const index = ingresos.findIndex(ingreso => ingreso.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Ingreso no encontrado');
  }
  ingresos[index] = { ...ingresos[index], ...req.body };
  writeData(ingresos);
  res.send('Ingreso actualizado con éxito');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const ingresos = readData();
  const filteredIngresos = ingresos.filter(ingreso => ingreso.id !== parseInt(id));
  if (ingresos.length === filteredIngresos.length) {
    return res.status(404).send('Ingreso no encontrado');
  }
  writeData(filteredIngresos);
  res.send('Ingreso eliminado con éxito');
});

module.exports = router;