let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let JWT = require("jsonwebtoken")
const user = require("../model/user");


app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/guiapics",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    //console.log("Db OK!")
}).catch((err)=>{
    console.error(err);
});

let User = mongoose.model("User",user);
app.get("/", (req,res) =>{
    res.json({});
});

app.post("/user", async (req,res) =>{
    let { user,email,password } = req.body;

    if(!user || !email || !password){
        res.sendStatus(400);
        return;
    }

    try {

        const userE = await User.findOne({"email":email});
        
        if (userE != undefined) {
            res.statusCode = 406;
            res.json({error:'Email already in use!'});
            return;
        }
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            "user":user,
            "email":email,
            "password":hash
        });
        
        await newUser.save();
        res.json({email});
    } catch (error) {
        //console.log(error)
        res.sendStatus(500);
    }
    
});

app.delete("/user/:email",async (req,res)=>{
    try {
        await User.deleteOne({"email":req.params.email});
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = app;