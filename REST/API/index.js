const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id:1,
            title:"COD",
            year: 2019,
            price:60
        },
        {
            id:2,
            title:"BF",
            year: 2019,
            price:70
        },
        {
            id:3,
            title:"F1",
            year: 2020,
            price:100
        }
    ]
};

app.get("/games", (req,res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});
app.get("/game/:id", (req,res) =>{

    var result = DB.games.find(element=> element.id == req.params.id);
    
    if (!result) {
        res.statusCode = 404;
        res.json({});
    }else{
        res.statusCode = 200;
        res.json(result);
    }
});

app.post("/game",(req,res)=>{
    var {title, price, year} = req.body

    DB.games.push({
        id:4,
        title,
        price,
        year
    });

    res.sendStatus(200)

});
app.delete("/game/:id",(req,res)=>{

    var result = DB.games.findIndex(element=> element.id == req.params.id);
    
    if (result == -1) {
        res.sendStatus(404);
    }else{
        DB.games.splice(result,1);
        res.sendStatus(200);
    }

});

app.put("/game/:id",(req,res)=>{

    
    var result = DB.games.find(element=> element.id == req.params.id);
    
    if (!result) {
        res.statusCode = 404;
        res.json({});
    }else{
        var {title, price, year} = req.body;

        if (title != undefined) {
            result.title = title;
        }
        if (price != undefined) {
            result.price = price;
        }
        if (year != undefined) {
            result.year = year;
        }
        res.sendStatus(202);

    }


});

app.listen(8085,() =>{
    console.log("👍👌");
});