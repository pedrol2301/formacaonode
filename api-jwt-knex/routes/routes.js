var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findUser);
router.put('/user', UserController.editUser);
router.delete('/user/:id', UserController.deleteUser);
router.post('/user', UserController.create);

module.exports = router;