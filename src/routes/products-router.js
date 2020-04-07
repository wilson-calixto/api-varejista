var express = require('express');
var router = express.Router();

const { ProductsCtrl } = require('../controllers/products-ctrl');

/* Route to get all models */
router.get('/', function (req, res, next) {
    ProductsCtrl.getModels(req, res, next);
});


module.exports = router;
