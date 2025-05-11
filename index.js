const express = require('express')
const jwt = require('jsonwebtoken')
const { executarQuery } = require('./modules/conetcDB.js');


const app = express()
app.use(express.json()) // permite receber JSON no body da requisição

const PORT = 3001
const SEGREDO = 'rwe3Fe' // em apps reais, guarde isso em variáveis de ambiente

app.use(express.static('public')); 


const listarProdutos = async (id_switch) => {
  const produtos = await executarQuery(`SELECT * FROM port WHERE id_switch = ${id_switch}`);
  console.log(produtos);
  return produtos;
};

const listarSwitchs = async () => {
  const produtos = await executarQuery(`SELECT * FROM switch`);
  console.log(produtos);
  return produtos;
};



// Simulação de "banco de dados"
const usuarioFalso = {
  email: 'rodrigo@email.com',
  senha: '123456'
}

// ROTA DE LOGIN
app.post('/login', (req, res) => {
  const { email, senha } = req.body

  if (email === usuarioFalso.email && senha === usuarioFalso.senha) {
    // Cria um token válido por 1 hora
    const token = jwt.sign({ email }, SEGREDO, { expiresIn: '1h' })
    return res.json({ mensagem: 'Login feito com sucesso!', token })
  }

  res.status(401).json({ erro: 'Email ou senha incorretos' })
})

// MIDDLEWARE para verificar se o usuário está logado
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // espera "Bearer tokenAqui"

  if (!token) return res.status(401).json({ erro: 'Token não fornecido' })

  jwt.verify(token, SEGREDO, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' })
    req.usuario = usuario // podemos acessar depois
    next()
  })
}

// ROTA PROTEGIDA
app.get('/perfil', autenticarToken, (req, res) => {
  res.json({ mensagem: 'Você está logado!', usuario: req.usuario })
})

// ROTA ABERTA
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/port', async(req,res) =>{
  const id_switch = req.query.id;
  const listaProdutos = await listarProdutos(id_switch);

  if(listaProdutos.length != 0){
    res.status(200).send( listaProdutos)
    return
  }
    res.status(200).send( [])
})

app.get('/switch',async (req,res)=>{
  res.send( await listarSwitchs())
})



app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})
