const express = require('express');


const orderController = require('../controller/orderController');


const orderRouter = express.Router();


orderRouter.get("/getAllbills", orderController.getAllBill);


module.exports = orderRouter;