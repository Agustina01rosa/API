const express = require('express');
const app = express();
const usuarioRoutes = require('./router/usuario');
const saldoRoutes = require('./router/saldo');
const ingresosRoutes = require('./router/ingresos');
const gastosRoutes = require('./router/gastos');
const reportesRoutes = require('./router/reportes');
const balancesGeneralesRoutes = require('./router/balancesgenerales');
const categoriaIngresosRoutes = require('./router/categoriaingresos');

// Middleware para parsear JSON
app.use(express.json());

// Configurando las rutas
app.use('/usuario', usuarioRoutes);
app.use('/saldo', saldoRoutes);
app.use('/ingresos', ingresosRoutes);
app.use('/gastos', gastosRoutes);
app.use('/reportes', reportesRoutes);
app.use('/balancesgenerales', balancesGeneralesRoutes);
app.use('/categoriaIngresos', categoriaIngresosRoutes);

// Servidor en puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});