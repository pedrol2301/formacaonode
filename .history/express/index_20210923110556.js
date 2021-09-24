const express = require("express");
const app = express();

app.get("/",function (require,response) {
    response.send("Bem vindo!");
});
app.get("/blog", function (require,response) {
    response.send("Bem vindo ao blog!")
});
app.get("/video", function (require,response) {
    response.send("Bem vindo ao pagina de videos!")
});
app.get("/ola/:nome?", function (require,response) {

    var nome = require.params.nome || '';
    response.send("Oi "+nome+"!")
});
app.listen(8181, function(erro){
    if (erro) {
        console.log("Ocorreu um erro!")
    }else{
        console.log("😎 👍")
    }
});