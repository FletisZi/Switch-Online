const portModel = require('../models/portModel')

const listPorts = async (req,res)=>{
    try{  
        const { id } = req.query
        res.status(200).json(await portModel.getAllPort(id));
    }catch(err){
        console.error('Erro ao buscar port:', err);
        res.status(500).json({ err: 'Erro interno no servidor' });
    }
}

const addNewPort = async (req,res) => {

    const { id_switch,nome,vlan, pdv, ip, path_panel } = req.body;


    if (!id_switch || !nome || !vlan || !pdv  || !ip || !path_panel) {
        return res.status(400).json({ erro: 'Campos obrigatórios: id_switch,nome,vlan, pdv, ip, path_panel' });
    }
    try {
        const newPort = await portModel.addNewPort({ id_switch,nome,vlan, pdv, ip, path_panel });
        res.status(201).json(newPort);
    } catch (error) {
        console.error('Erro ao criar switch:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar o switch' });
    }
}

const atualizarPort = async (req, res) => { 
    const { id_switch, nome, pdv} = req.body;
    
    if(!id_switch || !nome || !pdv){
        return res.status(400).json({ erro: 'Campos obrigatórios: id_switch,nome, pdv' });
    }
    try{
        console.log(id_switch, nome, pdv)
        const upPort = await portModel.updatePort({id_switch, nome, pdv});
        res.status(201).json(upPort);
    } catch (error) {
        console.error('Erro ao criar switch:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar o switch' });
    }
}


module.exports = {listPorts,addNewPort,atualizarPort}