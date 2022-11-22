const express = require("express");
const cors = require('cors');
const characterRoutes = require("./routes/characterRoutes")
// const mongoose = require("mongoose");

const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.use("/api/auth",characterRoutes)



const server = app.listen(process.env.PORT,()=>{
    console.log("Rick Me ON!")
})