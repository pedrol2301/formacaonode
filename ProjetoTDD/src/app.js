let express = require("express");
let app = express();
let mongoose = require("mongoose");


app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/guiapics",{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log("Db OK!")
}).catch((err)=>{
    console.error(err);
});

app.get("/", (req,res) =>{
    res.json({});
});

module.exports = app;