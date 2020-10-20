var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var session = require('express-session')
const { check, validationResult } = require('express-validator');

var app = express()
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended : true}))

consign()
    .include('app/routes')
    .then('config/databaseConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app;