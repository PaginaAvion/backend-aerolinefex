const AuthService = require('../services/authService');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = AuthService.verificarToken(token);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function soloAdmin(req, res, next) {
  if (!req.usuario || req.usuario.rol !== 'administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol administrador' });
  }
  next();
}

module.exports = { verificarToken, soloAdmin };