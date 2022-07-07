var User = require("../models/User")
var PasswordToken = require("../models/Password");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "AmoMamãe<3";
class UsersController{

    async index(req,res){

        let result = await User.findAll();
        res.json(result);


    }

    async findUser(req, res){
        let id = req.params.id;

        let user = await User.findById(id);
        if(user)
            res.status(200).json(user);
        else
            res.status(404).json({err:"Usuário não encontrado!"})
    }


    async create(req, res){
        console.log(req.body);
        let {email, name, password } = req.body

        if(email == undefined){
            res.status(400);
            res.json({err:"O e-mail é inválido"});
            return;
        }

        let NotUnique = await User.findEmail(email);

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
        let {id,name,role,email} = req.body;

        let stresp = await User.updUser(id,email,name,role);
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
        let id = req.params.id;

        let stresp = await User.delete(id);
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

        let {email}  = req.body;
        
        let result = await PasswordToken.create(email);


        if(result){
            if(result.status){
                res.status(200);
                res.json({token:result.token})
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(400);
            res.send("Algo deu errado");
        }

        
    }

    async changePassword(req,res){
        let token = req.body.token;
        let password = req.body.password;

        let isValid = await PasswordToken.validate(token);
        if(isValid.status){
            await User.changePassword(password,isValid.token.user_id,isValid.token.token);
            res.status(200);
            res.send("Senha alterada!");
        }else{
            res.status(406).send("Token inválido!");
        }
    }

    async login(req,res){
        let { email, password } = req.body;

        let user = await User.findByEmail(email);

        if (user) {
            let result = await bcrypt.compare(password,user.password);
            res.json({status:result});
        } else {
            res.json({status:false})
        }
    }
}

module.exports = new UsersController();