require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const vuelosRouter = require('./routes/vuelos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/vuelos', vuelosRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Vuelos funcionando ✈️' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;