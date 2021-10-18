const express = require("express");
const router = express.Router();
const Category = require("./Category")
const slugify = require("slugify");
const auth = require("../middlewares/auth")

router.get('/admin/categories/new',auth,(require,response)=>{
    response.render("admin/categories/new");
});
router.post("/categories/save", (require,response) =>{
    var title = require.body.title;
    if (title != undefined) {

        Category.create({
            title:title
            ,slug: slugify(title)
        }).then(()=>{
            response.redirect("/admin/categories")
        })
        
    }else{
        response.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories",auth, (require,response)=>{
    Category.findAll({
        raw:true
        ,order: [['id','desc']]
    }).then((categories)=>{
        response.render("admin/categories/index",{
            categories:categories
        });
    });
});
router.post("/categories/delete", (require,response)=>{
    var id = require.body.id;
    if (id !=undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                response.redirect("/admin/categories");
            })
        }else{
            response.redirect("/admin/categories");
        }
    }else{
        response.redirect("/admin/categories");
    }
});
router.get("/admin/categories/edit/:id", (require,response) =>{
    var id = require.params.id
    if (isNaN(id)) {
        response.redirect("/admin/categories");
    }
    Category.findByPk(id).then((category) =>{
        if (category != undefined) {

            response.render("admin/categories/edit",{
                category:category
            })
            
        }else{
            response.redirect("/admin/categories");
        }
    }).catch((erro)=>{
        console.log(erro)
        response.redirect("/admin/categories");
    })
});
router.post("/categories/update", (require,response)=>{
    var id = require.body.id;
    var title = require.body.title;
    if (id !=undefined) {
        if (!isNaN(id)) {
            Category.update({title:title,slug:slugify(title)},{
                where:{id:id}
            }).then(()=>{
                response.redirect("/admin/categories");
            })
        }else{
            response.redirect("/admin/categories");
        }
    }else{
        response.redirect("/admin/categories");
    }
});

module.exports = router;