"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
var db_1 = require("./db");
var readers_1 = require("./api/readers");
var genres_1 = require("./api/genres");
var genrebooks_1 = require("./api/genrebooks");
var genrebooksread_1 = require("./api/genrebooksread");
var genrebooksreading_1 = require("./api/genrebooksreading");
var genrebookstoread_1 = require("./api/genrebookstoread");
var booksread_1 = require("./api/booksread");
var booksreading_1 = require("./api/booksreading");
var bookstoread_1 = require("./api/bookstoread");
db_1.default.connect();
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/api/readers', readers_1.default);
app.use('/api/genres', genres_1.default);
app.use('/api/genrebooks', genrebooks_1.default);
app.use('/api/genrebooksread', genrebooksread_1.default);
app.use('/api/genrebooksreading', genrebooksreading_1.default);
app.use('/api/genrebookstoread', genrebookstoread_1.default);
app.use('/api/booksread', booksread_1.default);
app.use('/api/booksreading', booksreading_1.default);
app.use('/api/bookstoread', bookstoread_1.default);
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
