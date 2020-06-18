var express = require('express');
var router = express.Router();

const { ProductCtrl } = require('../controllers/product-ctrl');

/* Route to get all models */
router.get('/', function (req, res, next) {
    ProductCtrl.getProduct(req, res, next);
});

router.get('/:id', function (req, res, next) {
    ProductCtrl.getProductById(req, res, next);
});

router.get('/main_images/:id', function (req, res, next) {
    ProductCtrl.getProductMainImagesById(req, res, next);
});


router.get('/adtional_images/:id', function (req, res, next) {
    ProductCtrl.getProductAdtionalImagesById(req, res, next);
});


router.post('/',function(req,res,next){
    ProductCtrl.insertProduct(req, res, next);
});
router.put('/',function(req,res,next){
    ProductCtrl.insertProduct(req, res, next);
});

module.exports = router;
