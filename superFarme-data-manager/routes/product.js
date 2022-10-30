const productController = require("../controllers/product");
const routerProduct = require("express").Router();

routerProduct.get("", productController.getAllProduct);
routerProduct.get("/:id", productController.getProductById);
routerProduct.post("", productController.addProduct);
routerProduct.put("/:id", productController.updateProduct);
routerProduct.delete("/:id", productController.deleteProduct);
routerProduct.get("/getByPrice/:price", productController.getProductsByPrice);
//routerProduct.get("/getByPrice/:price", productController.getProductsByCategory);


module.exports = routerProduct; 