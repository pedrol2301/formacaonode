const express = require("express");
const app = express();
app.set('view engine','ejs');// EJS COMO VIEW ENGINE


app.get("/", (require,response) =>{
    var nome = "Pedro"
    var lang = "Javascript"
    response.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Laudo",
        inscritos: 7000
    });
});

app.listen(8181,()=>{
    console.log("👍");
})