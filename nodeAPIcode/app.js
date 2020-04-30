var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var addNewCateRouter = require('./routes/add-new-category');
var ViewPassCateRouter = require('./routes/passwordCategory');
var addNewPassRouter = require('./routes/add-new-password');
var viewAllPassRouter = require('./routes/view-all-password');
var passwordDetailsRouter = require('./routes/password-detail');
var usersRouter = require('./routes/users');
var joinRouter = require('./routes/join');
var PassCatAPI = require('./api/add-category');
var ProductAPI = require('./api/product');
var UserAPI = require('./api/user');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '9p3BHAr`f:XUCV>.',
resave: false,
saveUninitialized: true,}));


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-category', addNewCateRouter);
app.use('/passwordCategory', ViewPassCateRouter);
app.use('/add-new-password', addNewPassRouter);
app.use('/view-all-password', viewAllPassRouter);
app.use('/password-detail', passwordDetailsRouter);
app.use('/users', usersRouter);
app.use('/joinResult', joinRouter);
app.use('/api',PassCatAPI);
app.use('/productAPI/',ProductAPI);
app.use('/userapi/',UserAPI);


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
  //res.render('error');
  res.json({
    error:"Page Not Found"
  });
 
});

module.exports = app;
