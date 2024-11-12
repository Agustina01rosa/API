const express = require('express');
const router = express.Router();

let usuarios = [];

// agregar usuario
router.post('/', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        fecha_registro: req.body.fecha_registro,
        numero_telefono: req.body.numero_telefono,
        direccion: req.body.direccion
    };
    usuarios.push(usuario);
    res.status(201).send({ mensaje: 'Usuario CREADO:)' });
});

//obtener todos los usuarios
router.get('/', (req, res) => {
    res.status(200).send({ usuarios });
});

module.exports = router;
