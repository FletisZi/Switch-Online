const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const SwitchController = require('./controllers/switchController.js');
const portController = require('./controllers/portController.js');


const app = express()


app.use(express.json()) // permite receber JSON no body da requisição
app.use(cors()); // permite todas as origens
app.use(express.static('public')); 

const PORT = 3001
const SEGREDO = 'rwe3Fe' 


// ROTA ABERTA
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/switch', SwitchController.listSwitchs);

app.post('/switch',SwitchController.addNewSwitch)

app.get('/port', portController.listPorts)

app.post('/port', portController.addNewPort)



app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})



// Simulação de "banco de dados"
// const usuarioFalso = {
//   email: 'rodrigo@email.com',
//   senha: '123456'
// }

// // ROTA DE LOGIN
// app.post('/login', (req, res) => {
//   const { email, senha } = req.body

//   if (email === usuarioFalso.email && senha === usuarioFalso.senha) {
//     // Cria um token válido por 1 hora
//     const token = jwt.sign({ email }, SEGREDO, { expiresIn: '1h' })
//     return res.json({ mensagem: 'Login feito com sucesso!', token })
//   }

//   res.status(401).json({ erro: 'Email ou senha incorretos' })
// })

// // MIDDLEWARE para verificar se o usuário está logado
// function autenticarToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1] // espera "Bearer tokenAqui"

//   if (!token) return res.status(401).json({ erro: 'Token não fornecido' })

//   jwt.verify(token, SEGREDO, (err, usuario) => {
//     if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' })
//     req.usuario = usuario // podemos acessar depois
//     next()
//   })
// }

// // ROTA PROTEGIDA
// app.get('/perfil', autenticarToken, (req, res) => {
//   res.json({ mensagem: 'Você está logado!', usuario: req.usuario })
// })

