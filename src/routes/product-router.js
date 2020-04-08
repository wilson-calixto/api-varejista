var express = require('express');
var router = express.Router();

const { ProductCtrl } = require('../controllers/product-ctrl');

/* Route to get all models */
router.get('/', function (req, res, next) {
    ProductCtrl.getProduct(req, res, next);
});

router.put('/',function(req,res,next){
    ProductCtrl.insertProduct(req, res, next);
});

module.exports = router;
