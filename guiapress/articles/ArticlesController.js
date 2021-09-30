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
router.post("/articles/delete", (require,response)=>{
    var id = require.body.id;
    if (id !=undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                response.redirect("/admin/articles");
            })
        }else{
            response.redirect("/admin/articles");
        }
    }else{
        response.redirect("/admin/articles");
    }
});
router.get("/admin/articles/edit/:id", (require,response) =>{
    var id = require.params.id
    if (isNaN(id)) {
        response.redirect("/admin/articles");
    }
    Article.findByPk(id).then((article) =>{
        if (article != undefined) {
            Category.findAll().then(categories =>{
                response.render("admin/articles/edit",{
                    article:article
                    ,categories:categories
                });
            });
        }else{
            response.redirect("/admin/articles");
        }
    }).catch((erro)=>{
        console.log(erro)
        response.redirect("/admin/articles");
    })
});
router.post("/articles/update", (require,response)=>{
    var id = require.body.id;
    var title = require.body.title;
    var body = require.body.body;
    var categoryId = require.body.category;
    if (id !=undefined) {
        if (!isNaN(id)) {
            Article.update({title:title,slug:slugify(title),body:body,categoryId:categoryId},{
                where:{id:id}
            }).then(()=>{
                response.redirect("/admin/articles");
            }).catch(err =>{
                response.redirect("/admin/articles");
            })
        }else{
            response.redirect("/admin/articles");
        }
    }else{
        response.redirect("/admin/articles");
    }
});
router.get('/articles/page/:num',(require,response)=>{

    var  page = require.params.num;

    var offset = 0;

    if (isNaN(page) || page==1) {
        offset = 0;
    }else{
        offset = parseInt(page) * 4;
    }
    Article.findAndCountAll({
        limit: 4
        ,offset:offset
    }).then(articles =>{
        var next;

        if(offset +4 >= articles.count){
            next = false
        }else{
            next = true;
        }
        var result ={
            next: next
            ,articles:articles
        }
        response.json(result);
    });
});

module.exports = router;