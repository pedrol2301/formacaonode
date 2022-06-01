var User = require("../models/User")

class UsersController{

    async index(req,res){

        var result = await User.findAll();
        res.json(result);


    }

    async findUser(req, res){
        var id = req.params.id;

        var user = await User.findById(id);
        if(user)
            res.status(200).json(user);
        else
            res.status(404).json({err:"Usuário não encontrado!"})
    }


    async create(req, res){
        console.log(req.body);
        var {email, name, password } = req.body

        if(email == undefined){
            res.status(400);
            res.json({err:"O e-mail é inválido"});
            return;
        }

        var NotUnique = await User.findEmail(email);

        if(NotUnique){
            res.status(406);
            res.send("Email já cadastrado!");
        }else{
            await User.new(email,password,name);
            res.status(200);
            res.send("Pegando corpo da requisição");    
        }
        


    }
}

module.exports = new UsersController();