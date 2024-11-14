const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const usuarioRoutes = require('./router/usuario');
const saldoRoutes = require('./router/saldo');
const ingresosRoutes = require('./router/ingresos');
const gastosRoutes = require('./router/gastos');
const reportesRoutes = require('./router/reportes');
const balancesGeneralesRoutes = require('./router/balancesgenerales');
const categoriaIngresosRoutes = require('./router/categoriaingresos');

// Middleware para parsear JSON
app.use(express.json());

// RUTAS:
app.use('/API/usuario', usuarioRoutes);
app.use('/API/saldo', saldoRoutes);
app.use('/API/ingresos', ingresosRoutes);
app.use('/API/gastos', gastosRoutes);
app.use('/API/reportes', reportesRoutes);
app.use('/API/balancesgenerales', balancesGeneralesRoutes);
app.use('/API/categoriaIngresos', categoriaIngresosRoutes);

// Servidor en puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
