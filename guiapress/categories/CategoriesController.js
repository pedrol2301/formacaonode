const express = require("express");
const router = express.Router();

router.get('/categories',(require,response)=>{
    response.send("Teste")
});

module.exports = router;