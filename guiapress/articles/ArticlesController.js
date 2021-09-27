const express = require("express");
const router = express.Router();

router.get('/articles',(require,response)=>{
    response.send("Teste2")
});

module.exports = router;