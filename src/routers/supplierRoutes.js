const express = require('express');
const  getAllSuppliers  = require('../controller/supplierController.js'); // đảm bảo export đúng từ controller

var supplierRouter = express.Router();

supplierRouter.get('/', getAllSuppliers);

module.exports = supplierRouter;