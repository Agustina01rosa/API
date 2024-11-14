const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/categoriaIngresos.json';

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
  const categorias = readData();
  res.json(categorias);
});

router.post('/agregar', (req, res) => {
  const { id, nombreCategoria, descripcion, fecha } = req.body;
  if (!id || !nombreCategoria || !descripcion || !fecha) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const categorias = readData();
  const newCategoria = { id, nombreCategoria, descripcion, fecha };
  categorias.push(newCategoria);
  writeData(categorias);
  res.status(201).send('Categoría de ingreso registrada con éxito');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const categorias = readData();
  const index = categorias.findIndex(categoria => categoria.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Categoría no encontrada');
  }
  categorias[index] = { ...categorias[index], ...req.body };
  writeData(categorias);
  res.send('Categoría de ingreso actualizada con éxito');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const categorias = readData();
  const filteredCategorias = categorias.filter(categoria => categoria.id !== parseInt(id));
  if (categorias.length === filteredCategorias.length) {
    return res.status(404).send('Categoría no encontrada');
  }
  writeData(filteredCategorias);
  res.send('Categoría de ingreso eliminada con éxito');
});
module.exports = router;