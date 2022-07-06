var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const { where } = require("../database/connection");
const e = require("express");
const Password = require("./Password");

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

    async findByEmail(email){

        try {
            var result = await knex.select(['id','name','email','role']).from("users").where({email});
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

    async updUser(id,email,name, role){

        var user = await this.findById(id);
        if(user){
            var editUser = {};
            if(email){
                if(email != user.email){
                    var femail = await this.findEmail(email);
                    if (femail == false) {
                        editUser.email = email;
                    }else{
                        return {status: false,err:"Email vinculado a outro usuário!"}
                    }
                }       
            }
            if(name){
                editUser.name = name;
            }
            if(role != undefined){
                editUser.role = role;
            }
            try {
                await knex.update(editUser).where({id:id}).table('users');
                return {status: true}
            } catch (error) {
                console.log(error);
                return {status: false,err:error}
            }
        }else{
            return {status: false,err:"Usuário não encontrado"}
        }

    }

    async delete(id){
        if(id != undefined){
            var res = await this.findById(id);
            if(res != undefined){
                try {
                    await knex.delete().where({id:id}).table("users");
                    return {status:true,msg:"Deletado!"}
                } catch (error) {
                    console.log(error);
                    return {status:false,msg:error}
                }
            }
        }else{
            return {status: false,err:"Usuário não encontrado"}
        }
    }

    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword,10);
        await knex.update({password:newPassword}).where({id}).table("users");
        await Password.setUsed(token);
    }

}

module.exports = new User();