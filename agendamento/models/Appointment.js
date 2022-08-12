const { default: mongoose } = require("mongoose");

const appointment = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    description: String,
    date: Date,
    time: String,
    attendant: String,
    finished: Boolean
});

module.exports = appointment;