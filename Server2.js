const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')
//app.use('/assets', express.static('assets'))
//app.use('/images', express.static('images'))
app.use('/assets', express.static('assets'))

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
  res.sendFile(__dirname + '/Minha conta.html')
})
 
app.post('/cadastro', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  connection.query("INSERT IN usuario where email = '" + username + "'" , function (err, rows, fields) {
    console.log("Results:", rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!')
})