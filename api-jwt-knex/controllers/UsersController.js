var User = require("../models/User")
var PasswordToken = require("../models/Password");

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

    async editUser(req,res){
        var {id,name,role,email} = req.body;

        var stresp = await User.updUser(id,email,name,role);
        if (stresp != undefined) {
            if (stresp.status == true) {
                res.status(200);
                res.json("Usuário atualizado!")
            }else{
                res.status(406);
                res.json(stresp.err);
            }
        }else{
            res.status(400);
            res.json("Falha na operação");
        }
        
    }

    async deleteUser(req,res){
        var id = req.params.id;

        var stresp = await User.delete(id);
        if (stresp != undefined) {
            if (stresp.status == true) {
                res.status(200);
                res.json(stresp.msg)
            }else{
                res.status(406);
                res.json(stresp.msg);
            }
        }else{
            res.status(400);
            res.json(`Falha na operação ${id}`);
        }
        
    }

    async recoverPassword(req,res){

        var { email } = req.body.email
        
        var result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.json({token:result.token})
        }else{
            res.status(406);
            res.send(result.err)
        }
    }
}

module.exports = new UsersController();