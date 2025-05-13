const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '10.100.54.144',
  database: 'switchs',
  password: 'senha123',
  port: 5432,
  max: 50,                  // número máximo de conexões no pool
  idleTimeoutMillis: 30000, // tempo para encerrar conexões inativas
});

const executarQuery = async (sql, params = []) => {
  const client = await pool.connect(); // pega uma conexão do pool
  try {
    const resultado = await client.query(sql, params);
    return resultado.rows;
  } catch (err) {
    console.error('❌ Erro na query:', err);
    throw err;
  } finally {
    client.release(); // devolve a conexão ao pool (não fecha!);
  }
};

module.exports = {
  executarQuery,
};
