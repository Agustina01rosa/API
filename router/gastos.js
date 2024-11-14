const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const filePath = './data/gastos.json';


// Helper function to read data from the JSON file
const readData = () => {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } else {
    return [];
  }
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all gastos
router.get('/', (req, res) => {
  const gastos = readData();
  res.json(gastos);
});
// POST a new gasto
router.post('/agregue', (req, res) => {
  const gastos = readData();
  const newGasto = {
    id: gastos.length + 1,
    fecha: req.body.fecha,
    monto: req.body.monto,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    metodoPago: req.body.metodoPago,
    usuario: req.body.usuario
  };

  gastos.push(newGasto);
  writeData(gastos);

  res.status(201).json(newGasto);
});

// PUT to update a gasto by ID
router.put('/:id', (req, res) => {
  const gastos = readData();
  const id = parseInt(req.params.id);
  const index = gastos.findIndex(g => g.id === id);
  if (index !== -1) {
    gastos[index] = { ...gastos[index], ...req.body };
    writeData(gastos);
    res.json(gastos[index]);
  } else {
    res.status(404).json({ message: 'Gasto no encontrado' });
  }
});

// DELETE a gasto by ID
router.delete('/:id', (req, res) => {
  const gastos = readData();
  const id = parseInt(req.params.id);
  const updatedGastos = gastos.filter(g => g.id !== id);

  if (gastos.length !== updatedGastos.length) {
    writeData(updatedGastos);
    res.json({ message: 'Gasto eliminado' });
  } else {
    res.status(404).json({ message: 'Gasto not found' });
  }
});

module.exports = router;