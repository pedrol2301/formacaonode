const jwt = require("jsonwebtoken");
var secret = "AmoMamãe<3";

module.exports = function(req,res,next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        let token = bearer[1];
        try {
            let decoded = jwt.verify(token,secret);
            console.log(decoded);
            (decoded.role == 1)?
                next()
                :
                res.status(401).send("Sem permissão!");
        } catch (error) {
            res.status(403).send("Não autenticado!");
            return;
        }

    }else{
        res.status(403).send("Não autenticado!");
        return;
    }
}