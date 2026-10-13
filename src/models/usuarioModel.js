const { sql } = require('../config/database');

async function buscarPorEmail(email) {
  const r = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
  return r[0];
}

async function buscarPorId(id) {
  const r = await sql`
    SELECT id, nombre, email, rol FROM usuarios WHERE id = ${id}
  `;
  return r[0];
}

async function crear({ nombre, email, password, rol = 'cliente' }) {
  const r = await sql`
    INSERT INTO usuarios (nombre, email, password, rol)
    VALUES (${nombre}, ${email}, ${password}, ${rol})
    RETURNING id, nombre, email, rol
  `;
  return r[0];
}

module.exports = { buscarPorEmail, buscarPorId, crear };