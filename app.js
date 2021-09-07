// Importing Express
var express = require('express');

// Creating server and setting port, resource path
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(__dirname));
require('./api/pypi-downloads')(app)

/*
    Defining routes
*/

// homepage
app.get('/', function (req, res) {
    res.sendFile('template.html', {root: __dirname});
})


// contact page
app.get('/contact', function (req, res) {
    res.sendFile('contact.html', {root: __dirname});
})

// projects
app.get('/:projectName', function (req, res) {
    res.sendFile('template.html', {root:__dirname});
})

// google domain verification
app.get('/google8eaa6c0f88ac5211.html', function (req, res) {
    res.sendFile('google_verification.html', {root: __dirname});
})

// starting server
app.listen(port, function() {
    console.log(`running server on port ${port}`)
})