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

}

module.exports = new User();