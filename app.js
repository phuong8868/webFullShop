var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clothingItemRouter = require('./routes/clothingItem'); 
var adminRouter = require('./routes/admin'); 
var orderRouter = require('./routes/order');

var app = express();

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose
var mongoose = require('mongoose'); 
var uri = "mongodb+srv://phuongtdgbh200021:Thanhan1213%40@cluster0.ekftst1.mongodb.net/";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connect to db succeed'))
.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clothing', clothingItemRouter); 
app.use('/admin', adminRouter); 
app.use('/users', usersRouter);
app.use('/orders', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// port
app.listen(process.env.PORT || 3005, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
