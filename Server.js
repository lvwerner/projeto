const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')

app.use(express.static('public'));
app.use('/public/', express.static('public')) /* parte do tiago */
app.use('/assets/', express.static('assets')) /* parte do tiago */

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'mhcar',
});

connection.connect(function (err) {
  if (!err){
    console.log("Conexão como o Banco realizada com sucesso!!!");
  } else{
    console.log("Erro: Conexão NÃO realizada", err);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/mhotelcar.html')
})
 
// aaaaaaa
 
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  connection.query("SELECT * FROM cliente where email = '" + username + "'" , function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      if (rows.length > 0) {
        
        if ( rows[0].senha === password) {
            console.log('Login com Sucesso!!!');
            res.sendFile(__dirname + '/public/mhotelcar.html')
            } else {
             res.send('Senha incorreta');
            }
        
      } else {
        res.send('Login Falhou - Email não cadastrado');
      }
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

app.post('/cadastro', (req, res) => {
  let nome = req.body.nome;
  let sobrenome =req.body.sobrenome;
  let cpf =req.body.cpf;
  let email = req.body.email;
  let senha = req.body.senha;
  
  connection.query( "INSERT INTO cliente( `nome`, `sobrenome`, `cpf`,  `email`, `senha` ) VALUES  ('" + nome + "','" + sobrenome + "','" + cpf + "','" + email + "','" + senha + "')", function (err, rows, fields) {


    
    console.log("Results:", rows);
    if (!err) {
      console.log("Cadastro feito com sucesso!!");
      res.sendFile(__dirname + '/public/tela de login.html')
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!')
})