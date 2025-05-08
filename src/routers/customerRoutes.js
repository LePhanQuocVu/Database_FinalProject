const express = require('express');
const customerController = require('../controller/customerController');
const route = express.Router();

route.get('/listCustomers', customerController.listCustomers);

module.exports = route;
