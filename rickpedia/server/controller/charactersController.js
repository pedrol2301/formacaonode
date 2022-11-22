require('dotenv').config()

module.exports.getAllUsers = async (req, res, next) =>{
    try {
         const users = await fetch(process.env.API_DEFAULT_URL+"/character",(data)=>{
            console.log(data)
         });
         return res.json(users)
     }catch(error){
         console.error(error);
         next(error)
     }
 }