const pool = require("../db/pool")

const getAllSwitchs = async ()=>{
    try{
        const result = pool.query(`SELECT * FROM switch`)
        return (await result).rows
    }catch(err){
        console.log("Erro ao buscar switchs:", err)
        throw new Error('Erro ao buscar switches no banco');
    }
}

const postSwitch = async ({ nome, ip}) => {
    try {
      const result = await pool.query(
        'INSERT INTO switch (name, ip) VALUES ($1, $2) RETURNING *',
        [nome, ip]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar switch:', error);
      throw new Error('Erro ao cadastrar o switch');
    }
  };
  

module.exports = {
    getAllSwitchs,
    postSwitch
}