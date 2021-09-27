const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING
        ,allowNull: false
    }
    ,slug:{
        type: Sequelize.STRING
        ,allowNull: false
    },
    body:{
        type:Sequelize.TEXT
        ,allowNull:false
    }
});

Category.hasMany(Article);// UMA CATEGORIA PODE TER MUITOS ARTIGOS 1-P-M
Article.belongsTo(Category); //UM ARTIGO PERTENCE A UMA CATEGORIA 1-P-1

//Article.sync({force:false});
module.exports = Article;