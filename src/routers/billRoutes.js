const express = require('express');
const billController = require('../controller/billController');
const route = express.Router();

route.post('/insertBill', billController.insertBill);

module.exports = route;
