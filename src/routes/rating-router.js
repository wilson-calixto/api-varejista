var express = require('express');
var router = express.Router();

const { RatingCtrl } = require('../controllers/rating-ctrl');

/* Route to get all models */
router.get('/', function (req, res, next) {
    RatingCtrl.getRating(req, res, next);
});

router.put('/',function(req,res,next){
    RatingCtrl.insertRating(req, res, next);
});

module.exports = router;
