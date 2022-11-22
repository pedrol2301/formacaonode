const { getAllUsers } = require("../controller/charactersController");

const router = require("express").Router();


router.get("/allUsers/:id",getAllUsers);

module.exports = router;