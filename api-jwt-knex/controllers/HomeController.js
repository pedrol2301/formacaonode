class HomeController{

    async index(req, res){
        res.status(200).send("APP EXPRESS! - Guia do programador");
    }

}

module.exports = new HomeController();