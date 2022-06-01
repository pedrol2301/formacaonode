var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{

    async new(email,password,name){

        try {
            var hash = await bcrypt.hash(password,10);
            await knex.insert({email,password:hash,name,role:0}).table("users");
            console.log("Usuário inserido!");
        } catch (error) {
            console.log(error);
        }

    }

    async findEmail(email){
        

        try {
            var result = await knex.select("*").from("users").where({email});
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    async findAll(){
        try {
            var res = await knex.select(['id','name','email','role']).from("users");
            return res;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    
    async findById(id){

        try {
            var result = await knex.select(['id','name','email','role']).from("users").where({id});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
            
        }
    }

    async upd(id,email,name, role){

        var user = await this.findById(id);
        if(user){
           // await knex.update({email,name,role}).
        }else{
            return {status: false,err:"Usuário não encontrado"}
        }

    }

}

module.exports = new User();