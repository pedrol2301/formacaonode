const express = require("express");
const app = express();
const connection = require("./database/database");
const Category = require("./categories/Category");
const Article = require("./articles/Article");

//ROUTES
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

//VIEW ENGINE
app.set('view engine','ejs');

// STATIC
app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//database
connection.authenticate().then(()=>{
    console.log("Connected");
}).catch((error)=>{
    console.log(error);
});

app.use('/',categoriesController);
app.use('/',articlesController);

app.get("/",(require,response)=>{
    response.render("index");
});

app.listen(8181, ()=>{
console.log("😎 👍")
});