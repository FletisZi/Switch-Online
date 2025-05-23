//const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: '10.100.54.144',
//   database: 'switchs',
//   password: 'senha123',
//   port: 5432,
//   max: 50,                  // número máximo de conexões no pool
//   idleTimeoutMillis: 30000, // tempo para encerrar conexões inativas
// });

// module.exports = pool

const { Pool } = require('pg');

const pool = new Pool({
  user: 'local_user',
  host: '192.168.0.8',
  database: 'switch',
  password: 'local_password',
  port: 5432,
  max: 50,                  // número máximo de conexões no pool
  idleTimeoutMillis: 30000, // tempo para encerrar conexões inativas
});

module.exports = pool