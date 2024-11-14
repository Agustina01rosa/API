const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/balancesgenerales.json';

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
  const balances = readData();
  res.json(balances);
});

router.post('/agregue', (req, res) => {
  const { id, fecha, totalActivos, totalPasivos, usuario } = req.body;
  if (!id || !fecha || !totalActivos || !totalPasivos || !usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const balances = readData();
  const newBalance = { id, fecha, totalActivos, totalPasivos, usuario };
  balances.push(newBalance);
  writeData(balances);
  res.status(201).send('Balance general registrado con éxito');
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const balances = readData();
  const index = balances.findIndex(balance => balance.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Balance no encontrado');
  }
  balances[index] = { ...balances[index], ...req.body };
  writeData(balances);
  res.send('Balance actualizado con éxito');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const balances = readData();
  const filteredBalances = balances.filter(balance => balance.id !== parseInt(id));
  if (balances.length === filteredBalances.length) {
    return res.status(404).send('Balance no encontrado');
  }
  writeData(filteredBalances);
  res.send('Balance eliminado con éxito');
});

module.exports = router;