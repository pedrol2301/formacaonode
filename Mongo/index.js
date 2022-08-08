const mongoose = require("mongoose");
const articleModel = require("./article");

mongoose.connect("mongodb://localhost:27017/aprendendomongo");

const Article = mongoose.model("Article",articleModel);

const artigo = new Article({
    title:"Teste",
    author:"AAAAA",
    body:"asdmasimdkamsd asi dias idjsoai joisja oidjoisa jdoijs aas."
});

artigo.save();
