const mongoose = require("mongoose");

const userModel = new mongoose.Schema({

    user: String,
    email: String,
    password: String,
});

module.exports = userModel;