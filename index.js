const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json()) // permite receber JSON no body da requisição

const PORT = 3001
const SEGREDO = 'senha-super-secreta' // em apps reais, guarde isso em variáveis de ambiente

app.use(express.static('public')); 

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

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})
