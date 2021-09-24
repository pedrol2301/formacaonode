const express = require("express");
const app = express();
app.set('view engine','ejs');// EJS COMO VIEW ENGINE
app.use(express.static('public'));// Arquivos estaticos ex.: css,js e etc


app.get("/", (require,response) =>{

    response.render("index");
});

app.listen(8181,()=>{
    console.log("👍");
})