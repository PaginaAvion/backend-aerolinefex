const { Router } = require('express');
const vueloController = require('../controllers/vueloController');

const router = Router();

router.get('/', vueloController.getVuelos);
router.get('/:id', vueloController.getVuelo);
router.post('/', vueloController.postVuelo);
router.put('/:id', vueloController.putVuelo);
router.delete('/:id', vueloController.deleteVuelo);

module.exports = router;