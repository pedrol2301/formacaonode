var knex = require("../database/connection");
const User = require("./User");

class PasswordToken{

    async create(email){
        var user = await User.findByEmail(email);

        if(user != undefined){

            try {
                var token = Date.now();
                await knex.insert({
                    user_id:user.id,
                    used:0,
                    token: token
                }).table("passwordtoken");

                return {status:true,token}

            } catch (error) {

                console.log(error);
                return {status:false,msg:error}

            }
            

        }else{
            return {status:false,msg:"Email não encontrado!"}
        }
    }

    async validate(token){

        try {
            var result = await knex.select().where({token}).table("passwordtoken");
            
        if(result.length > 0){
            var tk = result[0];
            if(tk.used){
                return {
                    status:false
                };
            }else{
                return {
                    status:true,
                    tk
                };
            }
        }else{
            return {
                status:false
            };
        }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = new PasswordToken();