var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products-router');
const {ProductsModel} = require('./src/models/products-model');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const cors = require('cors')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors())
app.options('*', cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// 19251098i03qplsqa

const uri = "mongodb+srv://backendAplication:19251098i03qplsqa@cluster0-p2j8t.mongodb.net/test?retryWrites=true&w=majority";


const url = "mongodb+srv://andre:andre@clusterandre-di55c.gcp.mongodb.net/test?retryWrites=true&w=majority";







const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;



mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async function (database) {
    await ProductsModel.injectDb(database);
    console.log("oudri cand larray")
  
  }).catch((err) => {
    console.log("!!!!!!!!!!!!!!!!!!!!")

    console.log(err);
  });









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
