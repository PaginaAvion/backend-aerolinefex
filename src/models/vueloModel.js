const { sql } = require('../config/database');

async function listar() {
  return await sql`SELECT * FROM vuelos ORDER BY id`;
}

async function obtenerPorId(id) {
  const r = await sql`SELECT * FROM vuelos WHERE id = ${id}`;
  return r[0];
}

async function crear({ origen, destino, fecha, precio }) {
  const r = await sql`
    INSERT INTO vuelos (origen, destino, fecha, precio)
    VALUES (${origen}, ${destino}, ${fecha}, ${precio})
    RETURNING *
  `;
  return r[0];
}

async function actualizar(id, { origen, destino, fecha, precio }) {
  const r = await sql`
    UPDATE vuelos
    SET origen = ${origen},
        destino = ${destino},
        fecha = ${fecha},
        precio = ${precio}
    WHERE id = ${id}
    RETURNING *
  `;
  return r[0];
}

async function eliminar(id) {
  await sql`DELETE FROM vuelos WHERE id = ${id}`;
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};