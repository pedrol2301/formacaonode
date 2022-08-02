const mongoose = require("mongoose");

const articleModel = new mongoose.Schema({

    title: String,
    author: String,
    body: String,
    date: {type: Date, default:Date.now},
    special: Boolean,
    resumo : {
        content: String,
        author: String
    }
});

module.exports = articleModel;