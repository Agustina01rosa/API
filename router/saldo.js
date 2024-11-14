const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/saldo.json';

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
  const saldo = readData();
  res.json(saldo);
});
router.post('/agregar', (req, res) => {
  const { id, nombreCuenta, monto, fechaActualizacion, descripcion, usuario } = req.body;
  if (!id || !nombreCuenta || !monto || !fechaActualizacion || !descripcion || !usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const saldo = readData();
  const newSaldo = { id, nombreCuenta, monto, fechaActualizacion, descripcion, usuario };
  saldo.push(newSaldo);
  writeData(saldo);
  res.status(201).send('Saldo registrado con éxito');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const saldo = readData();
  const index = saldo.findIndex(entry => entry.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Registro de saldo no encontrado');
  }
  saldo[index] = { ...saldo[index], ...req.body };
  writeData(saldo);
  res.send('Saldo actualizado con éxito');
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const saldo = readData();
  const filteredSaldo = saldo.filter(entry => entry.id !== parseInt(id));
  if (saldo.length === filteredSaldo.length) {
    return res.status(404).send('Registro de saldo no encontrado');
  }
  writeData(filteredSaldo);
  res.send('Registro de saldo eliminado con éxito');
});

module.exports = router;