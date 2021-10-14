const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users/new", (require,response) =>{
    response.render("admin/users/new");
});

router.post("/users/save", (require,response) =>{

    User.findOne({where:{email:require.body.email}}).then(user =>{
        if (user == undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(require.body.senha, salt);

                User.create({
                    email: require.body.email
                    ,name: require.body.name
                    ,password: hash
                    ,admin: require.body.admin
                }).then(() =>{
                    response.redirect("/admin/users");
                }).catch((err) =>{
                    response.redirect("/admin/users");
                });
                //response.json(require.body);
        }else{
            response.redirect("/admin/users/new")
        }
    }).catch(err =>{
        console.log(err);
        response.redirect("/admin/users/new")
    });
});

router.get("/admin/users", (require,response) =>{
    User.findAll().then(users =>{
        response.render("admin/users/index",{
            users:users
        });
    })
});
router.post("/users/delete", (require,response) =>{
    User.destroy({
        where:{
            id:require.body.id
        }
    }).then(()=>{
        response.redirect("/admin/users")
    })
});

module.exports = router;