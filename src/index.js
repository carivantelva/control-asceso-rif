const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const clientesRoutes = require('./routes/clientes');
const registrosRoutes = require('./routes/registros');

const app = express();

// Middleware
app.use(cors()); // Para permitir CORS y evitar errores en el frontend
app.use(express.json()); // Para procesar JSON en las peticiones

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/rfid_control', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send("Hola mundo");
});

// Rutas de API
app.use('/api/clientes', clientesRoutes);
app.use('/api/registros', registrosRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
