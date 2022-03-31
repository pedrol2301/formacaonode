const express = require("express");
const app = express();
const session = require("express-session");
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser('12345'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', (req, res) =>{

    var ErroEmail = req.flash('ErroEmail');
    var ErroNome = req.flash('ErroNome');
    var ErroPontos = req.flash('ErroPontos');
    var email = req.flash('email');
    var nome = req.flash('nome');
    var pontos = req.flash('pontos');

    ErroEmail  = (ErroEmail == undefined || ErroEmail.length == 0)? undefined : ErroEmail;
    ErroNome   = (ErroNome == undefined || ErroNome.length == 0)? undefined : ErroNome;
    ErroPontos = (ErroPontos == undefined || ErroPontos.length == 0)? undefined : ErroPontos;

    res.render('index',{
        ErroEmail,
        ErroNome,
        ErroPontos
        ,email
        ,nome
        ,pontos
    });
});

app.post('/form', (req, res) =>{
    var {email, pontos, nome} = req.body;

    var ErroEmail;
    var ErroNome;
    var ErroPontos;
    
    if(email == undefined || email == ''){
        //err
        ErroEmail = "Email Vazio!";
    }

    if(nome == undefined || nome == ''){
        //err
        ErroNome = "Nome Vazio!"
    }
    if(pontos == undefined || pontos < 20){
        //err
        ErroPontos = "Não é possível ter menos de 20 pontos!";
    }

    if (ErroEmail != undefined || ErroNome != undefined || ErroPontos != undefined) {
        req.flash("ErroEmail",ErroEmail);
        req.flash("ErroNome",ErroNome);
        req.flash("ErroPontos",ErroPontos);
        req.flash("email",email);
        req.flash("nome",nome);
        req.flash("pontos",pontos);
        res.redirect("/");
    }else{
        res.send("FOI!");
    }

});

app.listen(5678, (req, res) =>{
    console.log("Servidor OK!");
});