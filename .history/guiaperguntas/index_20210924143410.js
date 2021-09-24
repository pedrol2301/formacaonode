const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.set('view engine','ejs');// EJS COMO VIEW ENGINE
app.use(express.static('public'));// Arquivos estaticos ex.: css,js e etc
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get("/", (require,response) =>{

    response.render("index");
});
app.get("/perguntar", (require,response) =>{

    response.render("perguntar");
});
app.post("/salvarpergunta", (require,response) =>{
    var titulo = require.body.titulo
    var descricao = require.body.titulo
    response.send("formulario recebido")

});




app.listen(8181,()=>{
    console.log("👍");
})