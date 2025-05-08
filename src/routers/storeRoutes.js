const express = require('express');
const storeController = require('../controller/storeController');
const route = express.Router();

route.get('/listStores', storeController.listStores);

module.exports = route;
