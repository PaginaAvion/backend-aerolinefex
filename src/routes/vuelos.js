const { Router } = require('express');
const vueloController = require('../controllers/vueloController');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

const router = Router();

// Rutas públicas (cualquiera puede ver vuelos)
router.get('/', vueloController.getVuelos);
router.get('/:id', vueloController.getVuelo);

// Rutas protegidas (solo admin logueado)
router.post('/', verificarToken, soloAdmin, vueloController.postVuelo);
router.put('/:id', verificarToken, soloAdmin, vueloController.putVuelo);
router.delete('/:id', verificarToken, soloAdmin, vueloController.deleteVuelo);

module.exports = router;