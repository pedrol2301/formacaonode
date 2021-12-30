const fs = require("fs");

fs.readFile("./usuario.json",{encoding:'utf-8'},(err,data)=>{
if (err) {
    console.log(err);
}else{
    var conteudo = JSON.parse(data);
    conteudo.nome = "Otário";

    fs.writeFile("./usuario.json",JSON.stringify(conteudo), (err)=>{
        if (err) {
            console.log(err)
        }
    });
}
});