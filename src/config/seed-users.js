require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sql } = require('./database');

async function crearUsuarios() {
  try {
    console.log(' Hasheando contraseñas...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const clientePassword = await bcrypt.hash('cliente123', 10);

    console.log(' Creando usuarios...');

    await sql`
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES ('Staff AerolineFex', 'admin@aerolinefex.cl', ${adminPassword}, 'administrador')
      ON CONFLICT (email) DO UPDATE
      SET password = ${adminPassword}, rol = 'administrador'
    `;

    await sql`
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES ('Juan Pérez', 'cliente@gmail.com', ${clientePassword}, 'cliente')
      ON CONFLICT (email) DO UPDATE
      SET password = ${clientePassword}
    `;

    console.log(' Usuarios creados/actualizados correctamente');
    console.log('');
    console.log(' Credenciales de prueba:');
    console.log('   Admin:   admin@aerolinefex.cl / admin123');
    console.log('   Cliente: cliente@gmail.com / cliente123');
    process.exit(0);
  } catch (err) {
    console.error(' Error:', err.message);
    process.exit(1);
  }
}

crearUsuarios();