const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './data/usuarios.json';

// Función para leer datos de JSON
const readData = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

// Función para escribir datos en JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
// Rutas para gestión de usuarios
router.get('/', (req, res) => {
  const usuarios = readData();
  res.json(usuarios);
});

router.post('/agregar', (req, res) => {
  const { nombre, apellido, dni, correo, contraseña, telefono, direccion } = req.body;
  if ( !nombre || !apellido || !dni || !correo || !contraseña || !telefono || !direccion) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const usuarios = readData();
  const newUser = { id: Date.now(), nombre, apellido, dni, correo, contraseña, telefono, direccion };
  usuarios.push(newUser);
  writeData(usuarios);
  res.status(201).send('Usuario creado con éxito');
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const usuarios = readData();
  const index = usuarios.findIndex(user => user.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send('Usuario no encontrado');
  }
  usuarios[index] = { ...usuarios[index], ...req.body };
  writeData(usuarios);
  res.send('Usuario actualizado con éxito');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const usuarios = readData();
  const filteredUsuarios = usuarios.filter(user => user.id !== parseInt(id));
  if (usuarios.length === filteredUsuarios.length) {
    return res.status(404).send('Usuario no encontrado');
  }
  writeData(filteredUsuarios);
  res.send('Usuario eliminado con éxito');
});

module.exports = router;