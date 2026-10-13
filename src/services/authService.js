const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');

async function login(email, password) {
  // 1. Buscar usuario por email
  const usuario = await UsuarioModel.buscarPorEmail(email);
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  // 2. Comparar contraseña con el hash
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    throw new Error('Credenciales inválidas');
  }

  // 3. Generar token JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );

  // 4. Devolver token + datos del usuario (SIN password)
  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
}

function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { login, verificarToken };