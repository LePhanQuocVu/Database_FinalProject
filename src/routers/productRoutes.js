const express = require('express');

const productController = require('../controller/productController');

const productRouter = express.Router();

productRouter.get("/getAllDiscounts", productController.getAllDiscount);

productRouter.post("/addDis", productController.addDiscount);


module.exports = productRouter;