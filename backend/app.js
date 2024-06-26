var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var mongoose = require('mongoose')
var cors = require('cors');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var applicationsRouter = require('./routes/applications_detail')

var app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/application', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('MongoDB Connection Error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(cors());
// app.enableCors();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // กำหนดโดเมนที่อนุญาตให้เรียกใช้ API ได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); // อนุญาตการใช้งานเมทอด GET, PUT, POST, DELETE
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // อนุญาตการใช้งาน header ต่างๆ
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/applications', applicationsRouter);

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