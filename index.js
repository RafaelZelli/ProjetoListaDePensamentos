// Módulos externos
const express = require('express')
// const exphbs = require("express-handlebars");   deu erro este, substitui pelo de baixo \/
const { engine } = require('express-handlebars');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()   //Inicia o Express

const conn = require('./db/conn')

//Chama os models
const Tought = require('./models/Tought')
const User = require('./models/User')

//Configurando a Template engine
// app.engine('handlebars', exphbs())  deu erro este, substitui pelo de baixo \/
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars')


// Receber resposta do body
app.use(
    express.urlencoded({
      extended: true,
    })
  );

//Middleware que ajuda a receber os dados em JSON
app.use(express.json())

//Session middleware, ele nos informa onde o express salva as sessões
app.use(
    session({
      name: 'session',   
      secret: 'nosso_secret',
      resave: false,   //ajuda a proteger a sessão do usuário, caso caia a sessão, ele desconecta
      saveUninitialized: false,
      store: new FileStore({   //local onde salva a sessão
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),  //caminho onde salva os arquivos de sessão
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,   //cookie dura 3600000segundos, equivale a 1 dia
        expires: new Date(Date.now() + 3600000),  //tempo que ele expira, 1 dia
        httpOnly: true,
      },
    }),
  )

//Configurando as flash messages, que é as mensagens de status do sistema
//Quando fizermos a conexão com o banco de daddos, 
//este flash message irá nos dizer se deu certo ou não a conexão
app.use(flash());

//Public path
app.use(express.static("public"));

//Salvar a sessão na resposta
app.use((req, res, next) => {    
    if (req.session.userid) {  //Caso tenha uma sessão...
      res.locals.session = req.session;  //Pega a sessão da requisição e manda para a resposta
    }  
    next();
  });



conn
    .sync()  //.sync({force:true}) força a ligação entre tabelas
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))