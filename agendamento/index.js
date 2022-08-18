const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AppointmentService = require("./services/AppointmentService");


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cadastro", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    var status =  await AppointmentService.Create(req.body);

    if(!status){
        res.send("Ocorreu um erro!");
    }else{
        res.redirect("/");
    }
});

app.get("/calendar", async (req,res)=>{
    var appointment = await AppointmentService.GetAll(false);
    res.json(appointment)
});

app.get("/event/:id", async (req,res)=>{
    var appointment = await AppointmentService.GetById(req.params.id);
    res.render('event',{appointment})
});
app.post("/finish", async (req,res)=>{
    console.log(req.body)
    let { id, status } = req.body
    if(status == 'true'){
        var appointment = await AppointmentService.Finish(id, false);
    }else{
        var appointment = await AppointmentService.Finish(id, true);
    }
    res.json(appointment)
});

app.listen(8080, () => {
    console.log("🤘🤘");
});