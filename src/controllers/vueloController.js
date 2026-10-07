const VueloModel = require('../models/vueloModel');

// GET /api/vuelos
async function getVuelos(req, res) {
  try {
    const vuelos = await VueloModel.listar();
    res.json(vuelos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// GET /api/vuelos/:id
async function getVuelo(req, res) {
  try {
    const vuelo = await VueloModel.obtenerPorId(req.params.id);
    if (!vuelo) {
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }
    res.json(vuelo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// POST /api/vuelos
async function postVuelo(req, res) {
  try {
    const { origen, destino, fecha, precio } = req.body;

    if (!origen || !destino || !fecha || !precio) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevo = await VueloModel.crear({ origen, destino, fecha, precio });
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// PUT /api/vuelos/:id
async function putVuelo(req, res) {
  try {
    const { origen, destino, fecha, precio } = req.body;

    if (!origen || !destino || !fecha || !precio) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const actualizado = await VueloModel.actualizar(req.params.id, {
      origen, destino, fecha, precio
    });

    if (!actualizado) {
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }

    res.json(actualizado);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// DELETE /api/vuelos/:id
async function deleteVuelo(req, res) {
  try {
    await VueloModel.eliminar(req.params.id);
    res.json({ mensaje: 'Vuelo eliminado correctamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getVuelos,
  getVuelo,
  postVuelo,
  putVuelo,
  deleteVuelo
};