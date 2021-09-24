const express = require("express");
const app = express();
app.set('view engine','ejs');// EJS COMO VIEW ENGINE


app.get("/", (require,response) =>{
    response.send("Bem vindo ao Site!");
});

app.listen(8181,()=>{
    console.log("👍");
})