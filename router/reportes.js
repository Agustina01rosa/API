const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/reportes.json';

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
  const reportes = readData();
  res.json(reportes);
});
router.post('/agregue', (req, res) => {
  const { id, titulo, descripcion, tipoReporte, fechaCreacion, fecha, estado, archivo, totalReportes } = req.body;
  if (!id || !titulo || !descripcion || !tipoReporte || !fechaCreacion || !fecha || !estado || !archivo || !totalReportes) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const reportes = readData();
  const newReporte = { id, titulo, descripcion, tipoReporte, fechaCreacion, fecha, estado, archivo, totalReportes };
  reportes.push(newReporte);
  writeData(reportes);
  res.status(201).send('Reporte creado con éxito');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const reportes = readData();
  const index = reportes.findIndex(reporte => reporte.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Reporte no encontrado');
  }
  reportes[index] = { ...reportes[index], ...req.body };
  writeData(reportes);
  res.send('Reporte actualizado con éxito');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const reportes = readData();
  const filteredReportes = reportes.filter(reporte => reporte.id !== parseInt(id));
  if (reportes.length === filteredReportes.length) {
    return res.status(404).send('Reporte no encontrado');
  }
  writeData(filteredReportes);
  res.send('Reporte eliminado con éxito');
});

module.exports = router;