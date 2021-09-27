const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

router.get('/admin/articles',(require,response)=>{
    Article.findAll({
        include:[{
            model: Category
        }]
    }).then((articles)=>{
        response.render("admin/articles/index",{
            articles:articles
        });
    });
    
});

router.get('/admin/articles/new',(require,response)=>{
    Category.findAll().then((categories)=>{
        response.render("admin/articles/new",{
            categories:categories
        });
    });
});

router.post('/articles/save',(require,response)=>{
    var title = require.body.title;
    var body = require.body.body;
    var category = require.body.category;
    Article.create({
        title:title
        ,slug: slugify(title)
        ,body:body
        ,categoryId:category
    }).then(()=>{
        response.redirect("/admin/articles")
    });
});

module.exports = router;