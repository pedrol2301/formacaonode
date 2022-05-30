var User = require("../models/User")

class UsersController{

    async index(req,res){}


    async create(req, res){
        console.log(req.body);
        var {email, name, password } = req.body

        if(email == undefined){
            res.status(400);
            res.json({err:"O e-mail é inválido"});
            return;
        }

        
        await User.new(email,password,name);
        res.status(200);
        res.send("Pegando corpo da requisição");    


    }
}

module.exports = new UsersController();