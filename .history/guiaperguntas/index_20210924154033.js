const { response } = require("express");
const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");


connection.authenticate().then(()=>{
    console.log("Conectado ao banco de dados!")
}).catch((msgerro)=>{
    console.log(msgerro)
})


app.set('view engine','ejs');// EJS COMO VIEW ENGINE
app.use(express.static('public'));// Arquivos estaticos ex.: css,js e etc
app.use(express.urlencoded({extended: false}));
app.use(express.json())


app.get("/", (require,response) =>{

    response.render("index");
});
app.get("/perguntar", (require,response) =>{

    response.render("perguntar");
});
app.post("/salvarpergunta", (require,response) =>{
    var titulo = require.body.titulo;
    var descricao = require.body.descricao;
    Pergunta.create({
        titulo: titulo
        descricao: descricao
    })

});




app.listen(8181,()=>{
    console.log("👍");
})