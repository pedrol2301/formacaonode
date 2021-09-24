const express = require("express");
const app = express();

app.get("/",function (require,response) {
    response.end("Bem vindo!");
});

app.listen(8181, function(erro){
    if (erro) {
        console.log("Ocorreu um erro!")
    }else{
        console.log("Servidor OK")
    }
});