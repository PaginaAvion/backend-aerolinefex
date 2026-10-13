const AuthService = require('../services/authService');

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const resultado = await AuthService.login(email, password);
    res.json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function getPerfil(req, res) {
  // req.usuario viene del middleware verificarToken
  res.json({ usuario: req.usuario });
}

module.exports = { postLogin, getPerfil };