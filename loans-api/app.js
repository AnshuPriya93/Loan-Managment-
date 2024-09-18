var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
  var cors = require('cors') ;
var logger = require('morgan');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/LoansManager')

mongoose.connect('mongodb://127.0.0.1:27017/LoansManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully.');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var loanRouter = require('./routes/loans');
var loanPlanRouter = require('./routes/loanplan');
var paymentRouter = require('./routes/payment')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin:'http://localhost:4200',
  credentials:true
}));
app.use('/', indexRouter);
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/customer', customerRouter);
app.use('/loans', loanRouter)
app.use('/loans-plan', loanPlanRouter);
app.use('/paymnet', paymentRouter)

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
