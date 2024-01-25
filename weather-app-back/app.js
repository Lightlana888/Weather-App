var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
const bodyParser = require("express");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/gifs');
var quotesRouter = require('./routes/quotes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/gifs', usersRouter);
app.use('/quotes', quotesRouter);

module.exports = app;
