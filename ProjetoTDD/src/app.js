let express = require("express");
let app = express();
let mongoose = require("mongoose");
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
    try {
        let { user,email,password } = req.body;

        const newUser = new User({
            user,email,password
        });
        
        await newUser.save();
        res.json({email});
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
    
});

module.exports = app;