const orderController = require("../controllers/order");
const routerOrder = require("express").Router();

routerOrder.get("", orderController.getAllOrder);
routerOrder.get("/:id", orderController.getOrderById);
routerOrder.post("", orderController.addOrder);
routerOrder.put("/:id", orderController.updateOrder);
routerOrder.delete("/:id", orderController.deleteOrder);
routerOrder.get("/getOrdersByUserId/:id", orderController.getOrdersByUserId);
routerOrder.get("/getOrdersBetweenTwoDates/:date1/:date2", orderController.getOrdersBetweenTwoDates);
routerOrder.put("/addProductToOrder/:id",orderController.addProductToOrder);
routerOrder.get("/oldOrdersByUserId/:id",orderController.OldOrdersByUserId),

module.exports = routerOrder; 