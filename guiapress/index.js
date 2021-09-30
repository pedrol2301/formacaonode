const express = require("express");
const app = express();
const connection = require("./database/database");
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const User = require("./users/Users");

//ROUTES
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

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
app.use('/',usersController);

app.get("/",(require,response)=>{
    Article.findAll({
        order:[['id','Desc']]
        ,limit:4
    }).then(articles =>{
        Category.findAll().then(categories =>{
            response.render("index",{
                articles:articles
                ,categories:categories
            });
        });
    });
    
});
app.get("/:id",(require,response)=>{

    var id = require.params.id

    Article.findOne({
        where: {
            id:id
        }
    }).then(article =>{
        if (article != undefined) {
            Category.findAll().then(categories =>{
                response.render("article",{
                    article:article
                    ,categories:categories
                })
            });
        }else{
            response.redirect("/")
        }
        
    });
    
});
app.get("/category/:id",(require,response)=>{

    var id = require.params.id

    Category.findOne({
        where: {
            id:id
        }
        ,include:[{model:Article}]
    }).then(category =>{
        if (category != undefined) {
            Category.findAll().then(categories =>{
                response.render("index",{
                    articles:category.articles
                    ,categories:categories
                });
            });
        }else{
            response.redirect("/")
        }
        
    });
    
});

app.listen(8181, ()=>{
console.log("😎 👍")
});