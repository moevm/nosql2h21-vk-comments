var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require("cors");

var indexRouter = require('./controller');
var databaseRouter = require('./controller/DatabaseController');
var debugRouter = require('./controller/DebugController');
var groupRouter = require('./controller/GroupController');
var commentRouter = require('./controller/CommentController');

var app = express();

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use (bodyParser.json({limit: '100mb'}));
app.use (bodyParser.urlencoded ({limit: '100mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/db', databaseRouter);
app.use('/debug', debugRouter);
app.use('/group', groupRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
