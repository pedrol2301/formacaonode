const express = require("express");

const app = express();

app.get("/",(req,res) =>{
    res.json({sucess:true});
});

app.get("/cor/:pessoa",(req,res)=>{
    let {pessoa} = req.params
    if(pessoa == "victor"){
        res.json({cor:"vermelho"})
    }else{
        res.json({cor:"Não sei"})
    }
});

module.exports = app;