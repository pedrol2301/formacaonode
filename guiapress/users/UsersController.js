const express = require("express");
const router = express.Router();
const User = require("../users/Users");

router.get("/admin/users", (require,response) =>{
    response.render("/users/index");
});

module.exports = router;