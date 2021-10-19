const express = require("express");
const app = express();
const session = require("express-session");
const bcrypt = require("bcryptjs");
const auth = require("./middlewares/auth")
const connection = require("./database/database");
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const User = require("./users/User");

//ROUTES
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

//VIEW ENGINE
app.set('view engine','ejs');


//SESSIONS
app.use(session({
    secret: "slkjdlkasjldksa"
    ,cookie:{
        maxAge:3600000
    }
}));


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

app.get("/",auth,(require,response)=>{
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
app.get("/:id",auth,(require,response)=>{

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
app.get("/category/:id",auth,(require,response)=>{

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
app.get("/admin/login", (require,response) =>{
    response.render("login");
});
app.post("/authenticate", (require,response) =>{
    User.findOne({
        where:{
            email:require.body.email
        }
    }).then(user =>{
        if (user != undefined) {
            var hash = bcrypt.compareSync(require.body.password,user.password);

            if (hash) {
                require.session.user = {
                    id: user.id
                    ,email:user.email
                    ,admin: user.admin
                }
                response.json(require.session.user);
            }else{
                response.redirect("/admin/login")
            }
        }else{
            response.redirect("/admin/login")
        }
    })
});
app.listen(8181, ()=>{
console.log("😎 👍")
});