const SwitchModel = require('../models/switchModel');

const listSwitchs = async ( req ,res ) => {
    try{
        const switchs = await SwitchModel.getAllSwitchs();
        res.status(200).json(switchs);
    }catch(err){
        console.err('Erro ao buscar switches:', err);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
} 


const addNewSwitch = async (req, res) => {
    const { nome, ip } = req.body;
    if (!nome || !ip ) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, ip' });
    }

    try {
        const newSwitch = await SwitchModel.postSwitch({ nome, ip });
        res.status(201).json(newSwitch);
    } catch (error) {
        console.error('Erro ao criar switch:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar o switch' });
    }
};


module.exports = {
    listSwitchs,
    addNewSwitch
}