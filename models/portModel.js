const pool = require("../db/pool")

const getAllPort = async (id_switch) =>{
    try{
        const result = pool.query(`SELECT * FROM port WHERE id_switch = ${id_switch}`);
        return (await result).rows
    }catch(err){
        console.log("Erro ao buscar port:", err)
        throw new Error('Erro ao buscar port no banco');
    }
}


const addNewPort = async ({id_switch,nome,vlan, pdv, ip, path_panel}) => {
    try{
        const result = await pool.query(
            'INSERT INTO port (id_switch , name,vlan,pdv, ip, path_panel) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *',
            [id_switch,nome,vlan, pdv, ip, path_panel]
        );
        return result.rows[0]
    }catch(err){
        console.error('Erro ao criar switch:', err);
        throw new Error('Erro ao cadastrar o switch');
    }
}


const updatePort = async ({id_switch ,nome ,pdv }) => {
    try {
        const selectResult = await pool.query(
            `SELECT id FROM port WHERE name = $1 AND id_switch = $2`,
            [nome, id_switch]
        );
        if (selectResult.rowCount === 0) {
            console.log('Porta não encontrada');
            return null;
        }
        const id = selectResult.rows[0].id;
        // Agora atualizamos o campo pdv usando o ID encontrado
        const updateResult = await pool.query(
            `UPDATE port SET pdv = $1 WHERE id = $2 RETURNING *`,
            [pdv, id]
        );
        return updateResult.rows[0];
    } catch (err) {
        console.error('Erro ao atualizar porta', err);
        return null;
    }
};

module.exports = {
    getAllPort,
    addNewPort,
    updatePort
}