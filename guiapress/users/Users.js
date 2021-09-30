const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING
        ,allowNull: false
    }
    ,password:{
        type: Sequelize.STRING
        ,allowNull: false
    }
    ,name:{
        type: Sequelize.STRING
        ,allowNull: false
    }
    ,admin:{
        type: Sequelize.STRING(1)
        ,allowNull: false
        ,defaultValue: "N"
    }
});

//User.sync({force:true});

module.exports = User;