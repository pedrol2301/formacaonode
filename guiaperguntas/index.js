const { response } = require("express");
const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


connection.authenticate().then(()=>{
    console.log("Conectado ao banco de dados!")
}).catch((msgerro)=>{
    console.log(msgerro)
})


app.set('view engine','ejs');// EJS COMO VIEW ENGINE
app.use(express.static('public'));// Arquivos estaticos ex.: css,js e etc
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/", (require,response) =>{
    Pergunta.findAll({raw: true, order: [
        ['id','desc']
    ]}).then(perguntas =>{
        response.render("index",{
            perguntas: perguntas
        });
    }).catch(()=>{
        response.send("Houve um erro ao carregar as perguntas!")
    });
   
});
app.get("/perguntar", (require,response) =>{

    response.render("perguntar");
});
app.post("/salvarpergunta", (require,response) =>{
    var titulo = require.body.titulo;
    var descricao = require.body.descricao;

    Pergunta.create({
        titulo: titulo
        ,descricao: descricao
    }).then(()=>{
        response.redirect("/")
    });

});
app.get("/pergunta/:id", (require,response) =>{

    var id = require.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then( pergunta =>{
        if (pergunta != undefined) {

            Resposta.findAll({
                where:{
                    perguntaId:pergunta.id
                } 
            }).then(respostas =>{
                response.render('pergunta',{
                    pergunta : pergunta,
                    respostas : respostas
                })
            });
        } else {
            response.redirect("/")
        }
    });
});
app.post("/salvaresposta", (require,response) =>{
    var corpo = require.body.corpo;
    var id = require.body.pergunta;
    console.log(id)
    Resposta.create({
        corpo: corpo
        ,perguntaId: id
    }).then(()=>{
        response.redirect("/pergunta/"+id)
    });

});



app.listen(8181,()=>{
    console.log("👍");
})