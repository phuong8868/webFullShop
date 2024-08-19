var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Importing route files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clothingItemRouter = require('./routes/clothingItem'); 
var adminRouter = require('./routes/admin'); 
var orderRouter = require('./routes/order');

var app = express();

// Mongoose configuration
var uri = "mongodb+srv://phuongtdgbh200021:Thanhan1213%40@cluster0.ekftst1.mongodb.net/test";

// Set strictQuery to avoid deprecation warning
mongoose.set('strictQuery', true);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Handling Mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); // Built-in body-parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/', indexRouter);
app.use('/clothing', clothingItemRouter); 
app.use('/admin', adminRouter); 
app.use('/users', usersRouter);
app.use('/orders', orderRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Server port setup
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
