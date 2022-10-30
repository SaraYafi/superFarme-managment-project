const userController = require("../controllers/user");
const routerUser = require("express").Router();

routerUser.get("", userController.getAllUser);
routerUser.get("/:password/:name", userController.getUserByPasAndName);
routerUser.post("", userController.addUser);


module.exports = routerUser; 