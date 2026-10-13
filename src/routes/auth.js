const { Router } = require('express');
const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = Router();

// POST /api/auth/login
router.post('/login', authController.postLogin);

// GET /api/auth/perfil (protegida)
router.get('/perfil', verificarToken, authController.getPerfil);

module.exports = router;