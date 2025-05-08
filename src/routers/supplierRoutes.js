const express = require('express');
const supplierController = require('../controller/supplierController');

var supplierRouter = express.Router();

supplierRouter.get('/', supplierController.getAllSuppliers);
supplierRouter.post('/', supplierController.addSupplier);

module.exports = supplierRouter;
