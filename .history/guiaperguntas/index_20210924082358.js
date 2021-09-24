const { response } = require("express");
const express = require("express");
const app = express();

app.get("/", (require,response) =>{
    response.send("Bem vindo ao Site!");
});

app.listen(8181,()=>{
    console.log("👍");
})