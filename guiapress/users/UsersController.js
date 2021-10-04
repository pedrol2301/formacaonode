const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users/new", (require,response) =>{
    response.render("admin/users/new");
});

router.post("/users/save", (require,response) =>{
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
});

router.get("/admin/users", (require,response) =>{
    User.findAll().then(users =>{
        response.render("admin/users/index",{
            users:users
        });
    })
});

module.exports = router;