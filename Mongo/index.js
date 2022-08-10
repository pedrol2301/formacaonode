const mongoose = require("mongoose");
const articleModel = require("./article");

mongoose.connect("mongodb://localhost:27017/aprendendomongo");

const Article = mongoose.model("Article",articleModel);

/* INSERT NO MONGO */
// const artigo = new Article({
//     title:"Teste 3",
//     author:"CCCCCCCCCC",
//     body:"asdmasimdkamsd asi dias idjsoai joisja oidjoisa jdoijs aas.",
//     special:false
// });

// artigo.save().then(
//     console.log("Saved")
// ).catch((error)=>{
//     console.log(error)
// });

/* SELECT NO MONGO*/
Article.find({}).then(articles =>{
    console.log(articles)
}).catch(er =>{
    console.log(err)
})

// DELETE NO MONGO
// Article.findByIdAndDelete("62f265819d8cf3530ae2d19a").then(()=>{console.log("Dado Removido!")}).catch(err => console.log(err));

// UPDATE NO MONGO
// Article.findByIdAndUpdate("62f26508f3cc79ef4ea6ff10",{title:"Tilambuco"}).then(()=>{console.log("update!")}).catch(err => console.log(err));