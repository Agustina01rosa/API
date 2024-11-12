const express = require('express');
const bodyParser = require('body-parser');
const usuariosRouter = require('./router/usuario');
const mongoose = require('mongoose');

const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.use(express.json());

// Rus
app.use('/API/usuario', usuariosRouter);
app.use('/api', saldo);

const saldo = require('');

// Conectar la API de saldo
app.use('/api', saldo);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


app.use(bodyParser.json());

// Conexión a BDDDD
mongoose.connect('mongodb://localhost:8081gestionSaldo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.log(err));




  
