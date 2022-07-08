var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UsersController");
var Auth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get('/user', UserController.index);
router.get('/user/:id',Auth, UserController.findUser);
router.put('/user',Auth, UserController.editUser);
router.delete('/user/:id',Auth, UserController.deleteUser);
router.post('/user', UserController.create);
router.post('/recoverpassword',UserController.recoverPassword);
router.post('/changepassword',UserController.changePassword);
router.post('/login',UserController.login);

module.exports = router;